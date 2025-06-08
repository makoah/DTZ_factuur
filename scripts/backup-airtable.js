#!/usr/bin/env node

/**
 * Airtable Backup Script
 * Exports all data from Airtable to JSON files with timestamps
 */

const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const tables = ['Clients', 'TimeEntries', 'Invoices', 'CompanyInfo'];

async function backupTable(tableName) {
  console.log(`📥 Backing up ${tableName}...`);
  
  try {
    const records = await base(tableName).select().all();
    
    const data = records.map(record => ({
      id: record.id,
      fields: record.fields,
      createdTime: record.createdTime
    }));

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${tableName.toLowerCase()}_${timestamp}.json`;
    const filepath = path.join('samples', 'backups', filename);
    
    // Ensure backup directory exists
    const backupDir = path.join('samples', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`✅ ${tableName}: ${data.length} records → ${filepath}`);
    
    return data.length;
  } catch (error) {
    console.error(`❌ Failed to backup ${tableName}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🗄️  DTZ Invoice Tool - Airtable Backup\n');
  
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error('❌ Environment variables not set. Please configure .env.local first.');
    return;
  }

  let totalRecords = 0;
  
  for (const table of tables) {
    const count = await backupTable(table);
    totalRecords += count;
  }
  
  console.log(`\n🎉 Backup complete! ${totalRecords} total records backed up.`);
  console.log(`📁 Backup files saved to: samples/backups/`);
}

if (require.main === module) {
  main().catch(console.error);
}