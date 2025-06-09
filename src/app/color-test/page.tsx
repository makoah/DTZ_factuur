'use client'

import { ThemedCard as Card, ThemedCardContent as CardContent, ThemedCardDescription as CardDescription, ThemedCardHeader as CardHeader, ThemedCardTitle as CardTitle } from "@/components/ui/themed-card"
import { Button } from "@/components/ui/button"
import { Users, Clock, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"
import { companyInfo } from "@/lib/company-config"
import { useTheme } from "@/lib/theme-context"

export default function ColorTestPage() {
  const { isDark } = useTheme()
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: companyInfo.branding.colors.secondary }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            DTZ Color Scheme Comparison
          </h1>
          <p className="text-gray-300 mb-8">
            Compare light background vs dark background versions
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* CURRENT VERSION - Light Background */}
          <div className="rounded-lg border-2 border-gray-300 overflow-hidden">
            <div className="bg-gray-100 p-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">CURRENT: Light Background</h2>
              <p className="text-gray-600">Cards with coral accents on light background</p>
            </div>
            
            <div 
              className="p-6" 
              style={{ backgroundColor: companyInfo.branding.colors.background }}
            >
              {/* Header simulation */}
              <div className="border-b bg-white shadow-sm mb-6 p-4 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: companyInfo.branding.colors.primary }}></div>
                  <div>
                    <h3 className="font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
                      Direct TopZorg (DTZ)
                    </h3>
                    <p className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                      Factuur Beheer
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      Actieve Cliënten
                      <Users className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>3</div>
                    <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>+1 sinds vorig</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      Deze Maand
                      <Clock className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>24.5</div>
                    <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>uren</p>
                  </CardContent>
                </Card>
              </div>

              <Button style={{ backgroundColor: companyInfo.branding.colors.primary }} className="text-white">
                <Clock className="mr-2 h-4 w-4" />
                Tijd Registreren
              </Button>
            </div>
          </div>

          {/* NEW VERSION - Dark Background */}
          <div className="rounded-lg border-2 border-yellow-400 overflow-hidden">
            <div className="bg-yellow-100 p-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">NEW: Dark Background</h2>
              <p className="text-gray-600">Light coral cards on dark navy background</p>
            </div>
            
            <div 
              className="p-6" 
              style={{ backgroundColor: companyInfo.branding.colors.secondary }}
            >
              {/* Header simulation */}
              <div 
                className="border-b shadow-sm mb-6 p-4 rounded"
                style={{ 
                  backgroundColor: companyInfo.branding.colors.secondary,
                  borderColor: companyInfo.branding.colors.primary + '40'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: companyInfo.branding.colors.primary }}></div>
                  <div>
                    <h3 className="font-bold text-white">
                      Direct TopZorg (DTZ)
                    </h3>
                    <p className="text-sm" style={{ color: companyInfo.branding.colors.primary }}>
                      Factuur Beheer
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards with better contrast options */}
              <div className="space-y-6">
                
                {/* Option 1: White cards with coral borders */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Option 1: White Cards with Coral Borders</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card style={{ backgroundColor: 'white', border: `2px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between" style={{ color: companyInfo.branding.colors.secondary }}>
                          Actieve Cliënten
                          <Users className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>3</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>+1 sinds vorig</p>
                      </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: 'white', border: `2px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between" style={{ color: companyInfo.branding.colors.secondary }}>
                          Deze Maand
                          <Clock className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>24.5</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>uren</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Option 2: Light gray cards */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Option 2: Light Gray Cards</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card style={{ backgroundColor: '#F8F9FA', border: `1px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between" style={{ color: companyInfo.branding.colors.secondary }}>
                          Actieve Cliënten
                          <Users className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>3</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>+1 sinds vorig</p>
                      </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: '#F8F9FA', border: `1px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between" style={{ color: companyInfo.branding.colors.secondary }}>
                          Deze Maand
                          <Clock className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>24.5</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.muted }}>uren</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Option 3: Slightly lighter navy cards */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Option 3: Lighter Navy Cards</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card style={{ backgroundColor: '#2A4D6C', border: `1px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between text-white">
                          Actieve Cliënten
                          <Users className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.primary }}>+1 sinds vorig</p>
                      </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: '#2A4D6C', border: `1px solid ${companyInfo.branding.colors.primary}` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between text-white">
                          Deze Maand
                          <Clock className="h-4 w-4" style={{ color: companyInfo.branding.colors.primary }} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">24.5</div>
                        <p className="text-xs" style={{ color: companyInfo.branding.colors.primary }}>uren</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Button style={{ backgroundColor: companyInfo.branding.colors.primary }} className="text-white">
                <Clock className="mr-2 h-4 w-4" />
                Tijd Registreren
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}