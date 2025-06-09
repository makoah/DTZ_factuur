/**
 * Domain Types
 * These types define the structure of data used within React components
 * All dates are Date objects for proper manipulation and display
 */

export interface Client {
  id: string
  name: string
  email: string
  address: string
  pgbRate: number
  status: 'active' | 'inactive'
  createdDate: Date
}

export interface TimeEntry {
  id: string
  clientId: string
  date: Date
  hours: number
  notes?: string
  createdDate: Date
}

export interface Invoice {
  id: string
  clientId: string
  month: number
  year: number
  totalHours: number
  totalAmount: number
  status: 'draft' | 'sent' | 'paid'
  pdfUrl?: string
  createdDate: Date
}

// CompanyInfo is now in src/lib/company-config.ts as a static config

export interface InvoiceData {
  invoice: Invoice;
  client: Client;
  timeEntries: TimeEntry[];
}