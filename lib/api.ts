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
      // Ensure jumlahDonasi is strictly a number for the backend
      body: JSON.stringify({
        ...data,
        jumlahDonasi: Number(data.jumlahDonasi)
      }),
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
    const data: any[] = await response.json();
    
    const mappedData: Donor[] = data.map(item => {
      // With aligned columns, the data should now be correct in their fields.
      // But we keep a check just in case of legacy mismatched data in the sheet.
      const valAmount = Number(item.jumlahDonasi) || 0;
      const valAlt = Number(item.namaPengirim) || 0;
      
      let actualAmount = valAmount;
      // Safety check: if jumlahDonasi looks like a phone number and namaPengirim looks like the amount
      if (valAmount > 1000000000 && valAlt > 0 && valAlt < 1000000000) {
        actualAmount = valAlt;
      }

      return {
        tanggal: item.tanggal,
        nama: (item.nama || 'Donatur').trim() || 'Hamba Allah',
        jumlahDonasi: actualAmount,
      };
    });

    // Sort by Date Descending (Newest First)
    return mappedData.sort((a, b) => {
      return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
    });
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
