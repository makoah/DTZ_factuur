'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'auto'
type CardStyle = 'white' | 'gray' | 'navy'

interface ThemeContextType {
  theme: Theme
  cardStyle: CardStyle
  setTheme: (theme: Theme) => void
  setCardStyle: (style: CardStyle) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark') // Default to dark as requested
  const [cardStyle, setCardStyle] = useState<CardStyle>('white') // Default to white cards
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('dtz-theme') as Theme
    const savedCardStyle = localStorage.getItem('dtz-card-style') as CardStyle
    
    if (savedTheme) setTheme(savedTheme)
    if (savedCardStyle) setCardStyle(savedCardStyle)
  }, [])

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('dtz-theme', theme)
    localStorage.setItem('dtz-card-style', cardStyle)

    // Determine if dark mode should be active
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDark(mediaQuery.matches)
      
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      setIsDark(theme === 'dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      cardStyle, 
      setTheme,
      setCardStyle,
      isDark
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}