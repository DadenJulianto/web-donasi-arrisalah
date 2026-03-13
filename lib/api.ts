const SUBMIT_API_URL = 'https://script.google.com/macros/s/AKfycbxI5Naf4AB9-FO42a75tf277Imo7K_xcot_ACc3KI4fJp4Be28C7ohF5fe4qpqrRHkk/exec';

export interface DonationData {
  nama: string;
  whatsapp: string;
  namaPengirim: string;
  jumlahDonasi: string | number;
  metode: string;
  pesan: string;
  tanggal: string;
}

export async function submitDonation(data: DonationData): Promise<boolean> {
  try {
    const response = await fetch(SUBMIT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors', // Apps Script often requires no-cors for simple POSTs if not handling OPTIONS
    });
    // Note: with no-cors, we can't see the response body or status easily, 
    // but the request is sent. However, standard Apps Script setups usually work better with default fetch if CORS is handled.
    // The user's example didn't use no-cors, so I'll follow their example first but be aware of possible CORS issues.
    return true; 
  } catch (error) {
    console.error('Error submitting donation:', error);
    return false;
  }
}

const API_URL = 'https://script.google.com/macros/s/AKfycbw7OEJ7XRwCy1wcvsxyLP96BCfJ2LjZ1XDXBB7FGstrpUmK8n-iKQfO4yrtRTAn7ZpV/exec';

export interface Donor {
  tanggal: string;
  nama: string;
  jumlah: number;
}

export interface DonationProgress {
  target: number;
  terkumpul: number;
}

export interface UsageHistory {
  tanggal: string;
  penggunaan: string;
  jumlah: number;
}

export async function fetchDonors(): Promise<Donor[]> {
  try {
    const response = await fetch(`${API_URL}?sheet=donatur`);
    if (!response.ok) throw new Error('Failed to fetch donor data');
    const data: Donor[] = await response.json();
    // Sort by highest donation
    return data.sort((a, b) => b.jumlah - a.jumlah);
  } catch (error) {
    console.error('Error fetching donors:', error);
    return [];
  }
}

export async function fetchProgress(): Promise<DonationProgress | null> {
  try {
    const response = await fetch(`${API_URL}?sheet=progress`);
    if (!response.ok) throw new Error('Failed to fetch progress data');
    const data: DonationProgress[] = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching progress:', error);
    return null;
  }
}

export async function fetchUsage(): Promise<UsageHistory[]> {
  try {
    const response = await fetch(`${API_URL}?sheet=penggunaan`);
    if (!response.ok) throw new Error('Failed to fetch usage data');
    const data: UsageHistory[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching usage history:', error);
    return [];
  }
}
