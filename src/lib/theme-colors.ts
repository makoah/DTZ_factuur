/**
 * Theme-aware color utilities
 * Centralized solution for consistent contrast across dark/light themes
 */

import { companyInfo } from './company-config'

export interface ThemeColors {
  text: {
    primary: string      // Main text color
    secondary: string    // Secondary text color  
    muted: string       // Muted/subtle text color
    accent: string      // Accent text color (coral)
  }
  background: {
    primary: string     // Main background
    card: string       // Card background
    accent: string     // Accent background
  }
  border: string       // Border color
  interactive: {
    primary: string    // Primary buttons/links
    secondary: string  // Secondary interactive elements
  }
}

/**
 * Get theme-aware colors based on dark mode state
 */
export function getThemeColors(isDark: boolean): ThemeColors {
  if (isDark) {
    return {
      text: {
        primary: '#FFFFFF',                           // White for primary text
        secondary: '#F3F4F6',                        // Light gray for secondary text
        muted: companyInfo.branding.colors.primary,  // Coral for muted text (good contrast)
        accent: companyInfo.branding.colors.primary, // Coral for accents
      },
      background: {
        primary: companyInfo.branding.colors.secondary, // Navy background
        card: '#FFFFFF',                                 // White cards for contrast
        accent: companyInfo.branding.colors.primary + '20', // Semi-transparent coral
      },
      border: companyInfo.branding.colors.primary + '40', // Semi-transparent coral border
      interactive: {
        primary: companyInfo.branding.colors.primary,   // Coral for buttons
        secondary: companyInfo.branding.colors.accent,  // Light coral for secondary
      }
    }
  } else {
    return {
      text: {
        primary: companyInfo.branding.colors.foreground, // Navy for primary text
        secondary: companyInfo.branding.colors.secondary, // Navy for secondary text
        muted: companyInfo.branding.colors.muted,        // Gray for muted text
        accent: companyInfo.branding.colors.primary,     // Coral for accents
      },
      background: {
        primary: companyInfo.branding.colors.background, // Light background
        card: '#FFFFFF',                                  // White cards
        accent: companyInfo.branding.colors.primary + '10', // Very light coral
      },
      border: companyInfo.branding.colors.border,        // Light gray border
      interactive: {
        primary: companyInfo.branding.colors.primary,    // Coral for buttons
        secondary: companyInfo.branding.colors.secondary, // Navy for secondary
      }
    }
  }
}

/**
 * Hook-style function for use in React components with theme context
 */
export function useThemeColors(isDark: boolean): ThemeColors {
  return getThemeColors(isDark)
}