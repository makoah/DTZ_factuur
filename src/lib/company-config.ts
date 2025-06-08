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
      original: '/Original Logo.png',
      transparent: '/Transparent Logo.png',
      grayscale: '/Grayscale Transparent.png',
      symbol: '/Original Logo Symbol.png'
    },
    colors: {
      primary: '#004B87', // DTZ Blue (estimated)
      secondary: '#00A651', // DTZ Green (estimated)
      accent: '#FF6B35' // DTZ Orange (estimated)
    }
  }
} as const;

export type CompanyInfo = typeof companyInfo;