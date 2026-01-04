"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockCrews, mockHospitals, mockUsers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Power, Truck, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CrewsPage() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCrew, setSelectedCrew] = useState<any>(null)

  const getHospitalName = (id: string) => mockHospitals.find((h) => h.id === id)?.name || "-"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("crews")}</h1>
          <p className="text-muted-foreground">Aktiv təcili yardım briqadaları və heyətləri</p>
        </div>
        <Button
          onClick={() => {
            setSelectedCrew(null)
            setIsOpen(true)
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addCrew")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCrews.map((crew) => (
          <div key={crew.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 p-3 rounded-lg text-red-600">
                <Truck className="h-6 w-6" />
              </div>
              <Badge variant={crew.isActive ? "success" : "secondary"}>{crew.isActive ? "Aktiv" : "Deaktiv"}</Badge>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">{crew.name}</h3>
            <p className="text-sm text-blue-600 font-medium mb-4 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {getHospitalName(crew.hospitalId)}
            </p>

            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("members")}</p>
              <div className="space-y-2">
                {crew.memberIds.map((memberId) => {
                  const user = mockUsers.find((u) => u.id === memberId)
                  return (
                    <div key={memberId} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                      </div>
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                      <Badge variant="outline" className="text-[10px] py-0 h-4">
                        {user?.role}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedCrew(crew)
                  setIsOpen(true)
                }}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Redaktə
              </Button>
              <Button variant="ghost" size="icon">
                <Power className={crew.isActive ? "text-red-500" : "text-green-500"} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCrew ? "Briqadanı redaktə et" : t("addCrew")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="crewName">{t("crewName")}</Label>
              <Input id="crewName" defaultValue={selectedCrew?.name} placeholder="Məs: Briqada #102" />
            </div>

            <div className="space-y-2">
              <Label>{t("hospital")}</Label>
              <Select defaultValue={selectedCrew?.hospitalId}>
                <SelectTrigger>
                  <SelectValue placeholder="Xəstəxana seçin" />
                </SelectTrigger>
                <SelectContent>
                  {mockHospitals.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("members")}</Label>
              <div className="p-3 border rounded-md max-h-40 overflow-y-auto space-y-2">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                      defaultChecked={selectedCrew?.memberIds.includes(user.id)}
                    />
                    <label htmlFor={`user-${user.id}`} className="text-sm cursor-pointer">
                      {user.firstName} {user.lastName} ({user.role})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => setIsOpen(false)} className="bg-red-600 hover:bg-red-700">
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
