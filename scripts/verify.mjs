import { transactions, account } from "../src/data.ts";

const expected = {
  "2026-06-01": 796.0,
  "2026-05-30": 4896.0,
  "2026-05-28": 4036.0,
  "2026-05-27": 4048.1,
  "2026-05-25": 4048.99,
  "2026-05-24": 4055.49,
  "2026-05-23": 4060.57,
  "2026-05-21": 4066.72,
  "2026-05-20": 4071.3,
  "2026-05-17": 4102.45,
  "2026-05-16": 4108.42,
  "2026-05-14": 4127.82,
  "2026-05-13": 4133.97,
  "2026-05-12": 4144.84,
  "2026-05-10": 4164.84,
  "2026-05-09": 4170.99,
  "2026-05-08": 4176.86,
  "2026-05-07": 4196.86,
  "2026-05-06": 4201.94,
  "2026-05-05": 4208.09,
  "2026-05-03": 4238.09,
  "2026-05-02": 4243.17,
  "2026-04-30": 4249.32,
  "2026-04-29": 4253.9,
  "2026-04-26": 4265.04,
  "2026-04-25": 4273.11,
  "2026-04-23": 4277.69,
  "2026-04-22": 4283.84,
  "2026-04-20": 4288.92,
  "2026-04-19": 4313.92,
  "2026-04-18": 4320.07,
  "2026-04-16": 4338.74,
  "2026-04-15": 4343.82,
  "2026-04-12": 4357.16,
  "2026-04-11": 4382.24,
  "2026-04-09": 4388.39,
  "2026-04-08": 4392.97,
  "2026-04-05": 4399.12,
  "2026-04-04": 4435.19,
  "2026-04-03": 4439.77,
  "2026-04-02": 3527.77,
  "2026-04-01": 3533.92,
  "2026-03-29": 3544.49,
  "2026-03-28": 3550.64,
  "2026-03-26": 3557.42,
  "2026-03-25": 3562.5,
  "2026-03-22": 3568.65,
  "2026-03-21": 3603.73,
  "2026-03-20": 3609.88,
  "2026-03-19": 3634.88,
  "2026-03-18": 3639.46,
  "2026-03-15": 3652.6,
  "2026-03-14": 3659.67,
  "2026-03-12": 3677.51,
  "2026-03-11": 3703.66,
  "2026-03-08": 3708.74,
  "2026-03-07": 3714.89,
  "2026-03-06": 3721.97,
  "2026-03-05": 2033.97,
  "2026-03-04": 2069.05,
  "2026-03-01": 2079.7,
  "2026-02-28": 2084.78,
  "2026-02-26": 2098.91,
  "2026-02-25": 2103.49,
  "2026-02-22": 2109.64,
  "2026-02-21": 2115.61,
  "2026-02-20": 2120.19,
  "2026-02-19": 2145.19,
  "2026-02-18": 2151.34,
  "2026-02-17": 2162.92,
  "2026-02-15": 2163.91,
  "2026-02-14": 2170.06,
  "2026-02-12": 2190.75,
  "2026-02-11": 2215.83,
  "2026-02-08": 2221.98,
  "2026-02-07": 2227.06,
  "2026-02-06": 2233.21,
  "2026-02-05": 533.21,
  "2026-02-04": 567.79,
  "2026-02-01": 579.93,
};

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
console.log(`cleared transactions: ${cleared.length}`);
console.log(`account.balance: ${account.balance}`);

// Spot-check LSBU tuition
const lsbu = transactions.find((t) => t.merchant === "London South Bank Univers");
console.log(
  `LSBU before/after: ${lsbu.balanceBefore} -> ${lsbu.balanceAfter} (expect 4896 -> 796)`
);

// balanceBefore = balanceAfter - amount consistency
let inconsistent = 0;
for (const t of cleared) {
  if (Math.abs(t.balanceBefore - (t.balanceAfter - t.amount)) > 0.001) inconsistent++;
}

console.log(failures === 0 ? "ALL DAY CLOSINGS MATCH ✓" : `${failures} FAILURES`);
console.log(`balanceBefore consistency issues: ${inconsistent}`);
