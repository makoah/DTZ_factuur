# DTZ Invoice Tool - Claude Development Notes

## Project Overview
Invoice tool for Dutch PGB begeleiding company with Airtable backend integration.

## Architecture
- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Airtable with automatic synchronization
- **PDF Generation**: @react-pdf/renderer
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Folder Structure
```
├── assets/           # Static assets
│   ├── images/       # Company logos, icons
│   ├── templates/    # Invoice templates
│   └── screenshots/  # Documentation images
├── docs/            # Technical documentation
├── samples/         # Sample data and invoices
├── scripts/         # Utility scripts
└── src/
    ├── app/         # Next.js 13+ app directory
    ├── components/  # Reusable UI components
    ├── lib/         # Utilities and Airtable client
    └── types/       # TypeScript definitions
```

## Database Schema (Airtable)

### Tables:
1. **Clients**
   - Name (Single line text)
   - Address (Long text)
   - Email (Email)
   - PGB_Rate (Currency - €/hour)
   - Status (Single select: Active/Inactive)
   - Created_Date (Date)

2. **TimeEntries**
   - Client (Link to Clients)
   - Date (Date)
   - Hours (Number)
   - Notes (Long text)
   - Created_Date (Date)

3. **Invoices**
   - Client (Link to Clients)
   - Month (Single select: Jan-Dec)
   - Year (Number)
   - Total_Hours (Formula from TimeEntries)
   - Total_Amount (Formula: Hours × Rate)
   - Status (Single select: Draft/Sent/Paid)
   - PDF_URL (URL)
   - Created_Date (Date)

4. **CompanyInfo**
   - Company_Name (Single line text)
   - Address (Long text)  
   - BTW_Number (Single line text)
   - Bank_Account (Single line text)
   - Email (Email)
   - Phone (Phone number)

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Key Features to Implement
- [x] Client management (CRUD) - Airtable connected
- [ ] Daily time entry logging
- [ ] Monthly invoice generation
- [ ] Dutch PDF invoice formatting
- [x] Airtable synchronization - Working
- [x] Data backup utilities - Scripts created

## Dutch Invoice Requirements
- VAT (BTW) handling (21%)
- Company BTW number display
- Dutch date format (DD-MM-YYYY)
- Euro currency formatting (€1.234,56)
- Required invoice fields per Dutch law

## Environment Variables
```
AIRTABLE_API_KEY=patof99QQF6aNF58e.a59863733cf777e505afaa1b90c60e15a4d8e683ef24eda807af1153ed621de5
AIRTABLE_BASE_ID=appsIdltHcGh0uBsO
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Setup Status
- [x] Next.js 15 project initialized
- [x] TypeScript configured
- [x] Tailwind CSS setup
- [x] Airtable connection established
- [x] Company info configured (Direct TopZorg)
- [x] DTZ logos integrated
- [x] Sample data created
- [x] Development server running

## Airtable Data Status
- **Clients**: 3 records (Piet, Henk, Maria)
- **Invoices**: 3 records (Jan-Feb 2024)
- **TimeEntries**: Connected but permission restricted
- **Company Info**: Stored in `src/lib/company-config.ts`

## Git Workflow
- Main branch: `main`
- Feature branches: `feature/description`
- Regular commits with descriptive messages
- GitHub repository: DTZ_factuur