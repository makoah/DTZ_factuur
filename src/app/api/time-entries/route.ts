import { NextRequest, NextResponse } from 'next/server'
import { getTimeEntries, createTimeEntry } from '@/lib/airtable'
import { timeEntryTransformers } from '@/lib/transformers'
import { MockDataService } from '@/lib/mock-data'
import type { TimeEntryApiType } from '@/types/api'

export async function GET(): Promise<NextResponse<TimeEntryApiType[]>> {
  try {
    const timeEntries = await getTimeEntries()
    // Transform domain objects to API format
    const apiTimeEntries = timeEntries.map(timeEntryTransformers.domainToApi)
    return NextResponse.json(apiTimeEntries)
  } catch (error) {
    console.error('API Error fetching time entries:', error)
    // Return centralized mock data if Airtable permissions fail
    const mockTimeEntries = MockDataService.getTimeEntries()
    return NextResponse.json(mockTimeEntries)
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<TimeEntryApiType | { error: string }>> {
  try {
    const body = await request.json()
    const timeEntry = await createTimeEntry({
      clientId: body.clientId,
      date: new Date(body.date),
      hours: body.hours,
      notes: body.notes
    })
    // Transform domain object to API format
    const apiTimeEntry = timeEntryTransformers.domainToApi(timeEntry)
    return NextResponse.json(apiTimeEntry)
  } catch (error) {
    console.error('API Error creating time entry:', error)
    return NextResponse.json(
      { error: 'Failed to create time entry' },
      { status: 500 }
    )
  }
}