"use client"

import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"

// <CHANGE> Created LayoutContent as a separate client component to handle conditional sidebar rendering
function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Note: usePathname cannot be used in server component, will use client wrapper
  return <div className="flex">{children}</div>
}

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login")

  return (
    <div className="flex">
      {!isLoginPage && <SidebarNav />}
      <main className={`flex-1 min-h-screen ${!isLoginPage ? "ml-64" : ""}`}>{children}</main>
    </div>
  )
}
