'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Download, Calendar, Euro, Clock } from "lucide-react"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"

// Mock data - will be replaced with real calculations
const reportData = {
  thisMonth: {
    totalHours: 24.5,
    totalRevenue: 945.75,
    clientsServed: 3,
    averageHourlyRate: 38.58
  },
  lastMonth: {
    totalHours: 22.0,
    totalRevenue: 847.50,
    clientsServed: 3,
    averageHourlyRate: 38.52
  },
  yearToDate: {
    totalHours: 156.5,
    totalRevenue: 6234.50,
    clientsServed: 3,
    averageHourlyRate: 39.84
  }
}

const monthlyData = [
  { month: 'Jan', hours: 18.5, revenue: 731.25 },
  { month: 'Feb', hours: 22.0, revenue: 847.50 },
  { month: 'Mrt', hours: 24.5, revenue: 945.75 },
]

export default function ReportsPage() {
  const { isDark } = useTheme()
  const growth = ((reportData.thisMonth.totalRevenue - reportData.lastMonth.totalRevenue) / reportData.lastMonth.totalRevenue * 100).toFixed(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
            Rapporten
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Overzicht van uren, omzet en prestaties
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Rapport
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deze Maand - Uren</CardTitle>
            <Clock className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
              {reportData.thisMonth.totalHours}
            </div>
            <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
              +{(reportData.thisMonth.totalHours - reportData.lastMonth.totalHours).toFixed(1)} vs vorige maand
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deze Maand - Omzet</CardTitle>
            <Euro className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
              €{reportData.thisMonth.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs" style={{ color: growth.startsWith('-') ? '#EF4444' : '#10B981' }}>
              {growth.startsWith('-') ? '' : '+'}{growth}% vs vorige maand
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actieve Cliënten</CardTitle>
            <BarChart3 className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
              {reportData.thisMonth.clientsServed}
            </div>
            <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
              Ongewijzigd vs vorige maand
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gem. Uurtarief</CardTitle>
            <TrendingUp className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
              €{reportData.thisMonth.averageHourlyRate.toFixed(2)}
            </div>
            <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
              +€0.06 vs vorige maand
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Maandelijkse Prestaties
            </CardTitle>
            <CardDescription>
              Uren en omzet per maand (2024)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" 
                         style={{ backgroundColor: companyInfo.branding.colors.primary }}></div>
                    <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      {month.month}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                      €{month.revenue.toFixed(2)}
                    </div>
                    <div className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                      {month.hours} uur
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Year to Date */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Jaar Totaal (2024)
            </CardTitle>
            <CardDescription>
              Cumulatieve prestaties dit jaar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span style={{ color: companyInfo.branding.colors.muted }}>Totaal Uren:</span>
                <span className="text-xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
                  {reportData.yearToDate.totalHours} uur
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: companyInfo.branding.colors.muted }}>Totaal Omzet:</span>
                <span className="text-xl font-bold" style={{ color: companyInfo.branding.colors.primary }}>
                  €{reportData.yearToDate.totalRevenue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: companyInfo.branding.colors.muted }}>Gemiddeld per Maand:</span>
                <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                  €{(reportData.yearToDate.totalRevenue / 3).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: companyInfo.branding.colors.muted }}>Gemiddeld Uurtarief:</span>
                <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                  €{reportData.yearToDate.averageHourlyRate.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Actions */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
            Rapport Acties
          </CardTitle>
          <CardDescription>
            Export en analyseer uw data verder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Maandrapport Export
            </Button>
            <Button variant="outline" className="w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              Jaaroverzicht Export
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Alle Data Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}