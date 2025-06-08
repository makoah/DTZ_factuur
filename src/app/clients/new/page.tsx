import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"

export default function NewClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/clients" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
            Nieuwe Cliënt
          </h1>
          <p style={{ color: companyInfo.branding.colors.muted }}>
            Voeg een nieuwe PGB begeleiding cliënt toe
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: companyInfo.branding.colors.secondary }}>
              <User className="mr-2 h-5 w-5" />
              Cliënt Gegevens
            </CardTitle>
            <CardDescription>
              Vul de contactgegevens en tariefinformatie in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Voornaam *
                </label>
                <input 
                  type="text" 
                  placeholder="Jan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: companyInfo.branding.colors.primary }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Achternaam *
                </label>
                <input 
                  type="text" 
                  placeholder="de Vries"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: companyInfo.branding.colors.primary }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                E-mailadres *
              </label>
              <input 
                type="email" 
                placeholder="jan.devries@email.nl"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Telefoonnummer
              </label>
              <input 
                type="tel" 
                placeholder="+31 6 12 34 56 78"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Adres *
              </label>
              <textarea 
                rows={3}
                placeholder="Straatnaam 123&#10;1234 AB Plaatsnaam"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  PGB Uurtarief (€) *
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="38.75"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: companyInfo.branding.colors.primary }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{ focusRingColor: companyInfo.branding.colors.primary }}>
                  <option value="active">Actief</option>
                  <option value="inactive">Inactief</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Notities
              </label>
              <textarea 
                rows={3}
                placeholder="Aanvullende informatie over de cliënt..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Link href="/clients">
                <Button variant="outline">
                  Annuleren
                </Button>
              </Link>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Cliënt Opslaan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}