"use client"

import { useLanguage } from "@/lib/language-context"
import type { RequestStatus } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface RequestStatusBadgeProps {
  status: RequestStatus
}

const statusStyles: Record<RequestStatus, string> = {
  Gözləmədədir: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Ambulans təyin edilib": "bg-blue-100 text-blue-800 border-blue-300",
  "Ambulans yaxınlaşıb": "bg-purple-100 text-purple-800 border-purple-300",
  "Sorğu yekunlaşıb": "bg-green-100 text-green-800 border-green-300",
  "Sorğu ləğv edilib": "bg-red-100 text-red-800 border-red-300",
}

const statusTranslations: Record<RequestStatus, string> = {
  Gözləmədədir: "statusWaiting",
  "Ambulans təyin edilib": "statusAssigned",
  "Ambulans yaxınlaşıb": "statusApproaching",
  "Sorğu yekunlaşıb": "statusCompleted",
  "Sorğu ləğv edilib": "statusCancelled",
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const { t } = useLanguage()
  const translationKey = statusTranslations[status]

  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {t(translationKey as any)}
    </Badge>
  )
}
