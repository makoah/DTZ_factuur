#!/usr/bin/env node

/**
 * Airtable Schema Setup Script
 * 
 * Since Airtable doesn't have a CLI for schema creation, this script:
 * 1. Validates your Airtable connection
 * 2. Creates sample data to test the schema
 * 3. Provides instructions for manual schema setup
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

async function validateConnection() {
  console.log('🔍 Validating Airtable connection...');
  
  try {
    // Try to list tables - this will fail if credentials are wrong
    await base('Clients').select({ maxRecords: 1 }).firstPage();
    console.log('✅ Airtable connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Airtable connection failed:', error.message);
    return false;
  }
}

async function createSampleData() {
  console.log('📝 Creating sample data...');
  
  try {
    // Create sample company info
    await base('CompanyInfo').create([
      {
        fields: {
          'Company_Name': 'DTZ PGB Begeleiding',
          'Address': 'Voorbeeldstraat 123\n1234 AB Amsterdam',
          'BTW_Number': 'NL123456789B01',
          'Bank_Account': 'NL91 ABNA 0417 1643 00',
          'Email': 'info@dtz-pgb.nl',
          'Phone': '+31 20 123 4567'
        }
      }
    ]);

    // Create sample client
    const clientRecords = await base('Clients').create([
      {
        fields: {
          'Name': 'Jan de Vries',
          'Address': 'Klantenstraat 456\n5678 CD Utrecht',
          'Email': 'jan.devries@email.nl',
          'PGB_Rate': 35.50,
          'Status': 'Active',
          'Created_Date': new Date().toISOString().split('T')[0]
        }
      }
    ]);

    // Create sample time entries
    await base('TimeEntries').create([
      {
        fields: {
          'Client': [clientRecords[0].id],
          'Date': '2024-01-15',
          'Hours': 3,
          'Notes': 'Begeleiding bij dagbesteding',
          'Created_Date': new Date().toISOString().split('T')[0]
        }
      },
      {
        fields: {
          'Client': [clientRecords[0].id],
          'Date': '2024-01-22',
          'Hours': 2.5,
          'Notes': 'Ondersteuning administratie',
          'Created_Date': new Date().toISOString().split('T')[0]
        }
      }
    ]);

    console.log('✅ Sample data created successfully!');
    
  } catch (error) {
    console.error('❌ Failed to create sample data:', error.message);
    console.log('💡 This might be because the tables don\'t exist yet. Please create them manually first.');
  }
}

function printSetupInstructions() {
  console.log(`
🏗️  AIRTABLE SCHEMA SETUP INSTRUCTIONS
=====================================

Since Airtable doesn't support CLI schema creation, please follow these steps:

1. Go to https://airtable.com and create a new base named "DTZ Invoice Tool"

2. Create these 4 tables with the following fields:

📋 TABLE: Clients
- Name (Single line text) 
- Address (Long text)
- Email (Email)
- PGB_Rate (Currency)
- Status (Single select: Active, Inactive)
- Created_Date (Date)

⏰ TABLE: TimeEntries  
- Client (Link to another record → Clients)
- Date (Date)
- Hours (Number, allow decimals)
- Notes (Long text)
- Created_Date (Date)

🧾 TABLE: Invoices
- Client (Link to another record → Clients)
- Month (Single select: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
- Year (Number)
- Total_Hours (Formula: SUM({TimeEntries.Hours}))
- Total_Amount (Formula: {Total_Hours} * {Client.PGB_Rate})
- Status (Single select: Draft, Sent, Paid)
- PDF_URL (URL)
- Created_Date (Date)

🏢 TABLE: CompanyInfo
- Company_Name (Single line text)
- Address (Long text)
- BTW_Number (Single line text)
- Bank_Account (Single line text)
- Email (Email)
- Phone (Phone number)

3. Copy your Base ID from the URL (https://airtable.com/appXXXXXXXX/...)

4. Get your API key from https://airtable.com/account

5. Update .env.local with your credentials:
   AIRTABLE_API_KEY=your_api_key_here
   AIRTABLE_BASE_ID=your_base_id_here

6. Run this script again to create sample data:
   node scripts/setup-airtable.js

📖 For detailed field configurations, see docs/airtable-schema.md
`);
}

async function main() {
  console.log('🚀 DTZ Invoice Tool - Airtable Setup\n');
  
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.log('⚠️  Environment variables not set. Please configure .env.local first.\n');
    printSetupInstructions();
    return;
  }

  const isConnected = await validateConnection();
  
  if (isConnected) {
    await createSampleData();
    console.log('\n🎉 Setup complete! Your Airtable base is ready for development.');
  } else {
    console.log('\n');
    printSetupInstructions();
  }
}

if (require.main === module) {
  main().catch(console.error);
}