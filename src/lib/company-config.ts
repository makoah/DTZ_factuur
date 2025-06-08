export const companyInfo = {
  companyName: 'Direct TopZorg (DTZ)',
  address: {
    street: 'Topaaslaan 18',
    postalCode: '3162 TD',
    city: 'Rhoon',
    country: 'Nederland'
  },
  contact: {
    email: 'info@directtopzorg.nl',
    phone: '+31 10 123 4567',
    website: 'www.directtopzorg.nl'
  },
  business: {
    btwNumber: 'NL123456789B01',
    kvkNumber: '12345678',
    bankAccount: 'NL91 ABNA 0417 1643 00',
    bankName: 'ABN AMRO'
  },
  invoice: {
    defaultPaymentTerms: 14, // days
    vatRate: 0.21, // 21% Dutch VAT
    currency: 'EUR',
    locale: 'nl-NL'
  },
  branding: {
    logo: {
      main: '/DTZlogo2.png',
      original: '/Original Logo.png',
      transparent: '/Transparent Logo.png',
      grayscale: '/Grayscale Transparent.png',
      symbol: '/Original Logo Symbol.png'
    },
    colors: {
      primary: '#FF7F7F', // DTZ Coral/Salmon - from logo
      secondary: '#1A3D5C', // DTZ Navy Blue - from logo background
      accent: '#FF9999', // Lighter coral for accents
      background: '#F8FAFB', // Light background
      foreground: '#1A3D5C', // Text color (navy)
      muted: '#6B7280', // Muted text
      border: '#E5E7EB' // Border color
    }
  }
} as const;

export type CompanyInfo = typeof companyInfo;