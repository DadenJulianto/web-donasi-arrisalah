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
    
    // The API field mapping is inconsistent (swapped in some rows, not in others).
    // We use a heuristic: donation amounts are usually < 1 Billion, 
    // while WhatsApp/Phone numbers are > 1 Billion (e.g. 0812... or 6281...).
    const mappedData: Donor[] = data.map(item => {
      const valA = Number(item.jumlahDonasi) || 0;
      const valB = Number(item.namaPengirim) || 0;
      
      let actualAmount = valA;
      // If valA looks like a phone number and valB looks like a donation, swap them.
      if (valA > 1000000000 && valB > 0 && valB < 1000000000) {
        actualAmount = valB;
      } else if (valA === 0 && valB > 0) {
        actualAmount = valB;
      }

      return {
        tanggal: item.tanggal,
        nama: (item.nama || 'Donatur').trim(),
        jumlahDonasi: actualAmount,
      };
    });

    // Sort by highest donation
    return mappedData.sort((a, b) => b.jumlahDonasi - a.jumlahDonasi);
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
