'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const handleDonateClick = () => {
    document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-primary/5 via-background to-background pt-12 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3">
              <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider">
                Sedekah di Bulan Penuh Berkah
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-balance">
                  Sedekah Jariyah untuk Asrama Santri
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Bersama-sama kita dukung pembangunan asrama santri yang menjadi rumah kedua bagi generasi pemimpin Islam. Setiap kontribusi Anda adalah investasi untuk masa depan yang lebih baik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8"
                onClick={handleDonateClick}
              >
                Mulai Berdonasi
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-full px-8"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Bergabung dengan <span className="font-semibold text-foreground">100+ donatur</span>
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/asrama-hero.jpg"
              alt="Asrama Santri - Dormitory Building"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
