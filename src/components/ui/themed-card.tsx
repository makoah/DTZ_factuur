import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { companyInfo } from "@/lib/company-config"

const ThemedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDark, cardStyle } = useTheme()
  
  const getCardStyles = () => {
    if (!isDark) {
      // Light theme - always white cards
      return {
        backgroundColor: 'white',
        border: `1px solid ${companyInfo.branding.colors.border}`,
        color: companyInfo.branding.colors.foreground
      }
    }
    
    // Dark theme - different card styles based on setting
    switch (cardStyle) {
      case 'white':
        return {
          backgroundColor: 'white',
          border: `2px solid ${companyInfo.branding.colors.primary}`,
          color: companyInfo.branding.colors.secondary
        }
      case 'gray':
        return {
          backgroundColor: '#F8F9FA',
          border: `1px solid ${companyInfo.branding.colors.primary}`,
          color: companyInfo.branding.colors.secondary
        }
      case 'navy':
        return {
          backgroundColor: '#2A4D6C',
          border: `1px solid ${companyInfo.branding.colors.primary}`,
          color: 'white'
        }
      default:
        return {
          backgroundColor: 'white',
          border: `2px solid ${companyInfo.branding.colors.primary}`,
          color: companyInfo.branding.colors.secondary
        }
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg text-card-foreground shadow-sm",
        className
      )}
      style={getCardStyles()}
      {...props}
    />
  )
})
ThemedCard.displayName = "ThemedCard"

const ThemedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
ThemedCardHeader.displayName = "ThemedCardHeader"

const ThemedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { isDark, cardStyle } = useTheme()
  
  const getTitleColor = () => {
    if (!isDark) return companyInfo.branding.colors.secondary
    
    switch (cardStyle) {
      case 'navy':
        return 'white'
      default:
        return companyInfo.branding.colors.secondary
    }
  }

  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      style={{ color: getTitleColor() }}
      {...props}
    />
  )
})
ThemedCardTitle.displayName = "ThemedCardTitle"

const ThemedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { isDark, cardStyle } = useTheme()
  
  const getDescriptionColor = () => {
    if (!isDark) return companyInfo.branding.colors.muted
    
    switch (cardStyle) {
      case 'navy':
        return companyInfo.branding.colors.primary
      default:
        return companyInfo.branding.colors.muted
    }
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm", className)}
      style={{ color: getDescriptionColor() }}
      {...props}
    />
  )
})
ThemedCardDescription.displayName = "ThemedCardDescription"

const ThemedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
ThemedCardContent.displayName = "ThemedCardContent"

const ThemedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
ThemedCardFooter.displayName = "ThemedCardFooter"

export { 
  ThemedCard, 
  ThemedCardHeader, 
  ThemedCardFooter, 
  ThemedCardTitle, 
  ThemedCardDescription, 
  ThemedCardContent 
}