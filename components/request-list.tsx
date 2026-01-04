"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import type { AmbulanceRequest, RequestStatus } from "@/lib/types"
import { RequestCard } from "./request-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface RequestListProps {
  requests: AmbulanceRequest[]
}

export function RequestList({ requests }: RequestListProps) {
  const { t } = useLanguage()
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all")

  const filteredRequests = requests.filter((request) => {
    if (statusFilter === "all") return true
    return request.status === statusFilter
  })

  const sortedRequests = [...filteredRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RequestStatus | "all")}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allRequests")}</SelectItem>
            <SelectItem value="Gözləmədədir">{t("statusWaiting")}</SelectItem>
            <SelectItem value="Ambulans təyin edilib">{t("statusAssigned")}</SelectItem>
            <SelectItem value="Ambulans yaxınlaşıb">{t("statusApproaching")}</SelectItem>
            <SelectItem value="Sorğu yekunlaşıb">{t("statusCompleted")}</SelectItem>
            <SelectItem value="Sorğu ləğv edilib">{t("statusCancelled")}</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {sortedRequests.length}{" "}
          {statusFilter === "all" ? t("allRequests").toLowerCase() : t("filterByStatus").toLowerCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

      {sortedRequests.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">{t("allRequests")} yoxdur</p>
        </div>
      )}
    </div>
  )
}
