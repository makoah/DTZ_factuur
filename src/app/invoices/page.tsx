'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, Euro, Eye, Download } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"

// Mock data - will be replaced with Airtable data
const invoices = [
  {
    id: "1",
    invoiceNumber: "DTZ-2024-001",
    clientName: "Piet van der Berg",
    month: "Maart",
    year: 2024,
    totalHours: 14.5,
    totalAmount: 561.88,
    status: "draft",
    dueDate: "2024-04-15",
    createdAt: "2024-03-31"
  },
  {
    id: "2",
    invoiceNumber: "DTZ-2024-002", 
    clientName: "Maria Jansen",
    month: "Maart",
    year: 2024,
    totalHours: 13.0,
    totalAmount: 546.00,
    status: "sent",
    dueDate: "2024-04-15",
    createdAt: "2024-03-31"
  },
  {
    id: "3",
    invoiceNumber: "DTZ-2024-003",
    clientName: "Henk Bakker", 
    month: "Februari",
    year: 2024,
    totalHours: 9.0,
    totalAmount: 324.00,
    status: "paid",
    dueDate: "2024-03-15",
    createdAt: "2024-02-29"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return '#6B7280'
    case 'sent': return companyInfo.branding.colors.primary
    case 'paid': return '#10B981'
    default: return '#6B7280'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'draft': return 'Concept'
    case 'sent': return 'Verzonden'
    case 'paid': return 'Betaald'
    default: return status
  }
}

export default function InvoicesPage() {
  const { isDark } = useTheme()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
            Facturen
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Beheer en verstuur uw PGB facturen
          </p>
        </div>
        <Link href="/invoices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Factuur
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${companyInfo.branding.colors.primary}20` }}>
                    <FileText className="h-6 w-6" style={{ color: companyInfo.branding.colors.primary }} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-medium text-lg" style={{ color: companyInfo.branding.colors.secondary }}>
                        {invoice.invoiceNumber}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(invoice.status) }}
                      >
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                        {invoice.clientName}
                      </span>
                      <span className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                        {invoice.month} {invoice.year}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Vervaldatum: {new Date(invoice.dueDate).toLocaleDateString('nl-NL')}</span>
                      </div>
                      <span>{invoice.totalHours} uur</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
                    <Euro className="h-5 w-5 mr-1" />
                    {invoice.totalAmount.toFixed(2)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Bekijken
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {invoices.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
              Geen facturen gevonden
            </h3>
            <p className="mb-4" style={{ color: companyInfo.branding.colors.muted }}>
              Maak uw eerste factuur aan op basis van geregistreerde uren.
            </p>
            <Link href="/invoices/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe Factuur
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}