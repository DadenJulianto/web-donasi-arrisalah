'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';

export function DonationMethodsSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Metode Donasi
          </h2>
          <p className="text-lg text-muted-foreground">
            Pilih cara yang paling mudah untuk Anda berdonasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* QRIS Method */}
          <Card className="bg-card border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="relative w-40 h-40 mb-6 bg-primary/10 rounded-lg overflow-hidden">
              <Image
                src="/qris-placeholder.jpg"
                alt="QRIS Code"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              QRIS
            </h3>
            <p className="text-muted-foreground mb-6">
              Scan kode QRIS di atas menggunakan aplikasi banking atau e-wallet pilihan Anda untuk transfer yang cepat dan mudah.
            </p>
            <p className="text-sm text-primary font-semibold">
              Tersedia di semua aplikasi mobile banking dan e-wallet
            </p>
          </Card>

          {/* Bank Transfer Method */}
          <Card className="bg-card border border-primary/20 p-8 rounded-2xl flex flex-col justify-center hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Transfer Bank
            </h3>
            
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Bank
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Bank Jatim
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Nomor Rekening
                </p>
                <p className="text-lg font-mono font-bold text-primary">
                  6112003337
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Atas Nama
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Yayasan Ar-Risalah
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-6 pt-6 border-t border-primary/20">
              Setelah transfer, mohon isi form donasi di bawah untuk konfirmasi
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
