/**
 * Mock Data Service
 * Centralized source of fallback data when Airtable is unavailable
 * All data is in API format (ISO strings for dates)
 */

import type { ClientApiType, TimeEntryApiType, InvoiceApiType } from '@/types/api'

export class MockDataService {
  /**
   * Mock Clients Data
   */
  static getClients(): ClientApiType[] {
    return [
      {
        id: "recPbtsjdy9TCLdCk",
        name: "Henk Bakker",
        email: "henk.bakker@gmail.com",
        address: "Bakkerstraat 456\n1234 CD Amsterdam",
        pgbRate: 36.00,
        status: "active",
        createdDate: "2024-02-01T00:00:00.000Z"
      },
      {
        id: "recWdJoLNzNLK8N0s",
        name: "Maria Jansen",
        email: "maria.jansen@hotmail.com",
        address: "Jansenweg 789\n5678 EF Utrecht",
        pgbRate: 42.00,
        status: "active",
        createdDate: "2024-01-20T00:00:00.000Z"
      },
      {
        id: "rec3rdClientId123",
        name: "Piet van der Berg",
        email: "piet.vandenberg@hotmail.com",
        address: "Zorgstraat 789\n9012 EF Rotterdam",
        pgbRate: 38.75,
        status: "active",
        createdDate: "2024-01-15T00:00:00.000Z"
      }
    ]
  }

  /**
   * Get single client by ID
   */
  static getClientById(id: string): ClientApiType | null {
    const clients = this.getClients()
    return clients.find(client => client.id === id) || null
  }

  /**
   * Mock Time Entries Data
   */
  static getTimeEntries(): TimeEntryApiType[] {
    return [
      {
        id: "mock1",
        clientId: "recPbtsjdy9TCLdCk", // Henk Bakker
        date: "2024-03-18T00:00:00.000Z",
        hours: 3.0,
        notes: "Begeleiding bij dagbesteding - activiteiten organiseren",
        createdDate: "2024-03-18T10:30:00.000Z"
      },
      {
        id: "mock2",
        clientId: "recWdJoLNzNLK8N0s", // Maria Jansen
        date: "2024-03-17T00:00:00.000Z",
        hours: 2.5,
        notes: "Ondersteuning administratie PGB declaraties",
        createdDate: "2024-03-17T14:15:00.000Z"
      },
      {
        id: "mock3",
        clientId: "rec3rdClientId123", // Piet van der Berg
        date: "2024-03-16T00:00:00.000Z",
        hours: 4.0,
        notes: "Begeleiding bij ziekenhuis bezoek",
        createdDate: "2024-03-16T16:00:00.000Z"
      }
    ]
  }

  /**
   * Get time entries for specific client
   */
  static getTimeEntriesByClient(clientId: string): TimeEntryApiType[] {
    const entries = this.getTimeEntries()
    return entries.filter(entry => entry.clientId === clientId)
  }

  /**
   * Mock Invoices Data
   */
  static getInvoices(): InvoiceApiType[] {
    return [
      {
        id: "inv1",
        clientId: "rec3rdClientId123", // Piet van der Berg
        month: 3,
        year: 2024,
        totalHours: 14.5,
        totalAmount: 561.88,
        status: "draft",
        createdDate: "2024-03-31T00:00:00.000Z"
      },
      {
        id: "inv2",
        clientId: "recWdJoLNzNLK8N0s", // Maria Jansen
        month: 3,
        year: 2024,
        totalHours: 13.0,
        totalAmount: 546.00,
        status: "sent",
        createdDate: "2024-03-31T00:00:00.000Z"
      },
      {
        id: "inv3",
        clientId: "recPbtsjdy9TCLdCk", // Henk Bakker
        month: 2,
        year: 2024,
        totalHours: 9.0,
        totalAmount: 324.00,
        status: "paid",
        createdDate: "2024-02-29T00:00:00.000Z"
      }
    ]
  }

  /**
   * Generate mock ID for new records
   */
  static generateMockId(): string {
    return `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Create new mock client (for testing create functionality)
   */
  static createMockClient(clientData: Omit<ClientApiType, 'id' | 'createdDate'>): ClientApiType {
    return {
      ...clientData,
      id: this.generateMockId(),
      createdDate: new Date().toISOString()
    }
  }

  /**
   * Create new mock time entry (for testing create functionality)
   */
  static createMockTimeEntry(entryData: Omit<TimeEntryApiType, 'id' | 'createdDate'>): TimeEntryApiType {
    return {
      ...entryData,
      id: this.generateMockId(),
      createdDate: new Date().toISOString()
    }
  }
}