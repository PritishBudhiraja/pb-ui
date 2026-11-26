import type { ReactNode } from "react"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="portfolio">
      <body>{children}</body>
    </html>
  )
}
