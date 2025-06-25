import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyProvider } from "@/contexts/currency-context"
import { Toaster } from "sonner"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AiNest - AI-Powered Digital Solutions",
  description: "Transform your business with cutting-edge AI integrations, stunning web development, and innovative digital solutions.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Dark/light theme + stateful providers */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            {children}
            {/* Global components */}
            <ChatWidget />
            <Toaster position="top-right" />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
