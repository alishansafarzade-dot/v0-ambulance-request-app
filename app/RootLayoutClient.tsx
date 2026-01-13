"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [pathname])

  if (!mounted) return null

  const isLoginPage = pathname === "/login" || pathname.startsWith("/login")

  return (
    <div className="flex">
      {!isLoginPage && isLoggedIn && <SidebarNav />}
      <main className={`flex-1 min-h-screen ${!isLoginPage && isLoggedIn ? "ml-64" : ""}`}>{children}</main>
    </div>
  )
}
