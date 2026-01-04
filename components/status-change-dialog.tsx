"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import type { RequestStatus } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Settings2 } from "lucide-react"
import { RequestStatusBadge } from "./request-status-badge"

interface StatusChangeDialogProps {
  currentStatus: RequestStatus
  onStatusChange: (status: RequestStatus) => void
}

const allStatuses: RequestStatus[] = [
  "Gözləmədədir",
  "Ambulans təyin edilib",
  "Ambulans yaxınlaşıb",
  "Sorğu yekunlaşıb",
  "Sorğu ləğv edilib",
]

export function StatusChangeDialog({ currentStatus, onStatusChange }: StatusChangeDialogProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(currentStatus)

  const handleSave = () => {
    onStatusChange(selectedStatus)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Settings2 className="h-4 w-4" />
          {t("changeStatus")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            {t("changeStatus")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="text-sm text-muted-foreground">Cari status:</div>
          <RequestStatusBadge status={currentStatus} />

          <div className="text-sm text-muted-foreground mt-6">Yeni status seçin:</div>

          <RadioGroup value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as RequestStatus)}>
            <div className="space-y-3">
              {allStatuses.map((status) => (
                <div
                  key={status}
                  className={`border rounded-lg p-3 transition-all ${
                    selectedStatus === status ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={status} id={status} />
                    <Label htmlFor={status} className="flex-1 cursor-pointer">
                      <RequestStatusBadge status={status} />
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              {t("cancel")}
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {t("save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
