import { NextRequest, NextResponse } from 'next/server';

interface DonationData {
  nama: string;
  whatsapp: string;
  namaPengirim: string;
  jumlahDonasi: string;
  metode: string;
  pesan: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DonationData = await request.json();

    // Validate required fields
    if (!body.nama || !body.whatsapp || !body.jumlahDonasi || !body.metode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Google Sheets API to save donation data
    // For now, we'll just log the data and return success
    console.log('Donation received:', {
      timestamp: new Date().toISOString(),
      ...body,
    });

    // In production, you would:
    // 1. Call Google Sheets API to append the donation data
    // 2. Send confirmation email/WhatsApp to the donor
    // 3. Update the progress bar data
    
    return NextResponse.json(
      {
        success: true,
        message: 'Donation data received successfully',
        data: {
          nama: body.nama,
          jumlahDonasi: body.jumlahDonasi,
          metode: body.metode,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}
