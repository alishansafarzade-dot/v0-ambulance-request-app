"use client"

import { useLanguage } from "@/lib/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockHospitals, mockCrews } from "@/lib/mock-data"
import type { User, UserRole, Gender } from "@/lib/types"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  const { t } = useLanguage()
  const isEdit = !!user

  const roles: UserRole[] = ["Sürücü", "Operator", "Admin", "Super Admin", "Tibbi əməkdaş"]
  const genders: Gender[] = ["Kişi", "Qadın"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? t("editUser") : t("addUser")}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("firstName")}</Label>
            <Input id="firstName" defaultValue={user?.firstName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t("lastName")}</Label>
            <Input id="lastName" defaultValue={user?.lastName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherName">{t("fatherName")}</Label>
            <Input id="fatherName" defaultValue={user?.fatherName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fin">{t("fin")}</Label>
            <Input id="fin" defaultValue={user?.fin} className="font-mono" maxLength={7} />
          </div>
          <div className="space-y-2">
            <Label>{t("gender")}</Label>
            <Select defaultValue={user?.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g === "Kişi" ? t("male") : t("female")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">{t("birthDate")}</Label>
            <Input id="birthDate" type="date" defaultValue={user?.birthDate} />
          </div>
          <div className="space-y-2">
            <Label>{t("role")}</Label>
            <Select defaultValue={user?.role}>
              <SelectTrigger>
                <SelectValue placeholder="Rol seçin" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("hospital")}</Label>
            <Select defaultValue={user?.hospitalId}>
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
            <Label>{t("crew")}</Label>
            <Select defaultValue={user?.crewId}>
              <SelectTrigger>
                <SelectValue placeholder="Briqada seçin" />
              </SelectTrigger>
              <SelectContent>
                {mockCrews.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phoneNumber")}</Label>
            <Input id="phone" defaultValue={user?.phoneNumber} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-red-600 hover:bg-red-700">
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
