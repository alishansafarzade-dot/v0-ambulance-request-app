"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockHospitals } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Power, HospitalIcon, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HospitalsPage() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<any>(null)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("hospitals")}</h1>
          <p className="text-muted-foreground">Sistemdə qeydiyyatda olan xəstəxanalar</p>
        </div>
        <Button
          onClick={() => {
            setSelectedHospital(null)
            setIsOpen(true)
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addHospital")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <HospitalIcon className="h-6 w-6" />
                </div>
                <Badge variant={hospital.isActive ? "success" : "secondary"}>
                  {hospital.isActive ? "Aktiv" : "Deaktiv"}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{hospital.address}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedHospital(hospital)
                  setIsOpen(true)
                }}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Redaktə
              </Button>
              <Button variant="ghost" size="icon" title={hospital.isActive ? "Deaktiv et" : "Aktiv et"}>
                <Power className={hospital.isActive ? "text-red-500" : "text-green-500"} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedHospital ? t("editHospital") : t("addHospital")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("hospitalName")}</Label>
              <Input id="name" defaultValue={selectedHospital?.name} placeholder="Xəstəxananın tam adı" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" defaultValue={selectedHospital?.address} placeholder="Tam ünvan" />
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
