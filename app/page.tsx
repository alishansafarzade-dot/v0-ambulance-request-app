"use client"

import { useLanguage } from "@/lib/language-context"
import { mockRequests, mockHospitals, mockUsers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Clock } from "lucide-react"

export default function DashboardPage() {
  const { t } = useLanguage()

  // 1. Requests by Hospital
  const hospitalData = mockHospitals.map((h) => ({
    name: h.name,
    count: mockRequests.filter((r) => r.hospitalId === h.id).length,
  }))

  // 2. Requests by Reason
  const reasonCounts = mockRequests.reduce(
    (acc, r) => {
      acc[r.callReason] = (acc[r.callReason] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const reasonData = Object.entries(reasonCounts).map(([name, value]) => ({ name, value }))

  // 3. Requests by Region (Baku)
  const regionCounts = mockRequests.reduce(
    (acc, r) => {
      const reg = r.region || "Digər"
      acc[reg] = (acc[reg] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const regionData = Object.entries(regionCounts).map(([name, count]) => ({ name, count }))

  // 4. Status Distribution
  const statusCounts = mockRequests.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  // 5. Operator Performance (Average response time)
  const operators = mockUsers.filter((u) => u.role === "Operator")
  const operatorData = operators.map((op) => {
    const opRequests = mockRequests.filter((r) => r.operatorId === op.id)
    const avgTime =
      opRequests.length > 0 ? opRequests.reduce((sum, r) => sum + (r.responseTime || 0), 0) / opRequests.length : 0
    return {
      name: `${op.firstName} ${op.lastName}`,
      avgTime: Math.round(avgTime),
    }
  })

  const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

  const recentRequests = [...mockRequests].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("dashboard")}</h1>
        <p className="text-muted-foreground">Sistemin ümumi göstəriciləri və hesabatları</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hospital Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("requestsByHospital")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hospitalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reason Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("requestsByReason")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasonData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {reasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Region Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("requestsByRegion")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Operator Performance */}
        <Card>
          <CardHeader>
            <CardTitle>{t("operatorPerformance")}</CardTitle>
            <CardDescription>{t("avgResponseTime")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operatorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgTime" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Son Sorğular</CardTitle>
                <CardDescription>Sistemə daxil olan son 5 müraciət</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Ad Soyad</th>
                    <th className="px-6 py-3">Səbəb</th>
                    <th className="px-6 py-3">Bölge</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Vaxt</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req) => (
                    <tr key={req.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {req.dispatcherName} {req.dispatcherSurname}
                      </td>
                      <td className="px-6 py-4">{req.callReason}</td>
                      <td className="px-6 py-4">{req.region}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            req.status === "Gözləmədədir"
                              ? "bg-yellow-100 text-yellow-800"
                              : req.status === "Sorğu yekunlaşıb"
                                ? "bg-green-100 text-green-800"
                                : req.status === "Sorğu ləğv edilib"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{req.createdAt.toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
