'use client'

import Image from 'next/image'
import Link from 'next/link'
import { companyInfo } from '@/lib/company-config'
import { useTheme } from '@/lib/theme-context'

export function Header() {
  const { isDark } = useTheme()
  
  const getHeaderStyles = () => {
    if (isDark) {
      return {
        backgroundColor: companyInfo.branding.colors.secondary,
        borderColor: companyInfo.branding.colors.primary + '40'
      }
    }
    return {
      backgroundColor: 'white',
      borderColor: companyInfo.branding.colors.border
    }
  }
  
  const getTitleColor = () => {
    return isDark ? 'white' : companyInfo.branding.colors.secondary
  }
  
  const getSubtitleColor = () => {
    return isDark ? companyInfo.branding.colors.primary : companyInfo.branding.colors.muted
  }
  
  const getLinkColor = () => {
    return isDark ? 'white' : companyInfo.branding.colors.foreground
  }

  return (
    <header className="border-b shadow-sm transition-colors duration-300" style={getHeaderStyles()}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={companyInfo.branding.logo.main}
              alt={companyInfo.companyName}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold transition-colors duration-300" style={{ color: getTitleColor() }}>
                {companyInfo.companyName}
              </h1>
              <p className="text-sm transition-colors duration-300" style={{ color: getSubtitleColor() }}>
                Factuur Beheer
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/clients" 
              className="font-medium transition-colors hover:opacity-80 duration-300"
              style={{ color: getLinkColor() }}
            >
              Cliënten
            </Link>
            <Link 
              href="/time-entries" 
              className="font-medium transition-colors hover:opacity-80 duration-300"
              style={{ color: getLinkColor() }}
            >
              Tijd Registratie
            </Link>
            <Link 
              href="/invoices" 
              className="font-medium transition-colors hover:opacity-80 duration-300"
              style={{ color: getLinkColor() }}
            >
              Facturen
            </Link>
            <Link 
              href="/reports" 
              className="font-medium transition-colors hover:opacity-80 duration-300"
              style={{ color: getLinkColor() }}
            >
              Rapporten
            </Link>
            <Link 
              href="/settings" 
              className="font-medium transition-colors hover:opacity-80 duration-300"
              style={{ color: getLinkColor() }}
            >
              Instellingen
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <span className="text-sm transition-colors duration-300" style={{ color: getSubtitleColor() }}>
              {companyInfo.address.city}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}