#!/usr/bin/env node

/**
 * Import Sample Data Script
 * Imports CSV sample data into Airtable tables
 */

const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const record = {};
    headers.forEach((header, index) => {
      let value = values[index] || '';
      value = value.replace(/^"/, '').replace(/"$/, '');
      
      // Convert numeric values
      if (header.includes('Rate') || header.includes('Hours') || header.includes('Amount') || header === 'Year') {
        value = parseFloat(value) || value;
      }
      
      record[header] = value;
    });
    
    return record;
  });
}

async function importClients() {
  console.log('📋 Importing clients...');
  
  const csvPath = path.join(__dirname, 'sample_data', 'clients.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const clients = parseCSV(csvContent);
  
  const records = clients.map(client => ({
    fields: {
      'Name': client.Name,
      'Address': client.Address,
      'Email': client.Email,
      'PGB_Rate': client.PGB_Rate,
      'Status': client.Status,
      'Created_Date': client.Created_Date
    }
  }));
  
  try {
    const createdRecords = await base('Clients').create(records);
    console.log(`✅ Created ${createdRecords.length} clients`);
    return createdRecords;
  } catch (error) {
    console.error('❌ Failed to import clients:', error.message);
    return [];
  }
}

// Company info is now in src/lib/company-config.ts - no longer stored in Airtable

async function importTimeEntries(clientRecords) {
  console.log('⏰ Importing time entries...');
  
  const csvPath = path.join(__dirname, 'sample_data', 'timeentries.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const timeEntries = parseCSV(csvContent);
  
  // Create client name to ID mapping
  const clientMap = {};
  clientRecords.forEach(record => {
    clientMap[record.fields.Name] = record.id;
  });
  
  const records = timeEntries.map(entry => ({
    fields: {
      'Client': [clientMap[entry.Client_Name]],
      'Date': entry.Date,
      'Hours': entry.Hours,
      'Notes': entry.Notes,
      'Created_Date': entry.Created_Date
    }
  })).filter(record => record.fields.Client[0]); // Only include entries with valid client links
  
  try {
    // Import in batches of 10 (Airtable limit)
    const batches = [];
    for (let i = 0; i < records.length; i += 10) {
      batches.push(records.slice(i, i + 10));
    }
    
    let totalCreated = 0;
    for (const batch of batches) {
      const createdRecords = await base('TimeEntries').create(batch);
      totalCreated += createdRecords.length;
    }
    
    console.log(`✅ Created ${totalCreated} time entries`);
    return totalCreated;
  } catch (error) {
    console.error('❌ Failed to import time entries:', error.message);
    return 0;
  }
}

async function importInvoices(clientRecords) {
  console.log('🧾 Importing invoices...');
  
  const csvPath = path.join(__dirname, 'sample_data', 'invoices.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const invoices = parseCSV(csvContent);
  
  // Create client name to ID mapping
  const clientMap = {};
  clientRecords.forEach(record => {
    clientMap[record.fields.Name] = record.id;
  });
  
  const records = invoices.map(invoice => ({
    fields: {
      'Client': [clientMap[invoice.Client_Name]],
      'Month': invoice.Month,
      'Year': invoice.Year,
      'Status': invoice.Status,
      'Created_Date': invoice.Created_Date
    }
  })).filter(record => record.fields.Client[0]); // Only include invoices with valid client links
  
  try {
    const createdRecords = await base('Invoices').create(records);
    console.log(`✅ Created ${createdRecords.length} invoices`);
    return createdRecords;
  } catch (error) {
    console.error('❌ Failed to import invoices:', error.message);
    return [];
  }
}

async function main() {
  console.log('📦 DTZ Invoice Tool - Sample Data Import\n');
  
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error('❌ Environment variables not set. Please configure .env.local first.');
    return;
  }

  try {
    // Import in dependency order
    const clientRecords = await importClients();
    await importTimeEntries(clientRecords);
    await importInvoices(clientRecords);
    
    console.log('\n🎉 Sample data import complete!');
    console.log('📊 Your Airtable base now has realistic test data for development.');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.log('💡 Make sure all tables exist in Airtable with the correct field names.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}