"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Currency = "GHS" | "USD"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (priceGHS: number, priceUSD: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("GHS")

  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency") as Currency
    if (saved && (saved === "GHS" || saved === "USD")) {
      setCurrency(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("preferred-currency", currency)
  }, [currency])

  const convertPrice = (priceGHS: number, priceUSD: number) => {
    return currency === "GHS" ? priceGHS : priceUSD
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
