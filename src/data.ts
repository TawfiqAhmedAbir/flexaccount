export type TxnType = "debit" | "credit";

export interface Badge {
  kind: "initial" | "uber" | "deliveroo" | "tfl";
  letter?: string;
  color?: string;
}

export interface Transaction {
  merchant: string;
  badge: Badge;
  amount: number;
  type: TxnType;
}

export interface TransactionGroup {
  label: string;
  runningBalance?: number;
  dividerBefore?: string;
  items: Transaction[];
}

export const account = {
  name: "FlexAccount",
  sortCode: "07-09-76",
  number: "01299995",
  balance: 4896,
  available: 4896,
};

export const transactionGroups: TransactionGroup[] = [
  {
    label: "Pending",
    items: [
      {
        merchant: "TfL Travel Charge",
        badge: { kind: "initial", letter: "T", color: "#6B4FBB" },
        amount: 11.75,
        type: "debit",
      },
    ],
  },
  {
    label: "Tomorrow",
    runningBalance: 3601.13,
    items: [
      {
        merchant: "Sainsbury's",
        badge: { kind: "initial", letter: "S", color: "#E8761E" },
        amount: 7.95,
        type: "debit",
      },
      {
        merchant: "Sainsbury's",
        badge: { kind: "initial", letter: "S", color: "#E8761E" },
        amount: 3.74,
        type: "debit",
      },
      {
        merchant: "Village News",
        badge: { kind: "initial", letter: "V", color: "#6B4FBB" },
        amount: 1.99,
        type: "debit",
      },
      {
        merchant: "Uber Eats",
        badge: { kind: "uber" },
        amount: 3.35,
        type: "debit",
      },
    ],
  },
  {
    label: "Yesterday",
    runningBalance: 3618.16,
    dividerBefore: "May 2026",
    items: [
      {
        merchant: "Rojalpark Express",
        badge: { kind: "initial", letter: "R", color: "#6B4FBB" },
        amount: 8.5,
        type: "debit",
      },
      {
        merchant: "TFL - Transport for London",
        badge: { kind: "tfl" },
        amount: 11.2,
        type: "debit",
      },
    ],
  },
  {
    label: "Friday 29 May",
    runningBalance: 3637.86,
    items: [
      {
        merchant: "Deliveroo",
        badge: { kind: "deliveroo" },
        amount: 16.75,
        type: "debit",
      },
      {
        merchant: "Rojalpark Express",
        badge: { kind: "initial", letter: "R", color: "#6B4FBB" },
        amount: 9.49,
        type: "debit",
      },
      {
        merchant: "Bank credit J SAINSBURYS PLC 5750742-1",
        badge: { kind: "initial", letter: "B", color: "#2F6BD8" },
        amount: 789.64,
        type: "credit",
      },
    ],
  },
];
