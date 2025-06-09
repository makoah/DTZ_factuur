import { NextRequest, NextResponse } from 'next/server'
import { getClients, createClient } from '@/lib/airtable'
import { clientTransformers } from '@/lib/transformers'
import { MockDataService } from '@/lib/mock-data'
import type { ClientApiType } from '@/types/api'

export async function GET(): Promise<NextResponse<ClientApiType[]>> {
  try {
    const clients = await getClients()
    // Transform domain objects to API format
    const apiClients = clients.map(clientTransformers.domainToApi)
    return NextResponse.json(apiClients)
  } catch (error) {
    console.error('API Error fetching clients:', error)
    // Return centralized mock data if Airtable fails
    const mockClients = MockDataService.getClients()
    return NextResponse.json(mockClients)
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ClientApiType | { error: string }>> {
  try {
    const body = await request.json()
    const client = await createClient(body)
    // Transform domain object to API format
    const apiClient = clientTransformers.domainToApi(client)
    return NextResponse.json(apiClient)
  } catch (error) {
    console.error('API Error creating client:', error)
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
}