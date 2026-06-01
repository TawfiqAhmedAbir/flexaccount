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
  balance: 796.0,
  available: 796.0,
};

// Account opening balance brought forward on 1 Feb 2026.
const OPENING_BALANCE = 588.0;
const INDIGO = "#2A2D6B";

const round2 = (n: number) => Math.round(n * 100) / 100;

const categoryByMerchant: Record<string, Category> = {
  "London South Bank Univers": "tuition",
  "Bank credit J SAINSBURYS PLC 5750742-1": "salary",
  "Tawfiq Ahmed Abir via Revolut": "transfer",
  Grok: "subscription",
  Cursor: "subscription",
  LuxuryTools: "subscription",
  "TFL - Transport for London": "transport",
  "TfL Travel Charge": "transport",
  Uber: "transport",
  "Uber Eats": "food",
  Deliveroo: "food",
  "Sainsbury's": "grocery",
  "Apple / iTunes": "digital",
  "Dixy Chicken": "food",
  "Sam's Chicken": "food",
  "Chick King": "food",
  "Chicken Cottage": "food",
  "Favourable Fried Chicken": "food",
  "Perfect Fried Chicken": "food",
  "Rooster's Piri Piri": "food",
  "Morley's": "food",
  "Rojalpark Express": "convenience",
  "Greenlane Convenience": "convenience",
  "Peacock Food & Wine": "convenience",
  "Village News": "convenience",
  "Best One": "convenience",
  "Nisa Local": "convenience",
  Londis: "convenience",
  Costcutter: "convenience",
  "Bim's": "convenience",
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
    case "Uber":
      return { kind: "uberBlack" };
    case "Uber Eats":
      return { kind: "uber" };
    case "Deliveroo":
      return { kind: "deliveroo" };
    case "Apple / iTunes":
      return { kind: "apple" };
    case "Sainsbury's":
      return { kind: "initial", letter: "S", color: "#F06C00" };
    case "TfL Travel Charge":
      return { kind: "initial", letter: "T", color: "#6B4FBB" };
    default: {
      const letter = merchant.replace(/[^A-Za-z]/, "").charAt(0).toUpperCase() || "?";
      return { kind: "initial", letter, color: INDIGO };
    }
  }
}

