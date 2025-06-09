'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { Plus, Clock, Calendar, User, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"
import { useState, useEffect } from "react"
import { fetchTimeEntries, fetchClients } from "@/lib/api"
import type { TimeEntry, Client } from "@/types"

export default function TimeEntriesPage() {
  const { isDark } = useTheme()
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const [entriesData, clientsData] = await Promise.all([
          fetchTimeEntries(),
          fetchClients()
        ])
        setTimeEntries(entriesData)
        setClients(clientsData)
      } catch (err) {
        setError('Kon tijd registraties niet laden. Controleer uw internetverbinding.')
        console.error('Error loading time entries:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    return client?.name || 'Onbekende cliënt'
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: companyInfo.branding.colors.primary }} />
          <span className="ml-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
            Tijd registraties laden...
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
            Tijd Registratie
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Overzicht van alle geregistreerde uren per cliënt
          </p>
        </div>
        <Link href="/time-entries/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Tijd Registratie
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {timeEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${companyInfo.branding.colors.primary}20` }}>
                    <Clock className="h-6 w-6" style={{ color: companyInfo.branding.colors.primary }} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }} />
                      <span className="font-medium" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
                        {getClientName(entry.clientId)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }} />
                      <span className="text-sm" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                        {new Date(entry.date).toLocaleDateString('nl-NL')}
                      </span>
                      <span className="text-sm font-medium" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
                        {entry.hours} uur
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                      {entry.notes || 'Geen notities'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: companyInfo.branding.colors.primary }}>
                    {entry.hours}h
                  </div>
                  <div className="text-xs" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                    {new Date(entry.createdDate).toLocaleDateString('nl-NL')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {timeEntries.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div 
              className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: companyInfo.branding.colors.background }}
            >
              <Clock className="h-12 w-12" style={{ color: companyInfo.branding.colors.muted }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
              Geen tijd registraties gevonden
            </h3>
            <p className="mb-4" style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
              Registreer uw eerste uren om te beginnen met factureren.
            </p>
            <Link href="/time-entries/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe Tijd Registratie
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}