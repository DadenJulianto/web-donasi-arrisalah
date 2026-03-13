'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function DonationFormSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    namaPengirim: '',
    jumlahDonasi: '',
    metode: 'transfer',
    pesan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      metode: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.nama || !formData.whatsapp || !formData.jumlahDonasi || !formData.metode) {
      toast({
        title: 'Error',
        description: 'Mohon isi semua field yang wajib diisi',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxsGZKrRt7yJZdR_9D0k_r7TyxAc4f8u3i6bR856OVlhGw1QY19LyYOykjMFFu-yHOK/exec", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          tanggal: new Date().toISOString(),
          nama: formData.nama,
          jumlahDonasi: Number(formData.jumlahDonasi.replace(/\./g, '')),
          whatsapp: formData.whatsapp.replace(/[^0-9]/g, ''),
          namaPengirim: formData.namaPengirim,
          pesan: formData.pesan,
          metode: formData.metode
        }),
        mode: 'no-cors' // Google Apps Script requires no-cors when redirecting if CORS is not explicitly handled
      });

      // When using 'no-cors', the response status is 0 and we can't read the body.
      // We assume success if the fetch completes without throwing an error.
      toast({
        title: 'Berhasil',
        description: 'Terima kasih atas donasi Anda! Data Anda telah dicatat.',
      });
      
      // Reset form
      setFormData({
        nama: '',
        whatsapp: '',
        namaPengirim: '',
        jumlahDonasi: '',
        metode: 'transfer',
        pesan: '',
      });
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengirim data. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donation-form" className="w-full py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Form Donasi
          </h2>
          <p className="text-lg text-muted-foreground">
            Isi form di bawah untuk mendaftarkan donasi Anda
          </p>
        </div>

        <Card className="bg-card border border-primary/20 p-8 md:p-12 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Donatur */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Nama Donatur <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                name="nama"
                placeholder="Masukkan nama Anda"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Nomor WhatsApp <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                name="whatsapp"
                placeholder="08XXXXXXXXXX"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            {/* Nama Pengirim Bank */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Nama Pengirim Bank (jika berbeda)
              </label>
              <Input
                type="text"
                name="namaPengirim"
                placeholder="Opsional - nama di rekening pengirim"
                value={formData.namaPengirim}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* Jumlah Donasi */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Jumlah Donasi (Rp) <span className="text-destructive">*</span>
              </label>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="jumlahDonasi"
                  placeholder="Contoh: 100.000"
                  value={formData.jumlahDonasi}
                  onChange={(e) => {
                    // Allow only numbers and dots
                    const val = e.target.value.replace(/[^0-9.]/g, '');
                    handleInputChange({ ...e, target: { ...e.target, name: 'jumlahDonasi', value: val } } as any);
                  }}
                  className="w-full text-lg font-semibold"
                  required
                />
                {formData.jumlahDonasi && (
                  <p className="text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10 inline-block">
                    Terbilang: {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(Number(formData.jumlahDonasi.replace(/\./g, '')))}
                  </p>
                )}
              </div>
            </div>

            {/* Metode Donasi */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Metode Donasi <span className="text-destructive">*</span>
              </label>
              <Select value={formData.metode} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">Transfer Bank</SelectItem>
                  <SelectItem value="qris">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pesan atau Doa */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Pesan atau Doa
              </label>
              <Textarea
                name="pesan"
                placeholder="Tuliskan pesan atau doa Anda untuk asrama santri..."
                value={formData.pesan}
                onChange={handleInputChange}
                className="w-full min-h-24 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg"
            >
              {loading ? 'Mengirim...' : 'Kirim Data Donasi'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Data Anda akan disimpan dengan aman dan hanya digunakan untuk keperluan dokumentasi donasi.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