// Believable South-London metadata for physical-merchant (Variant B) rows.
// Swap-in target: replace `location` with a Google Static Maps lookup later.
const metaByMerchant: Record<string, MerchantMeta> = {
  "TFL - Transport for London": {
    location: "Transport for London, 5 Endeavour Sq, London E20 1JN, UK",
    phone: "+44 343 222 1234",
    website: "tfl.gov.uk",
    cardDescriptor: "TFL TRAVEL CH / TFL.GOV.UK/CP / GB / CONTACTLESS / 4416",
  },
  "Sainsbury's": {
    location: "Unit 33, Lewisham Centre, London SE13 7EP, UK",
    phone: "+44 20 8318 3042",
    website: "www.sainsburys.co.uk",
    cardDescriptor: "Sainsbury's / LEWISHAM LADY / GB / APPLEPAY / 7697",
  },
  Uber: {
    location: "Aldgate Tower, 2 Leman St, London E1 8FA, UK",
    phone: "+44 808 169 7335",
    website: "www.uber.com",
    cardDescriptor: "UBER *TRIP / HELP.UBER.COM / GB / APPLEPAY / 5521",
  },
  "Uber Eats": {
    location: "Aldgate Tower, 2 Leman St, London E1 8FA, UK",
    phone: "+44 808 189 8333",
    website: "www.ubereats.com",
    cardDescriptor: "UBER *EATS / HELP.UBER.COM / GB / APPLEPAY / 5521",
  },
  Deliveroo: {
    location: "The River Building, 1 Cousin Ln, London EC4R 3TE, UK",
    phone: "+44 20 3699 9977",
    website: "www.deliveroo.co.uk",
    cardDescriptor: "DELIVEROO / LONDON / GB / APPLEPAY / 2048",
  },
  "Apple / iTunes": {
    location: "Apple, 235 Regent St, London W1B 2EL, UK",
    phone: "+44 800 048 0408",
    website: "www.apple.com",
    cardDescriptor: "APPLE.COM/BILL / ITUNES.COM / GB / 8841",
  },
  "Dixy Chicken": {
    location: "129 Rushey Green, Catford, London SE6 4AA, UK",
    phone: "+44 20 8690 4455",
    website: "www.dixychicken.co.uk",
    cardDescriptor: "DIXY CHICKEN / CATFORD / GB / CONTACTLESS / 3390",
  },
  "Morley's": {
    location: "298 Lewisham High St, London SE13 6JZ, UK",
    phone: "+44 20 8852 6677",
    website: "www.morleys.co.uk",
    cardDescriptor: "MORLEYS / LEWISHAM / GB / CONTACTLESS / 7712",
  },
  "Chicken Cottage": {
    location: "44 Peckham High St, London SE15 5DT, UK",
    phone: "+44 20 7639 1188",
    website: "www.chickencottage.com",
    cardDescriptor: "CHICKEN COTTAGE / PECKHAM / GB / CONTACTLESS / 6604",
  },
  "Favourable Fried Chicken": {
    location: "12 New Cross Rd, London SE14 5DT, UK",
    phone: "+44 20 7732 3321",
    website: "www.ffc-london.co.uk",
    cardDescriptor: "FAVOURABLE FC / NEW CROSS / GB / CONTACTLESS / 1180",
  },
  "Perfect Fried Chicken": {
    location: "88 Walworth Rd, London SE17 1JW, UK",
    phone: "+44 20 7701 4567",
    website: "www.pfc-uk.co.uk",
    cardDescriptor: "PERFECT FC / WALWORTH / GB / CONTACTLESS / 9043",
  },
  "Rooster's Piri Piri": {
    location: "150 Rye Ln, Peckham, London SE15 4NB, UK",
    phone: "+44 20 7635 9090",
    website: "www.roosterspiripiri.com",
    cardDescriptor: "ROOSTERS PIRI / PECKHAM / GB / CONTACTLESS / 5526",
  },
  "Chick King": {
    location: "23 Deptford High St, London SE8 4AF, UK",
    phone: "+44 20 8691 2020",
    website: "www.chickking.co.uk",
    cardDescriptor: "CHICK KING / DEPTFORD / GB / CONTACTLESS / 7781",
  },
  "Sam's Chicken": {
    location: "61 Lewisham Way, London SE14 6QW, UK",
    phone: "+44 20 8694 7788",
    website: "www.samschicken.co.uk",
    cardDescriptor: "SAMS CHICKEN / LEWISHAM WAY / GB / CONTACTLESS / 3367",
  },
  "Rojalpark Express": {
    location: "210 Evelyn St, Deptford, London SE8 5BZ, UK",
    phone: "+44 20 8692 3344",
    website: "www.rojalparkexpress.co.uk",
    cardDescriptor: "ROJALPARK EXP / DEPTFORD / GB / CONTACTLESS / 6692",
  },
  "Greenlane Convenience": {
    location: "5 Greenlane Parade, London SE13 5HB, UK",
    phone: "+44 20 8318 7766",
    website: "www.greenlane-convenience.co.uk",
    cardDescriptor: "GREENLANE CONV / LEWISHAM / GB / CONTACTLESS / 4408",
  },
  "Peacock Food & Wine": {
    location: "77 Brockley Rd, London SE4 2SB, UK",
    phone: "+44 20 8691 5512",
    website: "www.peacockfoodandwine.co.uk",
    cardDescriptor: "PEACOCK F&W / BROCKLEY / GB / CONTACTLESS / 2231",
  },
  "Village News": {
    location: "14 Lee High Rd, London SE13 5LD, UK",
    phone: "+44 20 8852 9001",
    website: "www.villagenews-se13.co.uk",
    cardDescriptor: "VILLAGE NEWS / LEE / GB / CONTACTLESS / 8845",
  },
  "Best One": {
    location: "120 Rye Ln, Peckham, London SE15 4ST, UK",
    phone: "+44 20 7639 4422",
    website: "www.bestone.co.uk",
    cardDescriptor: "BEST ONE / PECKHAM / GB / CONTACTLESS / 5590",
  },
  "Nisa Local": {
    location: "45 Lewisham High St, London SE13 5JX, UK",
    phone: "+44 20 8852 7340",
    website: "www.nisalocally.co.uk",
    cardDescriptor: "NISA LOCAL / LEWISHAM / GB / CONTACTLESS / 1174",
  },
  Londis: {
    location: "8 New Cross Gate, London SE14 5DA, UK",
    phone: "+44 20 7732 5566",
    website: "www.londis.co.uk",
    cardDescriptor: "LONDIS / NEW CROSS / GB / CONTACTLESS / 3318",
  },
  Costcutter: {
    location: "19 Catford Broadway, London SE6 4SP, UK",
    phone: "+44 20 8690 8123",
    website: "www.costcutter.co.uk",
    cardDescriptor: "COSTCUTTER / CATFORD / GB / CONTACTLESS / 7026",
  },
  "Bim's": {
    location: "55 Deptford High St, London SE8 4AD, UK",
    phone: "+44 20 8691 7654",
    website: "www.bims-store.co.uk",
    cardDescriptor: "BIMS / DEPTFORD / GB / CONTACTLESS / 4471",
  },
};

