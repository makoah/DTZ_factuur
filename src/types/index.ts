export interface Client {
  id: string;
  name: string;
  address: string;
  email: string;
  pgbRate: number;
  status: 'active' | 'inactive';
  createdDate: Date;
}

export interface TimeEntry {
  id: string;
  clientId: string;
  date: Date;
  hours: number;
  notes?: string;
  createdDate: Date;
}

export interface Invoice {
  id: string;
  clientId: string;
  month: number;
  year: number;
  totalHours: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid';
  pdfUrl?: string;
  createdDate: Date;
}

export interface CompanyInfo {
  id: string;
  companyName: string;
  address: string;
  btwNumber: string;
  bankAccount: string;
  email: string;
  phone: string;
}

export interface InvoiceData {
  invoice: Invoice;
  client: Client;
  company: CompanyInfo;
  timeEntries: TimeEntry[];
}