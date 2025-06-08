# Sample Data for DTZ Invoice Tool

This directory contains CSV sample data files that can be imported into Airtable to populate your database with realistic test data.

## Files

### clients.csv
- **5 sample clients** with Dutch names and addresses
- Mix of active and inactive clients
- Realistic PGB hourly rates (€35-42)
- Proper Dutch address formatting

### timeentries.csv
- **17 time entries** across March 2024
- Realistic PGB begeleiding activities
- Hours range from 1.5 to 4.0 per session
- Dutch descriptions of support activities

### invoices.csv
- **11 sample invoices** covering Jan-Mar 2024
- Different statuses: Draft, Sent, Paid
- Calculated totals based on hours × rates
- Realistic monthly billing patterns

### companyinfo.csv
- **1 company record** with Dutch business details
- Valid BTW number format
- IBAN bank account format
- Professional contact information

## Import Instructions

### Method 1: Manual Import
1. Create tables in Airtable following `docs/airtable-schema.md`
2. Use Airtable's CSV import feature for each table
3. Map fields correctly during import

### Method 2: Copy & Paste
1. Open CSV files in Excel/Google Sheets
2. Copy data (excluding headers after first import)
3. Paste directly into Airtable tables

## Data Relationships

- **TimeEntries** reference clients by name (will need linking after import)
- **Invoices** reference clients by name (will need linking after import)
- **Total amounts** in invoices match calculated hours × rates

## Dutch PGB Context

Sample data reflects realistic PGB (Persoonsgebonden Budget) begeleiding scenarios:
- Individual support sessions
- Administrative assistance
- Medical appointment support
- Social activities guidance
- Household task assistance

## Usage Notes

- All dates use YYYY-MM-DD format for Airtable compatibility
- Currency amounts in euros (€)
- Dutch language notes and descriptions
- Realistic session durations and frequencies