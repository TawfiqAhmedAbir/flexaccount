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
  "uber eats",
  "deliveroo",
  "revolut",
  "atm",
  "rojalpark",
  "prime",
  "premier",
  "village news",
  "a p news",
  "lime store",
  "sweet express",
  "peacock",
  "variety foods",
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

if (!cleared.some((t) => t.date.startsWith("2026-07"))) {
  failures++;
  console.log("MISSING July transactions");
}
if (!cleared.some((t) => t.date.startsWith("2026-08"))) {
  failures++;
  console.log("MISSING August transactions");
}
if (!cleared.some((t) => t.date === "2026-06-30")) {
  failures++;
  console.log("MISSING 2026-06-30 rows under July/August");
}

const idxAug = cleared.findIndex((t) => t.date.startsWith("2026-08") || t.date.startsWith("2026-07"));
const idxJun30 = cleared.findIndex((t) => t.date === "2026-06-30");
if (idxAug < 0 || idxJun30 < 0 || idxAug > idxJun30) {
  failures++;
  console.log("July/August rows must sit above 2026-06-30 in newest-first order");
}

for (const t of transactions) {
  const ml = t.merchant.toLowerCase();
  if (excluded.some((s) => ml.includes(s))) {
    failures++;
    console.log(`EXCLUDED merchant present: ${t.merchant} (${t.status})`);
  }
}

for (const name of ["Lidl", "Iceland", "Uber", "TFL - Transport for London", "Sainsbury's"]) {
  if (!cleared.some((t) => t.merchant === name || t.merchant.startsWith("Bank credit J SAINSBURYS"))) {
    if (name === "Sainsbury's") {
      const has = cleared.some((t) => t.merchant === "Sainsbury's" || t.merchant.startsWith("Bank credit J SAINSBURYS"));
      if (!has) {
        failures++;
        console.log(`MISSING merchant: ${name}`);
      }
    } else if (!cleared.some((t) => t.merchant === name)) {
      failures++;
      console.log(`MISSING merchant: ${name}`);
    }
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

const pendingExcluded = pending.filter((t) =>
  excluded.some((s) => t.merchant.toLowerCase().includes(s))
);
if (pendingExcluded.length) {
  failures++;
  console.log(`EXCLUDED pending still present: ${pendingExcluded.map((t) => t.merchant).join(", ")}`);
}

console.log(`cleared transactions: ${cleared.length}`);
console.log(`pending transactions: ${pending.length}`);
console.log(`account.balance: ${account.balance}`);
console.log(`newest date: ${newest?.date} ${newest?.merchant}`);
console.log(`July/August count: ${cleared.filter((t) => t.date >= "2026-07-01").length}`);

const bangladesh = pending.find((t) => t.merchant === "Bangladesh High Commission");
console.log(`Bangladesh pending: ${bangladesh?.amount ?? "none"}`);

console.log(failures === 0 ? "ALL CHECKS PASS ✓" : `${failures} FAILURES`);
if (failures !== 0) process.exit(1);
