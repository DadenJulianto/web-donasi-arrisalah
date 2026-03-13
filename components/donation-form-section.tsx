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
      const response = await fetch("https://script.google.com/macros/s/AKfycbxI5Naf4AB9-FO42a75tf277Imo7K_xcot_ACc3KI4fJp4Be28C7ohF5fe4qpqrRHkk/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          whatsapp: formData.whatsapp,
          namaPengirim: formData.namaPengirim,
          jumlahDonasi: formData.jumlahDonasi,
          metode: formData.metode,
          pesan: formData.pesan,
          tanggal: new Date().toISOString()
        })
      });

      // Note: If the API returns a redirect (302) which is common for Apps Script,
      // fetch will follow it. If CORS is not enabled on the script, this might fail.
      // But we follow the user's requested implementation detail.
      
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
              <Input
                type="number"
                name="jumlahDonasi"
                placeholder="100000"
                value={formData.jumlahDonasi}
                onChange={handleInputChange}
                className="w-full"
                required
              />
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
