"use client"
import { mockRequests } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestStatusBadge } from "@/components/request-status-badge"
import { ArrowLeft, User, Phone, MapPin, FileText, Mic, Calendar, Ambulance, AlertCircle } from "lucide-react"
import Link from "next/link"
import { StatusChangeDialog } from "@/components/status-change-dialog"
import { AssignAmbulanceDialog } from "@/components/assign-ambulance-dialog"
import { MapView } from "@/components/map-view"
import { useState } from "react"

const callReasonTranslations: Record<string, string> = {
  Ürəktutması: "reasonHeartAttack",
  Xəsarət: "reasonInjury",
  Yanığ: "reasonBurn",
  "Tənəffüs problemi": "reasonBreathing",
  Digər: "reasonOther",
}

const callerTypeTranslations: Record<string, string> = {
  "Özü üçün": "forSelf",
  "Başqası üçün": "forOther",
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { t } = useLanguage()
  const [request, setRequest] = useState(mockRequests.find((r) => r.id === id))

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sorğu tapılmadı</h2>
            <p className="text-muted-foreground mb-4">Bu ID-li sorğu mövcud deyil</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("back")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleStatusChange = (newStatus: any) => {
    setRequest((prev) => (prev ? { ...prev, status: newStatus, updatedAt: new Date() } : prev))
  }

  const handleAmbulanceAssign = (ambulanceNumber: string) => {
    setRequest((prev) =>
      prev
        ? {
            ...prev,
            ambulanceNumber,
            status: "Ambulans təyin edilib",
            updatedAt: new Date(),
          }
        : prev,
    )
  }

  const fullName = `${request.dispatcherName} ${request.dispatcherSurname} ${request.dispatcherFatherName}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("back")}
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{t("requestDetails")}</h1>
              <p className="text-sm text-muted-foreground">ID: {request.id}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Actions Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Status və Əməliyyatlar</CardTitle>
                  <RequestStatusBadge status={request.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <StatusChangeDialog currentStatus={request.status} onStatusChange={handleStatusChange} />
                  {!request.ambulanceNumber && (
                    <AssignAmbulanceDialog requestId={request.id} onAssign={handleAmbulanceAssign} />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Şəxsi məlumatlar
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("firstName")}</p>
                  <p className="font-semibold">{request.dispatcherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("lastName")}</p>
                  <p className="font-semibold">{request.dispatcherSurname}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("fatherName")}</p>
                  <p className="font-semibold">{request.dispatcherFatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("fin")}</p>
                  <p className="font-semibold font-mono">{request.fin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("phoneNumber")}</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {request.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("callerType")}</p>
                  <p className="font-semibold">{t(callerTypeTranslations[request.callerType] as any)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Call Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Çağırış detalları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{t("callReason")}</p>
                  <p className="text-xl font-bold text-red-700">
                    {t(callReasonTranslations[request.callReason] as any)}
                  </p>
                </div>

                {request.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {t("notes")}
                    </p>
                    <p className="bg-muted p-4 rounded-lg">{request.notes}</p>
                  </div>
                )}

                {request.voiceRecording && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      {t("voiceRecording")}
                    </p>
                    <audio controls className="w-full" src={request.voiceRecording}>
                      Brauzeriniz audio faylları dəstəkləmir
                    </audio>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("location")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-medium">{request.location.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.location.latitude.toFixed(6)}, {request.location.longitude.toFixed(6)}
                  </p>
                </div>
                <MapView location={request.location} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Ambulance Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ambulance className="h-5 w-5" />
                  Ambulans məlumatı
                </CardTitle>
              </CardHeader>
              <CardContent>
                {request.ambulanceNumber ? (
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">{t("ambulanceNumber")}</p>
                    <p className="text-3xl font-bold text-blue-700">{request.ambulanceNumber}</p>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <Ambulance className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                    <p className="text-sm text-yellow-800">{t("notAssigned")}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Tarixçə
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary h-2 w-2 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">{t("createdAt")}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.createdAt).toLocaleString("az-AZ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-muted h-2 w-2 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">{t("updatedAt")}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.updatedAt).toLocaleString("az-AZ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
