"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [fin, setFin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fin.trim() || !password.trim()) {
      setError(t.required)
      return
    }

    // Simulate login
    setLoading(true)
    setTimeout(() => {
      // Store login state
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userFin", fin)
      router.push("/")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-red-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">{t.loginTitle}</CardTitle>
          <CardDescription className="text-red-100">{t.loginSubtitle}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.fin}</label>
              <Input
                type="text"
                placeholder={t.fin}
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.password}</label>
              <Input
                type="password"
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2"
              disabled={loading}
            >
              {loading ? "..." : t.login}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
