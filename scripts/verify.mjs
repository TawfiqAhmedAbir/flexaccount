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

const cleared = transactions.filter((t) => t.status !== "pending");
const pending = transactions.filter((t) => t.status === "pending");

const firstByDate = {};
for (const t of cleared) {
  if (!(t.date in firstByDate)) firstByDate[t.date] = t.balanceAfter;
}

let failures = 0;

const newest = cleared[0];
if (!newest || Math.abs(newest.balanceAfter - account.balance) > 0.001) {
  failures++;
  console.log(
    `MISMATCH account.balance: expected ${newest?.balanceAfter} got ${account.balance}`
  );
}

let prev = null;
for (let i = cleared.length - 1; i >= 0; i--) {
  const t = cleared[i];
  if (prev && Math.abs(t.balanceBefore - prev.balanceAfter) > 0.001) {
    failures++;
    console.log(`MISMATCH chain at ${t.id}: before ${t.balanceBefore} != prev ${prev.balanceAfter}`);
  }
  if (Math.abs(t.balanceBefore - (t.balanceAfter - t.amount)) > 0.001) {
    failures++;
    console.log(`MISMATCH before/after at ${t.id}`);
  }
  prev = t;
}

console.log(`cleared transactions: ${cleared.length}`);
console.log(`pending transactions: ${pending.length}`);
console.log(`account.balance: ${account.balance}`);

const lsbu = transactions.find((t) => t.merchant === "London South Bank Univers");
console.log(
  `LSBU before/after: ${lsbu.balanceBefore} -> ${lsbu.balanceAfter} (expect 4896 -> 796)`
);

const bangladesh = transactions.find((t) => t.merchant === "Bangladesh High Commission");
console.log(`Bangladesh pending: ${bangladesh?.amount} (expect -75)`);

console.log(failures === 0 ? "ALL CHECKS PASS ✓" : `${failures} FAILURES`);
