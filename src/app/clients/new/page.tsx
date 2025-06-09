'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, User, Loader2, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"
import { useState, FormEvent } from "react"
import { createClientAPI } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function NewClientPage() {
  const { isDark } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    pgbRate: '',
    status: 'active' as 'active' | 'inactive',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'Voornaam is verplicht'
    if (!formData.lastName.trim()) return 'Achternaam is verplicht'
    if (!formData.email.trim()) return 'E-mailadres is verplicht'
    if (!formData.address.trim()) return 'Adres is verplicht'
    if (!formData.pgbRate || parseFloat(formData.pgbRate) <= 0) return 'Geldig PGB uurtarief is verplicht'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Geldig e-mailadres is verplicht'
    
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    try {
      await createClientAPI({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        address: formData.address,
        pgbRate: parseFloat(formData.pgbRate),
        status: formData.status
      })

      setSuccess(true)
      
      // Redirect to clients list after 2 seconds
      setTimeout(() => {
        router.push('/clients')
      }, 2000)

    } catch (err) {
      setError('Kon cliënt niet aanmaken. Probeer het opnieuw.')
      console.error('Error creating client:', err)
    } finally {
      setLoading(false)
    }
  }
  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <Check className="h-12 w-12 mx-auto mb-4" style={{ color: companyInfo.branding.colors.primary }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                Cliënt succesvol aangemaakt!
              </h3>
              <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                U wordt automatisch doorgestuurd naar de cliëntenlijst...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
            Nieuwe Cliënt
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Voeg een nieuwe PGB begeleiding cliënt toe
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Cliënt Gegevens
            </CardTitle>
            <CardDescription>
              Vul de contactgegevens en tariefinformatie in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 rounded-md" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" style={{ color: '#DC2626' }} />
                  <span style={{ color: '#DC2626' }}>{error}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                    Voornaam *
                  </label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Jan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB'
                    } as React.CSSProperties}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                    Achternaam *
                  </label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="de Vries"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB'
                    } as React.CSSProperties}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                  E-mailadres *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jan.devries@email.nl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: error ? '#DC2626' : '#D1D5DB',
                    '--tw-ring-color': companyInfo.branding.colors.primary 
                  }}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                  Adres *
                </label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Straatnaam 123&#10;1234 AB Plaatsnaam"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: error ? '#DC2626' : '#D1D5DB',
                    '--tw-ring-color': companyInfo.branding.colors.primary 
                  }}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                    PGB Uurtarief (€) *
                  </label>
                  <input 
                    type="number" 
                    name="pgbRate"
                    value={formData.pgbRate}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="38.75"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB'
                    } as React.CSSProperties}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                    Status
                  </label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB'
                    } as React.CSSProperties}
                    disabled={loading}
                  >
                    <option value="active">Actief</option>
                    <option value="inactive">Inactief</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link href="/clients">
                  <Button variant="outline" disabled={loading}>
                    Annuleren
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opslaan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Cliënt Opslaan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}