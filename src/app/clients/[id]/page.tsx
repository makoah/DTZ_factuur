'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Mail, MapPin, Phone, Clock, FileText } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"
import { useThemeColors } from "@/lib/theme-colors"
import { useState, useEffect } from "react"
import { fetchClient } from "@/lib/api"
import type { Client } from "@/types"
import { Loader2, AlertCircle } from "lucide-react"

// Mock data fallback
const mockClientData = {
  id: "1",
  name: "Piet van der Berg",
  email: "piet.vandenberg@hotmail.com",
  address: "Zorgstraat 789\n9012 EF Rotterdam",
  pgbRate: 38.75,
  status: "active" as const,
  createdDate: "2024-01-15T00:00:00.000Z",
  notes: "Reguliere begeleiding bij dagbesteding en sociale activiteiten"
}

const recentTimeEntries = [
  { date: "2024-03-18", hours: 3.0, notes: "Begeleiding bij dagbesteding" },
  { date: "2024-03-15", hours: 2.5, notes: "Ondersteuning administratie" },
  { date: "2024-03-12", hours: 4.0, notes: "Begeleiding ziekenhuis bezoek" },
]

const recentInvoices = [
  { invoiceNumber: "DTZ-2024-001", month: "Maart", year: 2024, amount: 561.88, status: "draft" },
  { invoiceNumber: "DTZ-2023-012", month: "Februari", year: 2024, amount: 639.00, status: "paid" },
]

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const { isDark } = useTheme()
  const colors = useThemeColors(isDark)
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadClient() {
      try {
        setLoading(true)
        setError(null)
        const clientData = await fetchClient(params.id)
        setClient(clientData)
      } catch (err) {
        setError('Kon cliënt gegevens niet laden')
        console.error('Error loading client:', err)
        // Use mock data as fallback with proper Date conversion
        setClient({
          ...mockClientData,
          createdDate: new Date(mockClientData.createdDate)
        })
      } finally {
        setLoading(false)
      }
    }

    loadClient()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: companyInfo.branding.colors.primary }} />
          <span className="ml-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
            Cliënt gegevens laden...
          </span>
        </div>
      </div>
    )
  }

  if (error && !client) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" style={{ color: companyInfo.branding.colors.primary }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
              Fout bij laden
            </h3>
            <p className="mb-4" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
              {error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Opnieuw proberen
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!client) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/clients" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar Cliënten
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text.primary }}>
              {client.name}
            </h1>
            <p style={{ color: colors.text.muted }}>
              Cliënt ID: {params.id}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link href={`/time-entries/new?client=${params.id}`}>
            <Button>
              <Clock className="mr-2 h-4 w-4" />
              Tijd Registreren
            </Button>
          </Link>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Bewerken
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Cliënt Informatie
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ 
                    backgroundColor: client.status === 'active' 
                      ? companyInfo.branding.colors.primary 
                      : '#6B7280'
                  }}
                >
                  {client.status === 'active' ? 'Actief' : 'Inactief'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" style={{ color: colors.text.accent }} />
                <span className="text-sm" style={{ color: colors.text.primary }}>
                  {client.email}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" style={{ color: colors.text.accent }} />
                <span className="text-sm" style={{ color: colors.text.primary }}>
                  N/A
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5" style={{ color: colors.text.accent }} />
                <span className="text-sm whitespace-pre-line" style={{ color: colors.text.primary }}>
                  {client.address}
                </span>
              </div>

              <div className="pt-4" style={{ borderTop: `1px solid ${colors.border}` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: colors.text.muted }}>
                    PGB Uurtarief:
                  </span>
                  <span className="font-bold" style={{ color: colors.text.accent }}>
                    €{client.pgbRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: colors.text.muted }}>
                    Cliënt sinds:
                  </span>
                  <span className="text-sm" style={{ color: colors.text.primary }}>
                    {new Date(client.createdDate).toLocaleDateString('nl-NL')}
                  </span>
                </div>
              </div>

              {mockClientData.notes && (
                <div className="pt-4" style={{ borderTop: `1px solid ${colors.border}` }}>
                  <h4 className="text-sm font-medium mb-2" style={{ color: colors.text.primary }}>
                    Notities:
                  </h4>
                  <p className="text-sm" style={{ color: colors.text.muted }}>
                    {mockClientData.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Recent Time Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Recente Tijd Registraties
                  </span>
                  <Link href={`/time-entries/new?client=${params.id}`}>
                    <Button size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Nieuwe Registratie
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTimeEntries.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" 
                         style={{ backgroundColor: colors.background.accent }}>
                      <div>
                        <div className="font-medium text-sm" style={{ color: colors.text.primary }}>
                          {new Date(entry.date).toLocaleDateString('nl-NL')}
                        </div>
                        <div className="text-sm" style={{ color: colors.text.muted }}>
                          {entry.notes}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: colors.text.accent }}>
                          {entry.hours}h
                        </div>
                        <div className="text-xs" style={{ color: colors.text.muted }}>
                          €{(entry.hours * client.pgbRate).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Factuur Geschiedenis
                  </span>
                  <Link href={`/invoices/new?client=${params.id}`}>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Nieuwe Factuur
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInvoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" 
                         style={{ backgroundColor: colors.background.accent }}>
                      <div>
                        <div className="font-medium text-sm" style={{ color: colors.text.primary }}>
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-sm" style={{ color: colors.text.muted }}>
                          {invoice.month} {invoice.year}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: colors.text.accent }}>
                          €{invoice.amount.toFixed(2)}
                        </div>
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ 
                            backgroundColor: invoice.status === 'paid' 
                              ? '#10B981' 
                              : invoice.status === 'sent'
                                ? companyInfo.branding.colors.primary
                                : '#6B7280'
                          }}
                        >
                          {invoice.status === 'paid' ? 'Betaald' : 
                           invoice.status === 'sent' ? 'Verzonden' : 'Concept'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}