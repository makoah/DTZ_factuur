'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { Plus, Mail, MapPin, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchClients } from "@/lib/api"
import type { Client } from "@/types"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true)
        setError(null)
        const clientData = await fetchClients()
        setClients(clientData)
      } catch (err) {
        setError('Kon cliënten niet laden. Controleer uw internetverbinding.')
        console.error('Error loading clients:', err)
      } finally {
        setLoading(false)
      }
    }

    loadClients()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: companyInfo.branding.colors.primary }} />
          <span className="ml-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
            Cliënten laden...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
            Cliënten
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Beheer uw PGB begeleiding cliënten
          </p>
        </div>
        <Link href="/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Cliënt
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription>
                    €{client.pgbRate.toFixed(2)}/uur
                  </CardDescription>
                </div>
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
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                  <Mail className="mr-2 h-4 w-4" />
                  {client.email}
                </div>
                <div className="flex items-start text-sm" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                  <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                  <span className="whitespace-pre-line">{client.address}</span>
                </div>
                <div className="pt-3" style={{ borderTop: `1px solid ${companyInfo.branding.colors.border}` }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                      Aangemaakt:
                    </span>
                    <span className="font-medium" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                      {new Date(client.createdDate).toLocaleDateString('nl-NL')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-3">
                  <Link href={`/clients/${client.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Bekijken
                    </Button>
                  </Link>
                  <Link href={`/time-entries/new?client=${client.id}`}>
                    <Button size="sm">
                      Tijd Registreren
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clients.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div 
              className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: companyInfo.branding.colors.background }}
            >
              <Plus className="h-12 w-12" style={{ color: companyInfo.branding.colors.muted }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
              Geen cliënten gevonden
            </h3>
            <p className="mb-4" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
              Voeg uw eerste PGB begeleiding cliënt toe om te beginnen.
            </p>
            <Link href="/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe Cliënt Toevoegen
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}