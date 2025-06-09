'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, Check, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"
import { useState, useEffect, FormEvent } from "react"
import { createTimeEntryAPI, fetchClients } from "@/lib/api"
import { useRouter, useSearchParams } from "next/navigation"
import type { Client } from "@/types"

export default function NewTimeEntryPage() {
  const { isDark } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get('client')
  
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingClients, setLoadingClients] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    clientId: preselectedClientId || '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    notes: ''
  })

  useEffect(() => {
    async function loadClients() {
      try {
        setLoadingClients(true)
        const clientData = await fetchClients()
        setClients(clientData)
      } catch (err) {
        setError('Kon cliënten niet laden.')
        console.error('Error loading clients:', err)
      } finally {
        setLoadingClients(false)
      }
    }

    loadClients()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.clientId) return 'Selecteer een cliënt'
    if (!formData.date) return 'Datum is verplicht'
    if (!formData.hours || parseFloat(formData.hours) <= 0) return 'Geldig aantal uren is verplicht'
    if (parseFloat(formData.hours) > 24) return 'Maximum 24 uren per dag'
    
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(23, 59, 59, 999) // End of today
    
    if (selectedDate > today) return 'Datum kan niet in de toekomst liggen'
    
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
      await createTimeEntryAPI({
        clientId: formData.clientId,
        date: formData.date,
        hours: parseFloat(formData.hours),
        notes: formData.notes
      })

      setSuccess(true)
      
      // Redirect to time entries list after 2 seconds
      setTimeout(() => {
        router.push('/time-entries')
      }, 2000)

    } catch (err) {
      setError('Kon tijd registratie niet aanmaken. Probeer het opnieuw.')
      console.error('Error creating time entry:', err)
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
                Tijd registratie succesvol opgeslagen!
              </h3>
              <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                U wordt automatisch doorgestuurd naar de overzichtspagina...
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
        <Link href="/time-entries" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.secondary }}>
            Nieuwe Tijd Registratie
          </h1>
          <p style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
            Registreer uren voor een cliënt
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Tijd Details
            </CardTitle>
            <CardDescription>
              Vul de gegevens in voor de tijd registratie
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
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                  Cliënt *
                </label>
                {loadingClients ? (
                  <div className="flex items-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" style={{ color: companyInfo.branding.colors.primary }} />
                    <span style={{ color: isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted }}>
                      Cliënten laden...
                    </span>
                  </div>
                ) : (
                  <select 
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB',
                      '--tw-ring-color': companyInfo.branding.colors.primary 
                    }}
                    required
                    disabled={loading}
                  >
                    <option value="">Selecteer een cliënt</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} - €{client.pgbRate.toFixed(2)}/uur
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                    Datum *
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
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
                    Aantal Uren *
                  </label>
                  <input 
                    type="number" 
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    step="0.25"
                    min="0"
                    max="24"
                    placeholder="2.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: error ? '#DC2626' : '#D1D5DB',
                      '--tw-ring-color': companyInfo.branding.colors.primary 
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? 'white' : companyInfo.branding.colors.foreground }}>
                  Notities / Activiteiten
                </label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Beschrijf de begeleiding activiteiten..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: error ? '#DC2626' : '#D1D5DB',
                    '--tw-ring-color': companyInfo.branding.colors.primary 
                  }}
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link href="/time-entries">
                  <Button variant="outline" disabled={loading}>
                    Annuleren
                  </Button>
                </Link>
                <Button type="submit" disabled={loading || loadingClients}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opslaan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Opslaan
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