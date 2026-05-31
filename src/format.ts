export function formatGBP(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function signedGBP(value: number, type: "debit" | "credit"): string {
  const sign = type === "credit" ? "+" : "−";
  return `${sign}${formatGBP(value)}`;
}
