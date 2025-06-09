/**
 * API Response Types
 * These types define the exact structure of data returned by API routes
 * All dates are ISO strings for consistent JSON serialization
 */

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface ClientApiType {
  id: string
  name: string
  email: string
  address: string
  pgbRate: number
  status: 'active' | 'inactive'
  createdDate: string // ISO string format
}

export interface TimeEntryApiType {
  id: string
  clientId: string
  date: string // ISO string format
  hours: number
  notes?: string
  createdDate: string // ISO string format
}

export interface InvoiceApiType {
  id: string
  clientId: string
  month: number
  year: number
  totalHours: number
  totalAmount: number
  status: 'draft' | 'sent' | 'paid'
  pdfUrl?: string
  createdDate: string // ISO string format
}

// Request types for creating/updating resources
export interface CreateClientRequest {
  name: string
  email: string
  address: string
  pgbRate: number
  status: 'active' | 'inactive'
}

export interface CreateTimeEntryRequest {
  clientId: string
  date: string // ISO string format
  hours: number
  notes?: string
}