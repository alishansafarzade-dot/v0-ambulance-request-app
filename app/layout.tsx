import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { SidebarNav } from "@/components/sidebar-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Təcili Yardım İdarəetmə Sistemi",
  description: "Ambulans sorğularını idarə etmək üçün sistem",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az">
      <body className={`font-sans antialiased bg-gray-50`}>
        <LanguageProvider>
          <div className="flex">
            <SidebarNav />
            <main className="flex-1 ml-64 min-h-screen">{children}</main>
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
