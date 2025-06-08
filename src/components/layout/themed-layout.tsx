'use client'

import { useTheme } from "@/lib/theme-context"
import { companyInfo } from "@/lib/company-config"

interface ThemedLayoutProps {
  children: React.ReactNode
}

export function ThemedLayout({ children }: ThemedLayoutProps) {
  const { isDark } = useTheme()
  
  const getBackgroundColor = () => {
    return isDark 
      ? companyInfo.branding.colors.secondary 
      : companyInfo.branding.colors.background
  }
  
  const getTextColor = () => {
    return isDark ? 'white' : companyInfo.branding.colors.foreground
  }

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ 
        backgroundColor: getBackgroundColor(),
        color: getTextColor()
      }}
    >
      {children}
    </div>
  )
}