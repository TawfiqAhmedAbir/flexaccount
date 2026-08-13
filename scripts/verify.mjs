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

const expectedAccountBalance = 2613.89;
const expectedCleared = 8;
const expectedDayClosings = {
  "2026-06-30": 2613.89,
  "2026-06-29": 2627.81,
  "2026-06-26": 2584.56,
  "2026-06-25": 1651.89,
  "2026-06-22": 1654.29,
};

const cleared = transactions.filter((t) => t.status !== "pending");
const pending = transactions.filter((t) => t.status === "pending");

const firstByDate = {};
for (const t of cleared) {
  if (!(t.date in firstByDate)) firstByDate[t.date] = t.balanceAfter;
}

let failures = 0;

if (cleared.length !== expectedCleared) {
  failures++;
  console.log(`MISMATCH cleared count: expected ${expectedCleared} got ${cleared.length}`);
}

const newest = cleared[0];
if (!newest || Math.abs(newest.balanceAfter - account.balance) > 0.001) {
  failures++;
  console.log(
    `MISMATCH account.balance vs newest: expected ${newest?.balanceAfter} got ${account.balance}`
  );
}

if (Math.abs(account.balance - expectedAccountBalance) > 0.001) {
  failures++;
  console.log(
    `MISMATCH account.balance: expected ${expectedAccountBalance} got ${account.balance}`
  );
}

for (const [date, exp] of Object.entries(expectedDayClosings)) {
  const got = firstByDate[date];
  if (got == null || Math.abs(got - exp) > 0.001) {
    failures++;
    console.log(`MISMATCH ${date}: expected ${exp} got ${got}`);
  }
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

const net = round2(cleared.reduce((sum, t) => sum + t.amount, 0));
console.log(`cleared transactions: ${cleared.length}`);
console.log(`pending transactions: ${pending.length}`);
console.log(`account.balance: ${account.balance}`);
console.log(`cleared net: ${net}`);

const bangladesh = transactions.find((t) => t.merchant === "Bangladesh High Commission");
if (!bangladesh || bangladesh.status !== "pending" || Math.abs(bangladesh.amount + 75) > 0.001) {
  failures++;
  console.log(`MISMATCH Bangladesh pending: ${bangladesh?.amount} (expect -75)`);
} else {
  console.log(`Bangladesh pending: ${bangladesh.amount} (expect -75)`);
}

const merchants = new Set(cleared.map((t) => t.merchant));
for (const name of [
  "Bank credit MR M A BATEN",
  "Bank credit J SAINSBURYS PLC 5750742-1",
  "TFL - Transport for London",
  "Prime | Premier Stores",
  "Top Dixie Chicken",
]) {
  if (!merchants.has(name)) {
    failures++;
    console.log(`MISSING merchant: ${name}`);
  }
}

console.log(failures === 0 ? "ALL CHECKS PASS ✓" : `${failures} FAILURES`);
if (failures !== 0) process.exit(1);

function round2(n) {
  return Math.round(n * 100) / 100;
}
