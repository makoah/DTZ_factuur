#!/usr/bin/env node

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

async function main() {
  console.log('🔍 Testing Airtable data access...\n');

  try {
    // Test reading clients
    const clients = await base('Clients').select({ maxRecords: 3 }).firstPage();
    console.log(`✅ Clients: Found ${clients.length} records`);
    clients.forEach(client => {
      console.log(`  - ${client.fields.Name}: €${client.fields.PGB_Rate}/hour`);
    });

    // Test reading invoices
    const invoices = await base('Invoices').select({ maxRecords: 3 }).firstPage();
    console.log(`\n✅ Invoices: Found ${invoices.length} records`);
    invoices.forEach(invoice => {
      console.log(`  - ${invoice.fields['Client Name']} (${invoice.fields.Month} ${invoice.fields.Year}): ${invoice.fields.Status}`);
    });

    console.log('\n🎉 Airtable is fully connected and ready for development!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

main().catch(console.error);