import Airtable from 'airtable';
import type { Client, TimeEntry } from '@/types';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export const tables = {
  clients: base('Clients'),
  timeEntries: base('TimeEntries'),
  invoices: base('Invoices'),
};

export async function getClients(): Promise<Client[]> {
  try {
    const records = await tables.clients.select({
      view: 'Grid view',
      sort: [{field: 'Created_Date', direction: 'desc'}]
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
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Failed to fetch clients from Airtable');
  }
}

export async function createClient(client: Omit<Client, 'id' | 'createdDate'>): Promise<Client> {
  try {
    const record = await tables.clients.create({
      'Name': client.name,
      'Address': client.address,
      'Email': client.email,
      'PGB_Rate': client.pgbRate,
      'Status': client.status,
      'Created_Date': new Date().toISOString(),
    });

    return {
      id: record.id,
      name: record.get('Name') as string,
      address: record.get('Address') as string,
      email: record.get('Email') as string,
      pgbRate: record.get('PGB_Rate') as number,
      status: record.get('Status') as 'active' | 'inactive',
      createdDate: new Date(record.get('Created_Date') as string),
    };
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Failed to create client in Airtable');
  }
}

export async function updateClient(id: string, updates: Partial<Omit<Client, 'id' | 'createdDate'>>): Promise<Client> {
  try {
    const updateFields: Record<string, string | number> = {};
    if (updates.name) updateFields['Name'] = updates.name;
    if (updates.address) updateFields['Address'] = updates.address;
    if (updates.email) updateFields['Email'] = updates.email;
    if (updates.pgbRate) updateFields['PGB_Rate'] = updates.pgbRate;
    if (updates.status) updateFields['Status'] = updates.status;

    const record = await tables.clients.update(id, updateFields);

    return {
      id: record.id,
      name: record.get('Name') as string,
      address: record.get('Address') as string,
      email: record.get('Email') as string,
      pgbRate: record.get('PGB_Rate') as number,
      status: record.get('Status') as 'active' | 'inactive',
      createdDate: new Date(record.get('Created_Date') as string),
    };
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error('Failed to update client in Airtable');
  }
}

export async function deleteClient(id: string): Promise<void> {
  try {
    await tables.clients.destroy(id);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw new Error('Failed to delete client from Airtable');
  }
}

export async function getClientById(id: string): Promise<Client | null> {
  try {
    const record = await tables.clients.find(id);
    
    return {
      id: record.id,
      name: record.get('Name') as string,
      address: record.get('Address') as string,
      email: record.get('Email') as string,
      pgbRate: record.get('PGB_Rate') as number,
      status: record.get('Status') as 'active' | 'inactive',
      createdDate: new Date(record.get('Created_Date') as string),
    };
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    return null;
  }
}

export async function createTimeEntry(entry: Omit<TimeEntry, 'id' | 'createdDate'>): Promise<TimeEntry> {
  try {
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
  } catch (error) {
    console.error('Error creating time entry:', error);
    throw new Error('Failed to create time entry in Airtable');
  }
}

export async function getTimeEntries(): Promise<TimeEntry[]> {
  try {
    const records = await tables.timeEntries.select({
      view: 'Grid view',
      sort: [{field: 'Date', direction: 'desc'}]
    }).all();

    return records.map(record => {
      const clientField = record.get('Client')
      const clientId = Array.isArray(clientField) ? clientField[0] : clientField as string
      
      return {
        id: record.id,
        clientId: clientId || '',
        date: new Date(record.get('Date') as string),
        hours: record.get('Hours') as number,
        notes: record.get('Notes') as string || '',
        createdDate: new Date(record.get('Created_Date') as string),
      }
    });
  } catch (error) {
    console.error('Error fetching time entries:', error);
    throw new Error('Failed to fetch time entries from Airtable');
  }
}

export async function updateTimeEntry(id: string, updates: Partial<Omit<TimeEntry, 'id' | 'createdDate'>>): Promise<TimeEntry> {
  try {
    const updateFields: Record<string, string | number | string[]> = {};
    if (updates.clientId) updateFields['Client'] = [updates.clientId];
    if (updates.date) updateFields['Date'] = updates.date.toISOString().split('T')[0];
    if (updates.hours !== undefined) updateFields['Hours'] = updates.hours;
    if (updates.notes !== undefined) updateFields['Notes'] = updates.notes;

    const record = await tables.timeEntries.update(id, updateFields);

    const clientField = record.get('Client')
    const clientId = Array.isArray(clientField) ? clientField[0] : clientField as string
    
    return {
      id: record.id,
      clientId: clientId || '',
      date: new Date(record.get('Date') as string),
      hours: record.get('Hours') as number,
      notes: record.get('Notes') as string || '',
      createdDate: new Date(record.get('Created_Date') as string),
    };
  } catch (error) {
    console.error('Error updating time entry:', error);
    throw new Error('Failed to update time entry in Airtable');
  }
}

export async function deleteTimeEntry(id: string): Promise<void> {
  try {
    await tables.timeEntries.destroy(id);
  } catch (error) {
    console.error('Error deleting time entry:', error);
    throw new Error('Failed to delete time entry from Airtable');
  }
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

  return records.map(record => {
    const clientField = record.get('Client') as string | string[] | undefined
    const clientId = Array.isArray(clientField) ? clientField[0] : clientField
    
    return {
      id: record.id,
      clientId: clientId || '',
      date: new Date(record.get('Date') as string),
      hours: record.get('Hours') as number,
      notes: record.get('Notes') as string || '',
      createdDate: new Date(record.get('Created_Date') as string),
    }
  });
}