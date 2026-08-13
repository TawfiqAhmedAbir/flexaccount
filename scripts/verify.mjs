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
const excluded = [
  "uber",
  "deliveroo",
  "revolut",
  "atm",
  "cash withdrawal",
  "rojalpark",
  "prime",
  "premier",
  "village news",
  "a p news",
  "lime store",
  "sweet express",
  "peacock",
  "variety foods",
  "greenlane",
  "best one",
  "nisa",
  "londis",
  "costcutter",
  "bim's",
];

const cleared = transactions.filter((t) => t.status !== "pending");
const pending = transactions.filter((t) => t.status === "pending");

let failures = 0;

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

if (pending.length !== 0) {
  failures++;
  console.log(`UNEXPECTED pending rows: ${pending.map((t) => t.merchant).join(", ")}`);
}

const bangladesh = cleared.find((t) => t.merchant === "Bangladesh High Commission");
if (!bangladesh || bangladesh.date !== "2026-07-01" || Math.abs(bangladesh.amount + 75) > 0.001) {
  failures++;
  console.log(
    `MISMATCH Bangladesh: expected cleared -75 on 2026-07-01, got ${bangladesh?.amount} on ${bangladesh?.date} (${bangladesh?.status})`
  );
}

const nazneen = cleared.find((t) => t.merchant.toLowerCase().includes("nazneen"));
if (!nazneen || nazneen.amount <= 0) {
  failures++;
  console.log("MISSING Nazneen bank credit");
}

for (const t of transactions) {
  const ml = t.merchant.toLowerCase();
  if (excluded.some((s) => ml.includes(s))) {
    failures++;
    console.log(`EXCLUDED merchant present: ${t.merchant} (${t.date})`);
  }
}

const credits = cleared.filter((t) => t.amount > 0);
if (credits.length < 8) {
  failures++;
  console.log(`TOO FEW credits: ${credits.length}`);
}

for (const name of ["Lidl", "Iceland", "Sainsbury's", "TFL - Transport for London"]) {
  if (!cleared.some((t) => t.merchant === name)) {
    failures++;
    console.log(`MISSING merchant: ${name}`);
  }
}

const idxJulAug = cleared.findIndex((t) => t.date >= "2026-07-01");
const idxJun30 = cleared.findIndex((t) => t.date === "2026-06-30");
if (idxJulAug < 0 || idxJun30 < 0 || idxJulAug > idxJun30) {
  failures++;
  console.log("July/August rows must sit above 2026-06-30 in newest-first order");
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

const tflCount = cleared.filter((t) => t.merchant === "TFL - Transport for London").length;

console.log(`cleared transactions: ${cleared.length}`);
console.log(`pending transactions: ${pending.length}`);
console.log(`account.balance: ${account.balance}`);
console.log(`newest date: ${newest?.date} ${newest?.merchant}`);
console.log(`TFL rows: ${tflCount}`);
console.log(`credits: ${credits.length}`);
console.log(`Bangladesh cleared: ${bangladesh?.amount} on ${bangladesh?.date}`);
console.log(`Nazneen credit: ${nazneen?.amount} on ${nazneen?.date}`);

console.log(failures === 0 ? "ALL CHECKS PASS ✓" : `${failures} FAILURES`);
if (failures !== 0) process.exit(1);
