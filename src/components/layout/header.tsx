import Image from 'next/image'
import Link from 'next/link'
import { companyInfo } from '@/lib/company-config'

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm" style={{ borderColor: companyInfo.branding.colors.border }}>
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
              <h1 className="text-xl font-bold" style={{ color: companyInfo.branding.colors.secondary }}>
                {companyInfo.companyName}
              </h1>
              <p className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
                Factuur Beheer
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/clients" 
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: companyInfo.branding.colors.foreground }}
            >
              Cliënten
            </Link>
            <Link 
              href="/time-entries" 
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: companyInfo.branding.colors.foreground }}
            >
              Tijd Registratie
            </Link>
            <Link 
              href="/invoices" 
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: companyInfo.branding.colors.foreground }}
            >
              Facturen
            </Link>
            <Link 
              href="/reports" 
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: companyInfo.branding.colors.foreground }}
            >
              Rapporten
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <span className="text-sm" style={{ color: companyInfo.branding.colors.muted }}>
              {companyInfo.address.city}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}