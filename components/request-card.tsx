"use client"

import { useLanguage } from "@/lib/language-context"
import type { AmbulanceRequest } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RequestStatusBadge } from "./request-status-badge"
import { Phone, MapPin, Ambulance, User, Eye } from "lucide-react"
import Link from "next/link"
import { MiniMapPreview } from "./mini-map-preview"
import { useState } from "react"

interface RequestCardProps {
  request: AmbulanceRequest
}

const callReasonTranslations: Record<string, string> = {
  Ürəktutması: "reasonHeartAttack",
  Xəsarət: "reasonInjury",
  Yanığ: "reasonBurn",
  "Tənəffüs problemi": "reasonBreathing",
  Digər: "reasonOther",
}

export function RequestCard({ request }: RequestCardProps) {
  const { t } = useLanguage()
  const fullName = `${request.dispatcherName} ${request.dispatcherSurname} ${request.dispatcherFatherName}`
  const [showMap, setShowMap] = useState(false)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-lg">{fullName}</span>
            </div>
            <RequestStatusBadge status={request.status} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Ambulance className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t("ambulanceNumber")}</p>
              <p className="font-medium">{request.ambulanceNumber || t("notAssigned")}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t("phoneNumber")}</p>
              <p className="font-medium">{request.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t("location")}</p>
              <p className="font-medium text-sm">{request.location.address}</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1" onClick={() => setShowMap(!showMap)}>
                {showMap ? "Gizlət" : t("showOnMap")}
              </Button>
            </div>
          </div>

          {showMap && (
            <div className="mt-3">
              <MiniMapPreview location={request.location} />
            </div>
          )}

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">{t("callReason")}</p>
            <p className="font-semibold text-red-700">{t(callReasonTranslations[request.callReason] as any)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 border-t">
        <Link href={`/request/${request.id}`} className="w-full">
          <Button variant="default" className="w-full gap-2">
            <Eye className="h-4 w-4" />
            {t("viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
