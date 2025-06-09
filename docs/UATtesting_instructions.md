# DTZ Invoice Tool - User Acceptance Testing Instructions

## 🚀 Pre-Testing Setup

### 1. Start the Development Server
```bash
cd /Users/mkokarmidi/Downloads/DTZ_invoice_tool/dtz-invoice-tool
npm run dev
```
- Wait for message: "✓ Ready in XXXms"
- Open browser to: **http://localhost:3000**

### 2. Browser Requirements
- Use Chrome, Firefox, or Safari
- Enable JavaScript
- Recommended screen resolution: 1024x768 or higher

---

## 📋 Test Scenarios

### **TEST 1: Application Loading & Navigation**

#### Steps:
1. Navigate to `http://localhost:3000`
2. Verify page loads completely
3. Check DTZ logo displays in header
4. Click each navigation item:
   - **Dashboard** (should show overview)
   - **Cliënten** (should show client list)
   - **Tijd Registratie** (should show time entries)
   - **Facturen** (should show invoices page)
   - **Rapporten** (should show reports page)
   - **Instellingen** (should show settings)

#### Expected Results:
- ✅ All pages load without errors
- ✅ No 404 "Page Not Found" errors
- ✅ DTZ branding visible throughout
- ✅ Navigation is responsive and consistent

---

### **TEST 2: Theme System Testing**

#### Steps:
1. Navigate to **Instellingen** (Settings)
2. **Test Light Theme**:
   - Click "Licht Thema"
   - Verify immediate color change
   - Check "Actief" badge appears
3. **Test Dark Theme**:
   - Click "Donker Thema" 
   - Verify background turns dark navy color
   - Check text becomes white/readable
4. **Test Card Styles** (in dark mode):
   - Click "Wit met Coral Rand"
   - Click "Licht Grijs"
   - Click "Licht Navy"
   - Verify "Actief" badge moves to selected option
5. **Test Save Confirmation**:
   - Click "Instellingen Opslaan"
   - Verify green checkmark appears
   - Verify button changes to "Opgeslagen"
   - Wait 3 seconds - confirmation should disappear
6. **Test Persistence**:
   - Refresh the page (F5)
   - Verify your theme choice is remembered

#### Expected Results:
- ✅ Theme changes apply immediately
- ✅ Dark theme: navy background, white text, coral accents
- ✅ Light theme: white background, dark text
- ✅ Card styles change appearance in dark mode
- ✅ Settings persist after page refresh
- ✅ Save button shows confirmation feedback

---

### **TEST 3: Client Management (Airtable Integration)**

#### Steps:
1. Navigate to **Cliënten** (Clients)
2. **Test Client List Loading**:
   - Wait for data to load
   - Should see loading spinner first
   - Should NOT see error message "Kon cliënten niet laden"
3. **Verify Client Data**:
   - Check if real client names appear (Henk Bakker, Piet van der Berg, etc.)
   - Verify email addresses and rates display
   - Check "Actief" status badges show in coral color
4. **Test Client Creation**:
   - Click "Nieuwe Cliënt"
   - Fill out form with test data:
     - Voornaam: "Test"
     - Achternaam: "Gebruiker" 
     - Email: "test@example.nl"
     - Adres: "Teststraat 123\n1234 AB Amsterdam"
     - PGB Uurtarief: "35.00"
   - Click "Cliënt Opslaan"
   - **Note**: May show error due to Airtable write permissions
5. **Test Form Validation**:
   - Try submitting empty form
   - Try invalid email format
   - Verify error messages appear

#### Expected Results:
- ✅ Client list loads real data from Airtable
- ✅ No connection errors displayed
- ✅ Client cards show proper theme colors
- ✅ Form validation works correctly
- ⚠️ Client creation may fail (expected due to permissions)

---

### **TEST 4: Time Entry Management**

#### Steps:
1. Navigate to **Tijd Registratie** (Time Entries)
2. **Test Time Entry List**:
   - Should see mock time entries (due to Airtable permissions)
   - Verify entries show client names and hours
   - Check theme colors apply to cards
