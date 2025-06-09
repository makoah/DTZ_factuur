import type { Client, TimeEntry } from '@/types'
import type { ClientApiType, TimeEntryApiType, CreateClientRequest, CreateTimeEntryRequest } from '@/types/api'
import { clientTransformers, timeEntryTransformers } from '@/lib/transformers'

const API_BASE = '/api'

export async function fetchClients(): Promise<Client[]> {
  const response = await fetch(`${API_BASE}/clients`)
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  const data: ClientApiType[] = await response.json()
  // Transform API responses to domain objects
  return clientTransformers.apiArrayToDomain(data)
}

export async function fetchClient(id: string): Promise<Client> {
  const response = await fetch(`${API_BASE}/clients/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch client')
  }
  const data: ClientApiType = await response.json()
  // Transform API response to domain object
  return clientTransformers.apiToDomain(data)
}

export async function createClientAPI(client: CreateClientRequest): Promise<Client> {
  const response = await fetch(`${API_BASE}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create client')
  }
  
  const data: ClientApiType = await response.json()
  // Transform API response to domain object
  return clientTransformers.apiToDomain(data)
}

export async function fetchTimeEntries(): Promise<TimeEntry[]> {
  const response = await fetch(`${API_BASE}/time-entries`)
  if (!response.ok) {
    throw new Error('Failed to fetch time entries')
  }
  const data: TimeEntryApiType[] = await response.json()
  // Transform API responses to domain objects
  return timeEntryTransformers.apiArrayToDomain(data)
}

export async function createTimeEntryAPI(timeEntry: CreateTimeEntryRequest): Promise<TimeEntry> {
  const response = await fetch(`${API_BASE}/time-entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create time entry')
  }
  
  const data: TimeEntryApiType = await response.json()
  // Transform API response to domain object
  return timeEntryTransformers.apiToDomain(data)
}