// [date, merchant, amount] — newest first, cleared transactions only.
// Within a day, listed newest-first (top = latest that day).
const rawCleared: [string, string, number][] = [
  ["2026-06-01", "London South Bank Univers", -4100.0],
  ["2026-05-30", "Bank credit J SAINSBURYS PLC 5750742-1", 860.0],
  ["2026-05-28", "Dixy Chicken", -5.99],
  ["2026-05-28", "TFL - Transport for London", -6.11],
  ["2026-05-27", "Greenlane Convenience", -0.89],
  ["2026-05-25", "Uber", -6.5],
  ["2026-05-24", "TFL - Transport for London", -5.08],
  ["2026-05-23", "TFL - Transport for London", -6.15],
  ["2026-05-21", "TFL - Transport for London", -4.58],
  ["2026-05-20", "LuxuryTools", -25.0],
  ["2026-05-20", "TFL - Transport for London", -6.15],
  ["2026-05-17", "Peacock Food & Wine", -0.89],
  ["2026-05-17", "TFL - Transport for London", -5.08],
  ["2026-05-16", "Deliveroo", -14.82],
  ["2026-05-16", "TFL - Transport for London", -4.58],
  ["2026-05-14", "TFL - Transport for London", -6.15],
  ["2026-05-13", "Sam's Chicken", -5.79],
  ["2026-05-13", "TFL - Transport for London", -5.08],
  ["2026-05-12", "Cursor", -20.0],
  ["2026-05-10", "TFL - Transport for London", -6.15],
  ["2026-05-09", "Greenlane Convenience", -1.29],
  ["2026-05-09", "TFL - Transport for London", -4.58],
  ["2026-05-08", "Tawfiq Ahmed Abir via Revolut", -20.0],
  ["2026-05-07", "TFL - Transport for London", -5.08],
  ["2026-05-06", "TFL - Transport for London", -6.15],
  ["2026-05-05", "Grok", -30.0],
  ["2026-05-03", "TFL - Transport for London", -5.08],
  ["2026-05-02", "TFL - Transport for London", -6.15],
  ["2026-04-30", "TFL - Transport for London", -4.58],
  ["2026-04-29", "Chick King", -4.99],
  ["2026-04-29", "TFL - Transport for London", -6.15],
  ["2026-04-26", "Rojalpark Express", -2.99],
  ["2026-04-26", "TFL - Transport for London", -5.08],
  ["2026-04-25", "TFL - Transport for London", -4.58],
  ["2026-04-23", "TFL - Transport for London", -6.15],
  ["2026-04-22", "TFL - Transport for London", -5.08],
  ["2026-04-20", "LuxuryTools", -25.0],
  ["2026-04-19", "TFL - Transport for London", -6.15],
  ["2026-04-18", "Sainsbury's", -12.4],
  ["2026-04-18", "Costcutter", -1.69],
  ["2026-04-18", "TFL - Transport for London", -4.58],
  ["2026-04-16", "TFL - Transport for London", -5.08],
  ["2026-04-15", "Apple / iTunes", -0.99],
  ["2026-04-15", "Rooster's Piri Piri", -6.2],
  ["2026-04-15", "TFL - Transport for London", -6.15],
  ["2026-04-12", "Cursor", -20.0],
  ["2026-04-12", "TFL - Transport for London", -5.08],
  ["2026-04-11", "TFL - Transport for London", -6.15],
  ["2026-04-09", "TFL - Transport for London", -4.58],
  ["2026-04-08", "TFL - Transport for London", -6.15],
  ["2026-04-05", "Grok", -30.0],
  ["2026-04-05", "Londis", -0.99],
  ["2026-04-05", "TFL - Transport for London", -5.08],
  ["2026-04-04", "TFL - Transport for London", -4.58],
  ["2026-04-03", "Bank credit J SAINSBURYS PLC 5750742-1", 912.0],
  ["2026-04-02", "TFL - Transport for London", -6.15],
  ["2026-04-01", "Perfect Fried Chicken", -5.49],
  ["2026-04-01", "TFL - Transport for London", -5.08],
  ["2026-03-29", "TFL - Transport for London", -6.15],
  ["2026-03-28", "Nisa Local", -2.2],
  ["2026-03-28", "TFL - Transport for London", -4.58],
  ["2026-03-26", "TFL - Transport for London", -5.08],
  ["2026-03-25", "TFL - Transport for London", -6.15],
  ["2026-03-22", "Tawfiq Ahmed Abir via Revolut", -30.0],
  ["2026-03-22", "TFL - Transport for London", -5.08],
  ["2026-03-21", "TFL - Transport for London", -6.15],
  ["2026-03-20", "LuxuryTools", -25.0],
  ["2026-03-19", "TFL - Transport for London", -4.58],
  ["2026-03-18", "Favourable Fried Chicken", -6.99],
  ["2026-03-18", "TFL - Transport for London", -6.15],
  ["2026-03-15", "Best One", -1.99],
  ["2026-03-15", "TFL - Transport for London", -5.08],
  ["2026-03-14", "Uber Eats", -13.26],
  ["2026-03-14", "TFL - Transport for London", -4.58],
  ["2026-03-12", "Cursor", -20.0],
  ["2026-03-12", "TFL - Transport for London", -6.15],
  ["2026-03-11", "TFL - Transport for London", -5.08],
  ["2026-03-08", "TFL - Transport for London", -6.15],
  ["2026-03-07", "Village News", -2.5],
  ["2026-03-07", "TFL - Transport for London", -4.58],
  ["2026-03-06", "Bank credit J SAINSBURYS PLC 5750742-1", 1688.0],
  ["2026-03-05", "Grok", -30.0],
  ["2026-03-05", "TFL - Transport for London", -5.08],
  ["2026-03-04", "Chicken Cottage", -4.5],
  ["2026-03-04", "TFL - Transport for London", -6.15],
  ["2026-03-01", "TFL - Transport for London", -5.08],
  ["2026-02-28", "Uber", -7.98],
  ["2026-02-28", "TFL - Transport for London", -6.15],
  ["2026-02-26", "TFL - Transport for London", -4.58],
  ["2026-02-25", "TFL - Transport for London", -6.15],
  ["2026-02-22", "Peacock Food & Wine", -0.89],
  ["2026-02-22", "TFL - Transport for London", -5.08],
  ["2026-02-21", "TFL - Transport for London", -4.58],
  ["2026-02-20", "LuxuryTools", -25.0],
  ["2026-02-19", "TFL - Transport for London", -6.15],
  ["2026-02-18", "Morley's", -6.5],
  ["2026-02-18", "TFL - Transport for London", -5.08],
  ["2026-02-17", "Apple / iTunes", -0.99],
  ["2026-02-15", "TFL - Transport for London", -6.15],
  ["2026-02-14", "Deliveroo", -14.82],
  ["2026-02-14", "Greenlane Convenience", -1.29],
  ["2026-02-14", "TFL - Transport for London", -4.58],
  ["2026-02-12", "Cursor", -20.0],
  ["2026-02-12", "TFL - Transport for London", -5.08],
  ["2026-02-11", "TFL - Transport for London", -6.15],
  ["2026-02-08", "TFL - Transport for London", -5.08],
  ["2026-02-07", "TFL - Transport for London", -6.15],
  ["2026-02-06", "Bank credit J SAINSBURYS PLC 5750742-1", 1700.0],
  ["2026-02-05", "Grok", -30.0],
  ["2026-02-05", "TFL - Transport for London", -4.58],
  ["2026-02-04", "Dixy Chicken", -5.99],
  ["2026-02-04", "TFL - Transport for London", -6.15],
  ["2026-02-01", "Rojalpark Express", -2.99],
  ["2026-02-01", "TFL - Transport for London", -5.08],
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

// A single pending item (does not affect cleared balances), matching the app's
// "Pending" group + pending-detail screen.
const pendingTxn = buildTransaction(
  "pending-tfl-travel",
  "2026-06-01",
  "TfL Travel Charge",
  -11.75,
  "pending",
  account.balance
);

export const transactions: Transaction[] = [pendingTxn, ...clearedNewest];

const byId = new Map(transactions.map((t) => [t.id, t]));
export function getTransaction(id: string): Transaction | undefined {
  return byId.get(id);
}
