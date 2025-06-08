import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"

export default function NewTimeEntryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/time-entries" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
            Nieuwe Tijd Registratie
          </h1>
          <p style={{ color: companyInfo.branding.colors.muted }}>
            Registreer uren voor een cliënt
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Tijd Details
            </CardTitle>
            <CardDescription>
              Vul de gegevens in voor de tijd registratie
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
                <option value="piet">Piet van der Berg</option>
                <option value="maria">Maria Jansen</option>
                <option value="henk">Henk Bakker</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Datum
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: companyInfo.branding.colors.primary }}
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                  Aantal Uren
                </label>
                <input 
                  type="number" 
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="2.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: companyInfo.branding.colors.primary }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: companyInfo.branding.colors.foreground }}>
                Notities / Activiteiten
              </label>
              <textarea 
                rows={4}
                placeholder="Beschrijf de begeleiding activiteiten..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: companyInfo.branding.colors.primary }}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Link href="/time-entries">
                <Button variant="outline">
                  Annuleren
                </Button>
              </Link>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Opslaan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}