export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function convertPrice(price: number, fromCurrency: string, toCurrency: string): number {
  // Simple conversion rates (in production, use real-time rates)
  const rates = {
    GHS: 1,
    USD: 0.084, // 1 GHS = 0.084 USD (approximate)
  }

  if (fromCurrency === toCurrency) return price

  // Convert to base currency (GHS) first, then to target
  const basePrice = fromCurrency === "GHS" ? price : price / rates[fromCurrency as keyof typeof rates]
  return toCurrency === "GHS" ? basePrice : basePrice * rates[toCurrency as keyof typeof rates]
}
