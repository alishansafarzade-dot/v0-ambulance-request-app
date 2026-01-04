"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockAmbulances } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Ambulance, MapPin } from "lucide-react"

interface AssignAmbulanceDialogProps {
  requestId: string
  onAssign: (ambulanceNumber: string) => void
}

export function AssignAmbulanceDialog({ requestId, onAssign }: AssignAmbulanceDialogProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [selectedAmbulance, setSelectedAmbulance] = useState<string>("")

  const handleAssign = () => {
    if (selectedAmbulance) {
      onAssign(selectedAmbulance)
      setOpen(false)
      setSelectedAmbulance("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Ambulance className="h-4 w-4" />
          {t("assignAmbulance")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ambulance className="h-5 w-5" />
            {t("selectAmbulance")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="text-sm text-muted-foreground mb-4">
            {t("availableAmbulances")} ({mockAmbulances.filter((a) => a.isAvailable).length})
          </div>

          <RadioGroup value={selectedAmbulance} onValueChange={setSelectedAmbulance}>
            <div className="space-y-3">
              {mockAmbulances.map((ambulance) => (
                <div
                  key={ambulance.id}
                  className={`border rounded-lg p-4 transition-all ${
                    selectedAmbulance === ambulance.number
                      ? "border-primary bg-primary/5"
                      : ambulance.isAvailable
                        ? "border-muted hover:border-primary/50"
                        : "border-muted bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value={ambulance.number}
                      id={ambulance.id}
                      disabled={!ambulance.isAvailable}
                      className="mt-1"
                    />
                    <Label htmlFor={ambulance.id} className="flex-1 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-lg">{ambulance.number}</p>
                          {ambulance.currentLocation && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {ambulance.currentLocation.address}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={ambulance.isAvailable ? "default" : "secondary"}
                          className={ambulance.isAvailable ? "bg-green-100 text-green-800" : ""}
                        >
                          {ambulance.isAvailable ? t("available") : t("busy")}
                        </Badge>
                      </div>
                      {ambulance.currentLocation && (
                        <div className="text-xs text-muted-foreground font-mono">
                          {ambulance.currentLocation.latitude.toFixed(4)},{" "}
                          {ambulance.currentLocation.longitude.toFixed(4)}
                        </div>
                      )}
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
            <Button onClick={handleAssign} disabled={!selectedAmbulance} className="flex-1">
              {t("assign")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
