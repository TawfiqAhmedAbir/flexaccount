export type TxnType = "debit" | "credit";

export type Category =
  | "transport"
  | "grocery"
  | "food"
  | "convenience"
  | "digital"
  | "subscription"
  | "transfer"
  | "salary"
  | "tuition";

export type Status = "pending" | "complete";

export type BadgeKind =
  | "initial"
  | "tfl"
  | "uber"
  | "uberBlack"
  | "deliveroo"
  | "apple";

export interface Badge {
  kind: BadgeKind;
  letter?: string;
  color?: string;
}

export interface MerchantMeta {
  location: string;
  phone: string;
  website: string;
  cardDescriptor: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number; // negative = debit, positive = credit
  type: TxnType;
  date: string; // ISO yyyy-mm-dd
  category: Category;
  status: Status;
  badge: Badge;
  balanceAfter: number;
  balanceBefore: number;
  location?: string;
  phone?: string;
  website?: string;
  cardDescriptor?: string;
}

export const account = {
  name: "FlexAccount",
  sortCode: "07-09-76",
  number: "01299995",
  balance: 2613.89,
  available: 2613.89,
};

// Opening brought forward so the filtered June slice closes at £2,613.89:
// 1,662.79 + 988.67 credits - 37.57 debits = 2,613.89
const OPENING_BALANCE = 1662.79;
const INDIGO = "#2A2D6B";

const round2 = (n: number) => Math.round(n * 100) / 100;

const categoryByMerchant: Record<string, Category> = {
  "Bank credit J SAINSBURYS PLC 5750742-1": "salary",
  "Bank credit MR M A BATEN": "transfer",
  "Bangladesh High Commission": "transfer",
  "TFL - Transport for London": "transport",
  "Top Dixie Chicken": "food",
  "Prime | Premier Stores": "convenience",
};

const VARIANT_C: Category[] = ["tuition", "transfer", "salary", "subscription"];

export function categoryFor(merchant: string): Category {
  return categoryByMerchant[merchant] ?? "convenience";
}

export function variantFor(t: Transaction): "A" | "B" | "C" {
  if (t.status === "pending") return "A";
  if (VARIANT_C.includes(t.category)) return "C";
  return "B";
}

function badgeFor(merchant: string): Badge {
  switch (merchant) {
    case "TFL - Transport for London":
      return { kind: "tfl" };
    case "Bangladesh High Commission":
      return { kind: "initial", letter: "B", color: "#006A4E" };
    case "Top Dixie Chicken":
      return { kind: "initial", letter: "T", color: "#D4202A" };
    case "Prime | Premier Stores":
      return { kind: "initial", letter: "P", color: "#8B1E3F" };
    default: {
      const letter = merchant.replace(/[^A-Za-z]/, "").charAt(0).toUpperCase() || "?";
      return { kind: "initial", letter, color: INDIGO };
    }
  }
}

const metaByMerchant: Record<string, MerchantMeta> = {
  "TFL - Transport for London": {
    location: "Transport for London, 5 Endeavour Sq, London E20 1JN, UK",
    phone: "+44 343 222 1234",
    website: "tfl.gov.uk",
    cardDescriptor: "TFL TRAVEL CH / TFL.GOV.UK/CP / GB / CONTACTLESS / 4416",
  },
  "Bangladesh High Commission": {
    location: "28 Queen's Gate, London SW7 5JA, UK",
    phone: "+44 20 7584 0081",
    website: "www.bhclondon.org.uk",
    cardDescriptor: "BANGLADESH HIGH COMM / LONDON / GB / CONTACTLESS / 7501",
  },
  "Top Dixie Chicken": {
    location: "129 Rushey Green, Catford, London SE6 4AA, UK",
    phone: "+44 20 8690 4455",
    website: "www.dixychicken.co.uk",
    cardDescriptor: "TOP DIXIE CHICKEN / CATFORD / GB / CONTACTLESS / 3390",
  },
  "Prime | Premier Stores": {
    location: "45 High St, London SE20 7HJ, UK",
    phone: "+44 20 8778 1234",
    website: "www.premier-stores.co.uk",
    cardDescriptor: "PRIME PREMIER / LONDON / GB / CONTACTLESS / 8812",
  },
};

// [date, merchant, amount] — newest first, cleared transactions only.
// Filtered screenshot set: all credits, TfL, and 3 selected spends.
const rawCleared: [string, string, number][] = [
  ["2026-06-30", "Prime | Premier Stores", -6.27],
  ["2026-06-30", "TFL - Transport for London", -7.65],
  ["2026-06-29", "TFL - Transport for London", -6.75],
  ["2026-06-29", "Bank credit MR M A BATEN", 50.0],
  ["2026-06-26", "Prime | Premier Stores", -6.0],
  ["2026-06-26", "Bank credit J SAINSBURYS PLC 5750742-1", 938.67],
  ["2026-06-25", "Top Dixie Chicken", -2.4],
  ["2026-06-22", "TFL - Transport for London", -8.5],
];

function buildTransaction(
  id: string,
  date: string,
  merchant: string,
  amount: number,
  status: Status,
  balanceAfter: number
): Transaction {
  const category = categoryFor(merchant);
  const meta = metaByMerchant[merchant];
  return {
    id,
    merchant,
    amount,
    type: amount >= 0 ? "credit" : "debit",
    date,
    category,
    status,
    badge: badgeFor(merchant),
    balanceAfter,
    balanceBefore: round2(balanceAfter - amount),
    ...(meta ? meta : {}),
  };
}

// Compute running balances chronologically (oldest first), then flip to newest first.
const chronological = [...rawCleared].reverse();
let running = OPENING_BALANCE;
const clearedChrono = chronological.map(([date, merchant, amount], i) => {
  running = round2(running + amount);
  return buildTransaction(`t${i}`, date, merchant, amount, "complete", running);
});
const clearedNewest = [...clearedChrono].reverse();

// Pending item does not affect cleared balances.
const pendingTxn = buildTransaction(
  "pending-bangladesh",
  "2026-06-30",
  "Bangladesh High Commission",
  -75.0,
  "pending",
  account.balance
);

export const transactions: Transaction[] = [pendingTxn, ...clearedNewest];

const byId = new Map(transactions.map((t) => [t.id, t]));
export function getTransaction(id: string): Transaction | undefined {
  return byId.get(id);
}
