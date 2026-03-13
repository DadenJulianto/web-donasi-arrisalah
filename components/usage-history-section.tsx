'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchUsage, UsageHistory } from '@/lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

export function UsageHistorySection() {
  const [usageHistory, setUsageHistory] = useState<UsageHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsage() {
      try {
        setLoading(true);
        const data = await fetchUsage();
        setUsageHistory(data);
        setError(null);
      } catch (err) {
        setError('Gagal mengambil data penggunaan dana');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadUsage();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      // Handle the case where the API might return Indonesian date format directly
      if (dateString.toLowerCase().includes('maret') || 
          dateString.toLowerCase().includes('januari') || 
          dateString.toLowerCase().includes('februari')) {
        return dateString;
      }
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  const totalUsage = usageHistory.reduce((sum, item) => sum + Number(item.jumlah), 0);

  return (
    <section id="usage" className="w-full py-12 md:py-20 bg-primary/5">
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
          <Card className="bg-card border border-primary/20 p-6 md:p-8 rounded-xl text-center shadow-md">
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                <p className="text-xs text-muted-foreground">Menghitung total...</p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground text-sm mb-2">
                  Total Dana Terpakai
                </p>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {formatCurrency(totalUsage)}
                </p>
              </>
            )}
          </Card>

          {/* Usage History Table / List */}
          <Card className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-lg min-h-[400px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground animate-pulse">Memuat data penggunaan...</p>
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">{error}</p>
                <p className="text-muted-foreground">Silakan coba segarkan halaman.</p>
              </div>
            ) : usageHistory.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <p className="text-lg text-muted-foreground">Belum ada data penggunaan dana yang tersedia.</p>
              </div>
            ) : (
              <>
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
                      {usageHistory.map((item, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                        >
                          <TableCell className="font-medium text-muted-foreground py-4 whitespace-nowrap">
                            {formatDate(item.tanggal)}
                          </TableCell>
                          <TableCell className="text-foreground py-4">
                            {item.penggunaan}
                          </TableCell>
                          <TableCell className="text-right text-primary font-semibold py-4">
                            {formatCurrency(Number(item.jumlah))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="px-6 md:px-8 py-6 bg-primary/5 border-t border-primary/20 mt-auto">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      Laporan lengkap dan audit dapat diminta kepada pengelola
                    </p>
                    <button className="text-primary font-semibold hover:underline text-sm">
                      Minta Laporan Lengkap →
                    </button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
