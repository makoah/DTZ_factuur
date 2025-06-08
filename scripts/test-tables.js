#!/usr/bin/env node

/**
 * Test Airtable Tables - Check what tables and fields exist
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

async function testTable(tableName) {
  console.log(`\n📋 Testing table: ${tableName}`);
  
  try {
    // Try to get the first record to see field structure
    const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
    
    if (records.length > 0) {
      console.log(`✅ Table exists with data (${records.length} record)`);
      console.log('Fields found:', Object.keys(records[0].fields));
    } else {
      console.log(`✅ Table exists but empty`);
      
      // Try to create a minimal test record to see what fields are expected
      try {
        const testRecord = await base(tableName).create({
          'Name': 'Test'
        });
        console.log('✅ Can create records');
        // Delete the test record
        await base(tableName).destroy(testRecord.id);
        console.log('✅ Test record cleaned up');
      } catch (createError) {
        console.log('Field creation error:', createError.message);
      }
    }
    
  } catch (error) {
    if (error.message.includes('Could not find table')) {
      console.log(`❌ Table "${tableName}" does not exist`);
    } else {
      console.log(`❌ Error accessing table:`, error.message);
    }
  }
}

async function main() {
  console.log('🔍 DTZ Invoice Tool - Table Structure Test\n');
  
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error('❌ Environment variables not set. Please configure .env.local first.');
    return;
  }

  const tables = ['Clients', 'TimeEntries', 'Invoices'];
  
  for (const tableName of tables) {
    await testTable(tableName);
  }
  
  console.log('\n✅ Table structure test complete!');
}

if (require.main === module) {
  main().catch(console.error);
}