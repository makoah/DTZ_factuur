/**
 * Data Transformation Utilities
 * Centralized functions to convert between API types and Domain types
 */

import type { Client, TimeEntry, Invoice } from '@/types'
import type { ClientApiType, TimeEntryApiType, InvoiceApiType } from '@/types/api'

/**
 * Client Transformers
 */
export const clientTransformers = {
  /**
   * Convert API response to domain object
   */
  apiToDomain: (apiClient: ClientApiType): Client => ({
    ...apiClient,
    createdDate: new Date(apiClient.createdDate)
  }),

  /**
   * Convert domain object to API format
   */
  domainToApi: (client: Client): ClientApiType => ({
    ...client,
    createdDate: client.createdDate.toISOString()
  }),

  /**
   * Convert array of API responses to domain objects
   */
  apiArrayToDomain: (apiClients: ClientApiType[]): Client[] =>
    apiClients.map(clientTransformers.apiToDomain)
}

/**
 * TimeEntry Transformers
 */
export const timeEntryTransformers = {
  /**
   * Convert API response to domain object
   */
  apiToDomain: (apiEntry: TimeEntryApiType): TimeEntry => ({
    ...apiEntry,
    date: new Date(apiEntry.date),
    createdDate: new Date(apiEntry.createdDate)
  }),

  /**
   * Convert domain object to API format
   */
  domainToApi: (entry: TimeEntry): TimeEntryApiType => ({
    ...entry,
    date: entry.date.toISOString(),
    createdDate: entry.createdDate.toISOString()
  }),

  /**
   * Convert array of API responses to domain objects
   */
  apiArrayToDomain: (apiEntries: TimeEntryApiType[]): TimeEntry[] =>
    apiEntries.map(timeEntryTransformers.apiToDomain)
}

/**
 * Invoice Transformers
 */
export const invoiceTransformers = {
  /**
   * Convert API response to domain object
   */
  apiToDomain: (apiInvoice: InvoiceApiType): Invoice => ({
    ...apiInvoice,
    createdDate: new Date(apiInvoice.createdDate)
  }),

  /**
   * Convert domain object to API format
   */
  domainToApi: (invoice: Invoice): InvoiceApiType => ({
    ...invoice,
    createdDate: invoice.createdDate.toISOString()
  }),

  /**
   * Convert array of API responses to domain objects
   */
  apiArrayToDomain: (apiInvoices: InvoiceApiType[]): Invoice[] =>
    apiInvoices.map(invoiceTransformers.apiToDomain)
}

/**
 * Utility function to safely parse date strings
 */
export const safeParseDate = (dateString: string): Date => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`)
    return new Date() // Fallback to current date
  }
  return date
}

/**
 * Utility function to validate API response structure
 */
export const validateApiResponse = <T>(
  response: unknown,
  requiredFields: string[]
): response is T => {
  if (!response || typeof response !== 'object') {
    return false
  }

  const obj = response as Record<string, unknown>
  return requiredFields.every(field => field in obj)
}

/**
 * Type guards for API responses
 */
export const isClientApiType = (obj: unknown): obj is ClientApiType => {
  return validateApiResponse<ClientApiType>(obj, [
    'id', 'name', 'email', 'address', 'pgbRate', 'status', 'createdDate'
  ])
}

export const isTimeEntryApiType = (obj: unknown): obj is TimeEntryApiType => {
  return validateApiResponse<TimeEntryApiType>(obj, [
    'id', 'clientId', 'date', 'hours', 'createdDate'
  ])
}