"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockUsers, mockHospitals, mockCrews } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Key, Power, Search, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserFormDialog } from "@/components/user-form-dialog"
import { PasswordChangeDialog } from "@/components/password-change-dialog"
import { Suspense } from "react"

export default function UsersPage() {
  return (
    <Suspense fallback={null}>
      <UsersPageContent />
    </Suspense>
  )
}

function UsersPageContent() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)

  const filteredUsers = mockUsers.filter((user) => {
    const searchStr = `${user.firstName} ${user.lastName} ${user.fin}`.toLowerCase()
    return searchStr.includes(searchTerm.toLowerCase())
  })

  const getHospitalName = (id?: string) => mockHospitals.find((h) => h.id === id)?.name || "-"
  const getCrewName = (id?: string) => mockCrews.find((c) => c.id === id)?.name || "-"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("users")}</h1>
          <p className="text-muted-foreground">Sistem istifadəçilərini idarə edin</p>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(null)
            setIsFormOpen(true)
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addUser")}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Ad, Soyad və ya FİN ilə axtarış..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>{t("firstName")}</TableHead>
              <TableHead>{t("lastName")}</TableHead>
              <TableHead>{t("fatherName")}</TableHead>
              <TableHead>{t("fin")}</TableHead>
              <TableHead>{t("role")}</TableHead>
              <TableHead>{t("crew")}</TableHead>
              <TableHead>{t("hospital")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.fatherName}</TableCell>
                <TableCell className="font-mono text-xs">{user.fin}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{getCrewName(user.crewId)}</TableCell>
                <TableCell>{getHospitalName(user.hospitalId)}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "success" : "secondary"}>{user.isActive ? "Aktiv" : "Deaktiv"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("viewDetails")}
                      onClick={() => {
                        setSelectedUser(user)
                        setIsFormOpen(true)
                      }}
                    >
                      <Info className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("changePassword")}
                      onClick={() => setIsPasswordOpen(true)}
                    >
                      <Key className="h-4 w-4 text-amber-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title={user.isActive ? "Deaktiv et" : "Aktiv et"}>
                      <Power className={cn("h-4 w-4", user.isActive ? "text-red-500" : "text-green-500")} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} user={selectedUser} />

      <PasswordChangeDialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen} />
    </div>
  )
}
