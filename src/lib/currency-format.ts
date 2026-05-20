export type CurrencyCode = "RON" | "EUR";

/**
 * Format a number as currency string.
 * RON: "1.234,56 lei"
 * EUR: "€1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  decimals = 2
): string {
  const needsDecimals = amount % 1 !== 0;
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: needsDecimals ? decimals : 0,
    maximumFractionDigits: decimals,
  };

  if (currency === "RON") {
    const formatted = amount.toLocaleString("ro-RO", options);
    return `${formatted} lei`;
  }

  const formatted = amount.toLocaleString("en-US", options);
  return `€${formatted}`;
}
