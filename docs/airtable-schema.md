# Airtable Schema Documentation

## Overview
This document provides detailed instructions for setting up the Airtable database schema for the DTZ Invoice Tool.

## Manual Setup Required
Airtable doesn't support programmatic schema creation, so tables must be created manually through the web interface.

## Base Setup

1. Create a new base at [airtable.com](https://airtable.com)
2. Name it "DTZ Invoice Tool"
3. Delete the default table and create the following 4 tables:

## Table Schemas

### 1. Clients Table

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| Name | Single line text | Required |
| Address | Long text | Optional |
| Email | Email | Optional |
| PGB_Rate | Currency | Required, EUR currency |
| Status | Single select | Options: "Active", "Inactive" |
| Created_Date | Date | Include time, GMT |

**Views to create:**
- Grid view (default)
- Active Clients (filter: Status = "Active")

### 2. TimeEntries Table

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| Client | Link to another record | Link to "Clients" table |
| Date | Date | Date only (no time) |
| Hours | Number | Allow decimals, precision 2 |
| Notes | Long text | Optional |
| Created_Date | Date | Include time, GMT |

**Views to create:**
- Grid view (default)
- This Month (filter: Date >= start of current month)
- By Client (group by Client field)

### 3. Invoices Table

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| Client | Link to another record | Link to "Clients" table |
| Month | Single select | Options: "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" |
| Year | Number | Integer only |
| Total_Hours | Formula | `SUM({TimeEntries (from Client).Hours})` |
| Total_Amount | Formula | `{Total_Hours} * {Client.PGB_Rate}` |
| Status | Single select | Options: "Draft", "Sent", "Paid" |
| PDF_URL | URL | Optional |
| Created_Date | Date | Include time, GMT |

**Views to create:**
- Grid view (default)
- Unpaid (filter: Status != "Paid")
- Current Year (filter: Year = 2024)

### 4. CompanyInfo Table

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| Company_Name | Single line text | Required |
| Address | Long text | Required |
| BTW_Number | Single line text | Required |
| Bank_Account | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Required |

**Note:** This table should only have one record with your company information.

## Linked Fields Setup

### TimeEntries → Clients
1. In TimeEntries table, the "Client" field should link to the Clients table
2. In Clients table, this will automatically create a reverse link field called "TimeEntries"

### Invoices → Clients  
1. In Invoices table, the "Client" field should link to the Clients table
2. In Clients table, this will automatically create a reverse link field called "Invoices"

## Formula Field Details

### Total_Hours in Invoices
```
SUM({TimeEntries (from Client).Hours})
```
This sums all hours from TimeEntries linked to the same client.

### Total_Amount in Invoices
```
{Total_Hours} * {Client.PGB_Rate}
```
This multiplies total hours by the client's hourly rate.

## Permissions & Sharing

For development:
- Creator has full access
- Consider read-only access for clients if needed later

## API Access

After creating tables:
1. Go to https://airtable.com/account
2. Generate an API key
3. Copy your Base ID from the URL (starts with "app...")
4. Update `.env.local` with these credentials

## Sample Data

Run the setup script to create sample data:
```bash
node scripts/setup-airtable.js
```

This will create:
- Sample company information
- One test client
- Two sample time entries
- Test data for development

## Backup Strategy

Consider regular exports:
- CSV exports for data backup
- JSON exports via API for full backup
- Use the included backup script: `node scripts/backup.js`

## Dutch Compliance Notes

- PGB_Rate field uses EUR currency
- Date fields use DD-MM-YYYY format in views
- Company BTW number is required for invoices
- Bank account format should be IBAN (NL## #### #### ##)