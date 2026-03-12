'use client';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function UsageHistorySection() {
  // Example data - will be replaced with Google Sheets integration
  const usageHistory = [
    {
      id: 1,
      tanggal: '2024-01-10',
      penggunaan: 'Pembelian Material Bangunan - Semen & Batu Bata',
      jumlah: 15000000,
    },
    {
      id: 2,
      tanggal: '2024-01-08',
      penggunaan: 'Pembayaran Tenaga Kerja & Tukang',
      jumlah: 12000000,
    },
    {
      id: 3,
      tanggal: '2024-01-05',
      penggunaan: 'Pembelian Perlengkapan Kamar Santri',
      jumlah: 8500000,
    },
    {
      id: 4,
      tanggal: '2024-01-02',
      penggunaan: 'Instalasi Listrik & Air Bersih',
      jumlah: 10000000,
    },
    {
      id: 5,
      tanggal: '2023-12-28',
      penggunaan: 'Pembayaran Kontraktor & Survei Lahan',
      jumlah: 6950000,
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

  const totalUsage = usageHistory.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <section className="w-full py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Riwayat Penggunaan Dana
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparansi penuh dalam penggunaan dana donasi Anda
          </p>
        </div>

        <div className="space-y-6">
          {/* Total Usage Card */}
          <Card className="bg-card border border-primary/20 p-6 md:p-8 rounded-xl text-center">
            <p className="text-muted-foreground text-sm mb-2">
              Total Dana Terpakai
            </p>
            <p className="text-3xl md:text-4xl font-bold text-primary">
              {formatCurrency(totalUsage)}
            </p>
          </Card>

          {/* Usage History Table */}
          <Card className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 border-b border-primary/20">
                    <TableHead className="text-foreground font-semibold">
                      Tanggal
                    </TableHead>
                    <TableHead className="text-foreground font-semibold">
                      Penggunaan Dana
                    </TableHead>
                    <TableHead className="text-right text-foreground font-semibold">
                      Jumlah
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageHistory.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium text-muted-foreground py-4 whitespace-nowrap">
                        {formatDate(item.tanggal)}
                      </TableCell>
                      <TableCell className="text-foreground py-4">
                        {item.penggunaan}
                      </TableCell>
                      <TableCell className="text-right text-primary font-semibold py-4">
                        {formatCurrency(item.jumlah)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="px-6 md:px-8 py-6 bg-primary/5 border-t border-primary/20">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Laporan lengkap dan audit dapat diminta kepada pengelola
                </p>
                <button className="text-primary font-semibold hover:underline text-sm">
                  Minta Laporan Lengkap →
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
