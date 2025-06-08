'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Sun, Moon, Monitor, Save, Check } from "lucide-react"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"
import { useState } from "react"

export default function SettingsPage() {
  const { theme, cardStyle, setTheme, setCardStyle, isDark } = useTheme()
  const [showSaved, setShowSaved] = useState(false)

  const handleSaveSettings = () => {
    // Settings are already saved via localStorage in the context
    // Show confirmation feedback
    setShowSaved(true)
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowSaved(false)
    }, 3000)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: companyInfo.branding.colors.secondary }}>
          Instellingen
        </h1>
        <p style={{ color: companyInfo.branding.colors.muted }}>
          Pas uw DTZ factuur tool aan naar uw voorkeuren
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: companyInfo.branding.colors.secondary }}>
              <Palette className="mr-2 h-5 w-5" />
              Thema Instellingen
            </CardTitle>
            <CardDescription>
              Kies tussen licht en donker thema voor de beste gebruikservaring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Theme Options */}
            <div>
              <h4 className="text-sm font-medium mb-4" style={{ color: companyInfo.branding.colors.foreground }}>
                Kleurenschema
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Light Theme */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    theme === 'light' 
                      ? 'border-' + companyInfo.branding.colors.primary.replace('#', '') + ' bg-' + companyInfo.branding.colors.primary.replace('#', '') + '10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setTheme('light')}
                  style={theme === 'light' ? { 
                    borderColor: companyInfo.branding.colors.primary,
                    backgroundColor: companyInfo.branding.colors.primary + '10'
                  } : {}}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                      <Sun className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                    </div>
                    <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Licht Thema
                    </span>
                    {theme === 'light' && (
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                        Actief
                      </span>
                    )}
                  </div>
                  
                  {/* Light Theme Preview */}
                  <div className="border rounded p-3" style={{ backgroundColor: companyInfo.branding.colors.background }}>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                          Actieve Cliënten
                        </span>
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: companyInfo.branding.colors.primary }}></div>
                      </div>
                      <div className="text-lg font-bold" style={{ color: companyInfo.branding.colors.secondary }}>3</div>
                    </div>
                    <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                      Klassiek, professioneel uiterlijk
                    </div>
                  </div>
                </div>

                {/* Dark Theme */}
                <div 
                  className="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                  onClick={() => setTheme('dark')}
                  style={theme === 'dark' ? { 
                    borderColor: companyInfo.branding.colors.primary,
                    backgroundColor: companyInfo.branding.colors.primary + '10' 
                  } : { borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center"
                         style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                      <Moon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Donker Thema
                    </span>
                    {theme === 'dark' && (
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                        Actief
                      </span>
                    )}
                  </div>
                  
                  {/* Dark Theme Preview */}
                  <div className="border rounded p-3" style={{ backgroundColor: companyInfo.branding.colors.secondary }}>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                          Actieve Cliënten
                        </span>
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: companyInfo.branding.colors.primary }}></div>
                      </div>
                      <div className="text-lg font-bold" style={{ color: companyInfo.branding.colors.secondary }}>3</div>
                    </div>
                    <div className="text-xs text-white">
                      Modern, sophisticated uiterlijk
                    </div>
                  </div>
                </div>

                {/* Auto Theme */}
                <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                      <Monitor className="h-4 w-4" style={{ color: companyInfo.branding.colors.muted }} />
                    </div>
                    <span className="font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Automatisch
                    </span>
                  </div>
                  
                  {/* Auto Theme Preview */}
                  <div className="border rounded p-3 bg-gradient-to-r from-white to-gray-800">
                    <div className="bg-white p-2 rounded shadow-sm mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium" style={{ color: companyInfo.branding.colors.secondary }}>
                          Automatisch
                        </span>
                        <div className="w-3 h-3 rounded bg-gradient-to-r" 
                             style={{ 
                               backgroundImage: `linear-gradient(to right, ${companyInfo.branding.colors.primary}, ${companyInfo.branding.colors.secondary})`
                             }}></div>
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                      Volgt systeemvoorkeur
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Style Options for Dark Theme */}
            <div>
              <h4 className="text-sm font-medium mb-4" style={{ color: companyInfo.branding.colors.foreground }}>
                Kaart Stijl (Donker Thema)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* White Cards */}
                <div 
                  className="border-2 rounded-lg p-3 cursor-pointer transition-colors"
                  onClick={() => setCardStyle('white')}
                  style={cardStyle === 'white' ? { 
                    borderColor: companyInfo.branding.colors.primary,
                    backgroundColor: companyInfo.branding.colors.primary + '10' 
                  } : { borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-white border rounded" style={{ borderColor: companyInfo.branding.colors.primary }}></div>
                    <span className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Wit met Coral Rand
                    </span>
                    {cardStyle === 'white' && (
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                        Actief
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                    Hoogste contrast, beste leesbaarheid
                  </div>
                </div>

                {/* Light Gray Cards */}
                <div 
                  className="border-2 rounded-lg p-3 cursor-pointer transition-colors"
                  onClick={() => setCardStyle('gray')}
                  style={cardStyle === 'gray' ? { 
                    borderColor: companyInfo.branding.colors.primary,
                    backgroundColor: companyInfo.branding.colors.primary + '10' 
                  } : { borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Licht Grijs
                    </span>
                    {cardStyle === 'gray' && (
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                        Actief
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                    Subtiel, zachte contrast
                  </div>
                </div>

                {/* Lighter Navy Cards */}
                <div 
                  className="border-2 rounded-lg p-3 cursor-pointer transition-colors"
                  onClick={() => setCardStyle('navy')}
                  style={cardStyle === 'navy' ? { 
                    borderColor: companyInfo.branding.colors.primary,
                    backgroundColor: companyInfo.branding.colors.primary + '10' 
                  } : { borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#2A4D6C' }}></div>
                    <span className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                      Licht Navy
                    </span>
                    {cardStyle === 'navy' && (
                      <span className="text-xs px-2 py-1 rounded text-white"
                            style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                        Actief
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                    Donker, modern uiterlijk
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: companyInfo.branding.colors.secondary }}>
              Algemene Instellingen
            </CardTitle>
            <CardDescription>
              Andere voorkeuren voor uw DTZ factuur tool
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                  Automatische Sync
                </h4>
                <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                  Synchroniseer automatisch met Airtable elke 5 minuten
                </p>
              </div>
              <div className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                   style={{ backgroundColor: companyInfo.branding.colors.primary }}>
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium" style={{ color: companyInfo.branding.colors.foreground }}>
                  E-mail Notificaties
                </h4>
                <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>
                  Ontvang notificaties voor nieuwe facturen en betalingen
                </p>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end items-center space-x-4">
          {showSaved && (
            <div className="flex items-center space-x-2 text-sm font-medium transition-all duration-300"
                 style={{ color: companyInfo.branding.colors.primary }}>
              <Check className="h-4 w-4" />
              <span>Instellingen opgeslagen!</span>
            </div>
          )}
          <Button 
            onClick={handleSaveSettings}
            className="transition-all duration-200 transform hover:scale-105"
            style={showSaved ? {
              backgroundColor: companyInfo.branding.colors.primary,
              borderColor: companyInfo.branding.colors.primary,
              color: 'white'
            } : {}}
          >
            {showSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Opgeslagen
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Instellingen Opslaan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}