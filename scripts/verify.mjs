import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/data.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2020,
    target: ts.ScriptTarget.ES2020,
  },
});
const { transactions, account } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`
);

const expected = {
  "2026-06-30": 1696.8,
  "2026-06-29": 1710.72,
  "2026-06-26": 1667.47,
  "2026-06-25": 734.8,
  "2026-06-22": 737.2,
};
const expectedAccountBalance = 1696.8;

// First (newest) transaction per date carries that day's closing balance.
const firstByDate = {};
for (const t of transactions) {
  if (t.status === "pending") continue;
  if (!(t.date in firstByDate)) firstByDate[t.date] = t.balanceAfter;
}

let failures = 0;
for (const [date, exp] of Object.entries(expected)) {
  const got = firstByDate[date];
  if (Math.abs(got - exp) > 0.001) {
    failures++;
    console.log(`MISMATCH ${date}: expected ${exp} got ${got}`);
  }
}

const cleared = transactions.filter((t) => t.status !== "pending");
const pending = transactions.filter((t) => t.status === "pending");
console.log(`cleared transactions: ${cleared.length}`);
console.log(`pending transactions: ${pending.length}`);
console.log(`account.balance: ${account.balance}`);
if (Math.abs(account.balance - expectedAccountBalance) > 0.001) {
  failures++;
  console.log(`MISMATCH account.balance: expected ${expectedAccountBalance} got ${account.balance}`);
}

const bangladesh = transactions.find((t) => t.merchant === "Bangladesh High Commission");
console.log(
  `Bangladesh pending: ${bangladesh?.amount} (expect -75)`
);

// balanceBefore = balanceAfter - amount consistency
let inconsistent = 0;
for (const t of cleared) {
  if (Math.abs(t.balanceBefore - (t.balanceAfter - t.amount)) > 0.001) inconsistent++;
}

console.log(failures === 0 ? "ALL DAY CLOSINGS MATCH ✓" : `${failures} FAILURES`);
console.log(`balanceBefore consistency issues: ${inconsistent}`);
