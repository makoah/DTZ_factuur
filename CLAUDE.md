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
- [ ] Client management (CRUD)
- [ ] Daily time entry logging
- [ ] Monthly invoice generation
- [ ] Dutch PDF invoice formatting
- [ ] Airtable synchronization
- [ ] Data backup utilities

## Dutch Invoice Requirements
- VAT (BTW) handling (21%)
- Company BTW number display
- Dutch date format (DD-MM-YYYY)
- Euro currency formatting (€1.234,56)
- Required invoice fields per Dutch law

## Environment Variables
```
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Git Workflow
- Main branch: `main`
- Feature branches: `feature/description`
- Regular commits with descriptive messages
- GitHub repository: DTZ_factuur