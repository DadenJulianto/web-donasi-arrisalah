'use client';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function DonorListSection() {
  // Example data - will be replaced with Google Sheets integration
  const donors = [
    {
      id: 1,
      nama: 'Budi Santoso',
      jumlah: 500000,
      tanggal: '2024-01-15',
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      jumlah: 1000000,
      tanggal: '2024-01-14',
    },
    {
      id: 3,
      nama: 'Ahmad Hidayat',
      jumlah: 2000000,
      tanggal: '2024-01-13',
    },
    {
      id: 4,
      nama: 'Fatimah Az-Zahra',
      jumlah: 750000,
      tanggal: '2024-01-12',
    },
    {
      id: 5,
      nama: 'Muhammad Rifki',
      jumlah: 1500000,
      tanggal: '2024-01-11',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Daftar Donatur
          </h2>
          <p className="text-lg text-muted-foreground">
            Terima kasih kepada para donatur yang telah berkontribusi
          </p>
        </div>

        <Card className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 border-b border-primary/20">
                  <TableHead className="text-foreground font-semibold">
                    Nama Donatur
                  </TableHead>
                  <TableHead className="text-right text-foreground font-semibold">
                    Jumlah Donasi
                  </TableHead>
                  <TableHead className="text-right text-foreground font-semibold">
                    Tanggal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow
                    key={donor.id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground py-4">
                      {donor.nama}
                    </TableCell>
                    <TableCell className="text-right text-primary font-semibold py-4">
                      {formatCurrency(donor.jumlah)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground py-4">
                      {formatDate(donor.tanggal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-6 md:px-8 py-6 bg-primary/5 border-t border-primary/20 text-center text-sm text-muted-foreground">
            Menampilkan {donors.length} donatur terbaru. Daftar lengkap dapat diakses dengan kontribusi lebih lanjut.
          </div>
        </Card>
      </div>
    </section>
  );
}
