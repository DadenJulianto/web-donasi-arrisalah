const API_URL = 'https://script.google.com/macros/s/AKfycbxsGZKrRt7yJZdR_9D0k_r7TyxAc4f8u3i6bR856OVlhGw1QY19LyYOykjMFFu-yHOK/exec';

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
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
      mode: 'no-cors',
    });
    return true; 
  } catch (error) {
    console.error('Error submitting donation:', error);
    return false;
  }
}

export interface Donor {
  tanggal: string;
  nama: string;
  jumlahDonasi: number;
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
    return data.sort((a, b) => b.jumlahDonasi - a.jumlahDonasi);
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
