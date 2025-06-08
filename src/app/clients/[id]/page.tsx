import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Mail, MapPin, Phone, Clock, Euro, FileText } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"

// This would normally come from Airtable based on the ID
const mockClient = {
  id: "1",
  name: "Piet van der Berg",
  email: "piet.vandenberg@hotmail.com",
  phone: "+31 6 12 34 56 78",
  address: "Zorgstraat 789\n9012 EF Rotterdam",
  pgbRate: 38.75,
  status: "active",
  createdDate: "2024-01-15",
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
              {mockClient.name}
            </h1>
            <p style={{ color: companyInfo.branding.colors.muted }}>
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
              <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
                Cliënt Informatie
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ 
                    backgroundColor: mockClient.status === 'active' 
                      ? companyInfo.branding.colors.primary 
                      : '#6B7280'
                  }}
                >
                  {mockClient.status === 'active' ? 'Actief' : 'Inactief'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" style={{ color: companyInfo.branding.colors.muted }} />
                <span className="text-sm" style={{ color: companyInfo.branding.colors.foreground }}>
                  {mockClient.email}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" style={{ color: companyInfo.branding.colors.muted }} />
                <span className="text-sm" style={{ color: companyInfo.branding.colors.foreground }}>
                  {mockClient.phone}
                </span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5" style={{ color: companyInfo.branding.colors.muted }} />
                <span className="text-sm whitespace-pre-line" style={{ color: companyInfo.branding.colors.foreground }}>
                  {mockClient.address}
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                    PGB Uurtarief:
                  </span>
                  <span className="font-bold" style={{ color: companyInfo.branding.colors.primary }}>
                    €{mockClient.pgbRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                    Cliënt sinds:
                  </span>
                  <span className="text-sm" style={{ color: companyInfo.branding.colors.foreground }}>
                    {new Date(mockClient.createdDate).toLocaleDateString('nl-NL')}
                  </span>
                </div>
              </div>

              {mockClient.notes && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                    Notities:
                  </h4>
                  <p className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                    {mockClient.notes}
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
                  <span style={{ color: companyInfo.branding.colors.secondary }}>
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
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm" style={{ color: companyInfo.branding.colors.foreground }}>
                          {new Date(entry.date).toLocaleDateString('nl-NL')}
                        </div>
                        <div className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                          {entry.notes}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: companyInfo.branding.colors.primary }}>
                          {entry.hours}h
                        </div>
                        <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                          €{(entry.hours * mockClient.pgbRate).toFixed(2)}
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
                  <span style={{ color: companyInfo.branding.colors.secondary }}>
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
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm" style={{ color: companyInfo.branding.colors.foreground }}>
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                          {invoice.month} {invoice.year}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: companyInfo.branding.colors.primary }}>
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