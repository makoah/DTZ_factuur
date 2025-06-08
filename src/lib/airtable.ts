import Airtable from 'airtable';
import type { Client, TimeEntry, Invoice, CompanyInfo } from '@/types';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export const tables = {
  clients: base('Clients'),
  timeEntries: base('TimeEntries'),
  invoices: base('Invoices'),
  companyInfo: base('CompanyInfo'),
};

export async function getClients(): Promise<Client[]> {
  const records = await tables.clients.select({
    view: 'Grid view',
    filterByFormula: '{Status} = "Active"'
  }).all();

  return records.map(record => ({
    id: record.id,
    name: record.get('Name') as string,
    address: record.get('Address') as string,
    email: record.get('Email') as string,
    pgbRate: record.get('PGB_Rate') as number,
    status: record.get('Status') as 'active' | 'inactive',
    createdDate: new Date(record.get('Created_Date') as string),
  }));
}

export async function createTimeEntry(entry: Omit<TimeEntry, 'id' | 'createdDate'>): Promise<TimeEntry> {
  const record = await tables.timeEntries.create({
    'Client': [entry.clientId],
    'Date': entry.date.toISOString().split('T')[0],
    'Hours': entry.hours,
    'Notes': entry.notes || '',
    'Created_Date': new Date().toISOString(),
  });

  return {
    id: record.id,
    clientId: entry.clientId,
    date: entry.date,
    hours: entry.hours,
    notes: entry.notes,
    createdDate: new Date(),
  };
}

export async function getTimeEntriesByClientAndMonth(
  clientId: string, 
  month: number, 
  year: number
): Promise<TimeEntry[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  const records = await tables.timeEntries.select({
    filterByFormula: `AND(
      {Client} = "${clientId}",
      IS_AFTER({Date}, "${startDate.toISOString().split('T')[0]}"),
      IS_BEFORE({Date}, "${endDate.toISOString().split('T')[0]}")
    )`
  }).all();

  return records.map(record => ({
    id: record.id,
    clientId: record.get('Client')?.[0] as string,
    date: new Date(record.get('Date') as string),
    hours: record.get('Hours') as number,
    notes: record.get('Notes') as string,
    createdDate: new Date(record.get('Created_Date') as string),
  }));
}