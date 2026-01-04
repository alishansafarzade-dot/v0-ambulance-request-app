"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LayoutDashboard, ClipboardList, Hospital, Users, Truck, Siren, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSelector } from "./language-selector"

export function SidebarNav() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/requests", label: t("requests"), icon: ClipboardList },
    { href: "/hospitals", label: t("hospitals"), icon: Hospital },
    { href: "/users", label: t("users"), icon: Users },
    { href: "/crews", label: t("crews"), icon: Truck },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white flex flex-col z-50">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="bg-red-600 p-2 rounded-lg">
          <Siren className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-lg leading-tight truncate">Təcili Yardım</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === item.href
                ? "bg-red-50 text-red-600 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center justify-between px-3">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Dil</span>
          <LanguageSelector />
        </div>

        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Çıxış</span>
        </button>
      </div>
    </aside>
  )
}
