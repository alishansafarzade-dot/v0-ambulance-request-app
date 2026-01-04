"use client"

import { mockRequests } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { RequestList } from "@/components/request-list"

export default function RequestsPage() {
  const { t } = useLanguage()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("emergencyRequests")}</h1>
        <p className="text-muted-foreground">Bütün təcili tibbi yardım sorğularını idarə edin</p>
      </div>

      <RequestList requests={mockRequests} />
    </div>
  )
}