3. **Test New Time Entry**:
   - Click "Nieuwe Tijd Registratie"
   - **Test Client Loading**:
     - Wait for client dropdown to populate
     - Should see real client names with rates
   - **Fill Form**:
     - Select a client from dropdown
     - Set date (default is today)
     - Enter hours: "2.5"
     - Add notes: "Test tijd registratie"
   - Click "Opslaan"
   - **Note**: May show success but not save due to permissions
4. **Test Form Validation**:
   - Try submitting without selecting client
   - Try entering 0 or negative hours
   - Try future date
   - Verify error messages appear

#### Expected Results:
- ✅ Time entry list displays with proper theming
- ✅ Client dropdown loads real Airtable data
- ✅ Form validation prevents invalid submissions
- ✅ Loading states and error handling work
- ⚠️ Actual saving may fail (expected due to permissions)

---

### **TEST 5: Responsive Design & Cross-Browser**

#### Steps:
1. **Test Mobile View**:
   - Resize browser window to 375px width
   - Verify navigation adapts
   - Check cards stack vertically
   - Test form layouts remain usable
2. **Test Different Screen Sizes**:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
3. **Test Different Browsers** (if available):
   - Chrome
   - Firefox
   - Safari

#### Expected Results:
- ✅ Layout adapts to different screen sizes
- ✅ Text remains readable at all sizes
- ✅ Buttons and forms remain clickable
- ✅ Navigation works on mobile

---

### **TEST 6: Error Handling & Edge Cases**

#### Steps:
1. **Test Network Issues**:
   - Disable internet connection
   - Refresh client page
   - Should see "Kon cliënten niet laden" error
   - Re-enable internet and retry
2. **Test Invalid URLs**:
   - Navigate to `http://localhost:3000/invalid-page`
   - Should see 404 error or redirect
3. **Test Form Edge Cases**:
   - Very long client names
   - Special characters in addresses
   - Maximum hour values (24)

#### Expected Results:
- ✅ Graceful error messages for network issues
- ✅ Proper 404 handling for invalid routes
- ✅ Form handles edge cases without breaking

---

## 🐛 Bug Reporting

### If You Find Issues:

**For each bug, please document:**
1. **Page/Section**: Where did the issue occur?
2. **Steps to Reproduce**: Exact steps you took
3. **Expected Result**: What should have happened?
4. **Actual Result**: What actually happened?
5. **Browser/Device**: Chrome/Firefox, Desktop/Mobile
6. **Screenshots**: If visual issues

### **Known Limitations:**
- ⚠️ Client creation may fail (Airtable write permissions)
- ⚠️ Time entry creation may fail (Airtable write permissions)
- ⚠️ Time entries show mock data (Airtable read permissions)

---

## ✅ Testing Checklist

Copy this checklist and mark items as you test:

- [ ] Application loads successfully
- [ ] All navigation links work
- [ ] Theme switching works immediately
- [ ] Dark theme applies proper colors
- [ ] Settings save and persist
- [ ] Client list loads real data
- [ ] Client creation form validates
- [ ] Time entry list displays
- [ ] Time entry form loads clients
- [ ] Form validation prevents errors
- [ ] Mobile layout works
- [ ] Error handling is graceful
- [ ] No console errors in browser

## 🎯 Success Criteria

**The DTZ Invoice Tool passes UAT if:**
- ✅ All navigation works without 404 errors
- ✅ Theme system functions completely
- ✅ Client data loads from Airtable
- ✅ Forms validate user input properly
- ✅ Error messages are user-friendly
- ✅ UI is responsive and professional
- ✅ Dutch language is correct throughout

---

## 🔧 Troubleshooting

**If the server won't start:**
```bash
# Kill any existing processes
pkill -f "next dev"
# Start fresh
npm run dev
```

**If you see build errors:**
```bash
# Run with linting disabled
NEXT_LINT=false npm run dev
```

**If pages don't load:**
- Check browser console for errors (F12)
- Verify server is running on correct port
- Clear browser cache and refresh