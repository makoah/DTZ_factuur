import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Calculator } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"

export default function NewInvoicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/invoices" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
            Nieuwe Factuur
          </h1>
          <p style={{ color: companyInfo.branding.colors.muted }}>
            Genereer een factuur op basis van geregistreerde uren
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Factuur Details
            </CardTitle>
            <CardDescription>
              Selecteer cliënt en periode voor de factuur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Cliënt
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ focusRingColor: companyInfo.branding.colors.primary }}>
                <option value="">Selecteer een cliënt</option>
                <option value="piet">Piet van der Berg (€38.75/uur)</option>
                <option value="maria">Maria Jansen (€42.00/uur)</option>
                <option value="henk">Henk Bakker (€36.00/uur)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Maand
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{ focusRingColor: companyInfo.branding.colors.primary }}>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3" selected>Maart</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Augustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Jaar
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{ focusRingColor: companyInfo.branding.colors.primary }}>
                  <option value="2024" selected>2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Factuurdatum
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button className="w-full" variant="outline">
              <Calculator className="mr-2 h-4 w-4" />
              Bereken Uren & Bedrag
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Factuur Preview
            </CardTitle>
            <CardDescription>
              Overzicht van de te genereren factuur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Factuurnummer:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>DTZ-2024-004</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Cliënt:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>Selecteer eerst een cliënt</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Periode:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>Maart 2024</span>
              </div>
              <hr style={{ borderColor: companyInfo.branding.colors.border }} />
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Totaal uren:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>-- uur</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Uurtarief:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>€ --</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>Subtotaal:</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>€ --</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: companyInfo.branding.colors.muted }}>BTW (21%):</span>
                <span style={{ color: companyInfo.branding.colors.foreground }}>€ --</span>
              </div>
              <hr style={{ borderColor: companyInfo.branding.colors.border }} />
              <div className="flex justify-between text-lg font-bold">
                <span style={{ color: companyInfo.branding.colors.secondary }}>Totaal:</span>
                <span style={{ color: companyInfo.branding.colors.primary }}>€ --</span>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <Link href="/invoices" className="flex-1">
                <Button variant="outline" className="w-full">
                  Annuleren
                </Button>
              </Link>
              <Button className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Factuur Aanmaken
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}