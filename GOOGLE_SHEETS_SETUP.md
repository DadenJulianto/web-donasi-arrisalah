# Google Sheets Integration Setup

This guide explains how to set up Google Sheets API integration for the Sedekah Jariyah donation website.

## Overview

The website uses Google Sheets API to:
1. Store donation records from the donation form
2. Display donor list dynamically
3. Display donation usage history
4. Update donation progress bar data

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "Sedekah Jariyah"
3. Enable the Google Sheets API and Google Drive API

### 2. Create a Service Account

1. In Google Cloud Console, go to "Service Accounts"
2. Create a new service account named "sedekah-jariyah-service"
3. Grant it "Editor" role
4. Create a JSON key and download it

### 3. Create Google Sheets

Create three Google Sheets in your Google Drive:

#### a. Donations Sheet
- Column A: Tanggal
- Column B: Nama Donatur
- Column C: Nomor WhatsApp
- Column D: Nama Pengirim Bank
- Column E: Jumlah Donasi
- Column F: Metode Donasi
- Column G: Pesan/Doa

#### b. Usage History Sheet
- Column A: Tanggal
- Column B: Penggunaan Dana
- Column C: Jumlah

#### c. Progress Tracker Sheet
- Cell A1: Target Dana (300000000)
- Cell A2: Dana Terkumpul (sum of donations)

### 4. Share Sheets with Service Account

1. Get the service account email from the JSON key file
2. Share each Google Sheet with this email address
3. Grant "Editor" access

### 5. Set Up Environment Variables

Create a `.env.local` file in your project root:

```
GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_DONATIONS_ID=your-donations-sheet-id
GOOGLE_SHEETS_USAGE_ID=your-usage-sheet-id
GOOGLE_SHEETS_PROGRESS_ID=your-progress-sheet-id
```

### 6. Install Dependencies

```bash
npm install googleapis dotenv
```

### 7. Implement API Integration

The API routes already have placeholders for Google Sheets integration:

- `/api/donation` - Saves donation records
- `/api/progress` - Fetches current donation progress
- `/api/donors` - Fetches donor list
- `/api/usage` - Fetches donation usage history

Replace the TODO comments with actual Google Sheets API calls.

## Example Implementation

### Save Donation to Google Sheets

```typescript
import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    keyFile: 'service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }),
});

await sheets.spreadsheets.values.append({
  spreadsheetId: GOOGLE_SHEETS_DONATIONS_ID,
  range: 'Sheet1!A:G',
  valueInputOption: 'USER_ENTERED',
  requestBody: {
    values: [[
      new Date().toLocaleDateString('id-ID'),
      nama,
      whatsapp,
      namaPengirim,
      jumlahDonasi,
      metode,
      pesan,
    ]],
  },
});
```

### Fetch Donation Progress

```typescript
const result = await sheets.spreadsheets.values.get({
  spreadsheetId: GOOGLE_SHEETS_PROGRESS_ID,
  range: 'Sheet1!A1:A2',
});

const targetAmount = result.data.values?.[0]?.[0];
const collectedAmount = result.data.values?.[1]?.[0];
```

## Testing

1. Fill out the donation form
2. Check your Google Sheet to verify the data was saved
3. Verify that the progress bar updates correctly

## Troubleshooting

- **Authentication Error**: Verify that the service account has been shared with all Google Sheets
- **Sheet Not Found**: Check that the sheet IDs in environment variables are correct
- **Permission Denied**: Ensure the service account email has Editor access to the sheets

## Security Notes

- Keep the service account JSON key secure and never commit it to version control
- Use environment variables to store sensitive credentials
- Implement rate limiting on API endpoints
- Validate all input data before saving to Google Sheets
