import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock, Calendar, User } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"

// Mock data - will be replaced with Airtable data
const timeEntries = [
  {
    id: "1",
    clientName: "Piet van der Berg",
    date: "2024-03-18",
    hours: 3.0,
    notes: "Begeleiding bij dagbesteding - activiteiten organiseren",
    createdAt: "2024-03-18T10:30:00Z"
  },
  {
    id: "2", 
    clientName: "Maria Jansen",
    date: "2024-03-17",
    hours: 2.5,
    notes: "Ondersteuning administratie PGB declaraties",
    createdAt: "2024-03-17T14:15:00Z"
  },
  {
    id: "3",
    clientName: "Henk Bakker",
    date: "2024-03-16",
    hours: 4.0,
    notes: "Uitgebreide begeleiding bij dagstructuur opbouw",
    createdAt: "2024-03-16T09:00:00Z"
  }
]

export default function TimeEntriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
            Tijd Registratie
          </h1>
          <p style={{ color: companyInfo.branding.colors.muted }}>
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
                      <User className="h-4 w-4" style={{ color: companyInfo.branding.colors.muted }} />
                      <span className="font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                        {entry.clientName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" style={{ color: companyInfo.branding.colors.muted }} />
                      <span className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                        {new Date(entry.date).toLocaleDateString('nl-NL')}
                      </span>
                      <span className="text-sm font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                        {entry.hours} uur
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                      {entry.notes}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: companyInfo.branding.colors.primary }}>
                    {entry.hours}h
                  </div>
                  <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                    {new Date(entry.createdAt).toLocaleDateString('nl-NL')}
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
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
              Geen tijd registraties gevonden
            </h3>
            <p className="mb-4" style={{ color: companyInfo.branding.colors.muted }}>
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