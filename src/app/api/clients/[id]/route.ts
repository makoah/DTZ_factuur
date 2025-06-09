import { NextRequest, NextResponse } from 'next/server'
import { getClientById } from '@/lib/airtable'
import { clientTransformers } from '@/lib/transformers'
import { MockDataService } from '@/lib/mock-data'
import type { ClientApiType } from '@/types/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ClientApiType | { error: string }>> {
  try {
    const client = await getClientById(params.id)
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    // Transform domain object to API format
    const apiClient = clientTransformers.domainToApi(client)
    return NextResponse.json(apiClient)
  } catch (error) {
    console.error('API Error fetching client:', error)
    // Return centralized mock data if Airtable fails
    const mockClient = MockDataService.getClientById(params.id)
    if (!mockClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    return NextResponse.json(mockClient)
  }
}