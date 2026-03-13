'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchDonors, Donor } from '@/lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

export function DonorListSection() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDonors() {
      try {
        setLoading(true);
        const data = await fetchDonors();
        setDonors(data);
        setError(null);
      } catch (err) {
        setError('Gagal mengambil data donatur');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDonors();
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
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  return (
    <section id="donors" className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Daftar Donatur
          </h2>
          <p className="text-lg text-muted-foreground">
            Terima kasih kepada para donatur yang telah berkontribusi
          </p>
        </div>

        <Card className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-lg min-h-[400px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">Memuat data donatur...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">{error}</p>
              <p className="text-muted-foreground">Silakan coba segarkan halaman atau hubungi admin.</p>
            </div>
          ) : donors.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <p className="text-lg text-muted-foreground">Belum ada data donatur yang tersedia.</p>
            </div>
          ) : (
            <>
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
                    {donors.map((donor, index) => (
                      <TableRow
                        key={`${donor.nama}-${index}`}
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

              <div className="px-6 md:px-8 py-6 bg-primary/5 border-t border-primary/20 text-center text-sm text-muted-foreground mt-auto">
                Menampilkan {donors.length} donatur terbaru. Daftar lengkap dapat diakses dengan kontribusi lebih lanjut.
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}
