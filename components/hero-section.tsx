'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const HERO_IMAGES = [
  {
    src: '/asrama-4.jpeg',
    alt: 'Asrama Santri View 4'
  },
  {
    src: '/asrama-5.jpeg',
    alt: 'Asrama Santri View 5'
  },
  {
    src: '/asrama-6.jpeg',
    alt: 'Asrama Santri View 6'
  },
  {
    src: '/asrama-7.jpeg',
    alt: 'Asrama Santri View 7'
  },
  {
    src: '/asrama-8.jpeg',
    alt: 'Asrama Santri View 8'
  },
  {
    src: '/asrama-9.jpeg',
    alt: 'Asrama Santri View 9'
  },
  {
    src: '/asrama-10.jpeg',
    alt: 'Asrama Santri View 10'
  },
  {
    src: '/asrama-11.jpeg',
    alt: 'Asrama Santri View 11'
  },
  {
    src: '/asrama-12.jpeg',
    alt: 'Asrama Santri View 12'
  }
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
                Gerakan 1 Kebaikan untuk 1000 Bulan
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

          {/* Hero Slider */}
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-xl h-[400px] md:h-[500px]" ref={emblaRef}>
              <div className="flex h-full">
                {HERO_IMAGES.map((image, index) => (
                  <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {HERO_IMAGES.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/50"
                  // Note: In a real app we'd track the selected index to highlight the active dot
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
