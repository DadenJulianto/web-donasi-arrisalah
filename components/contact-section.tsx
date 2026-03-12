'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function ContactSection() {
  const whatsappNumber = '6287766887622';
  const whatsappMessage = encodeURIComponent('Assalamu alaikum, saya ingin mengetahui lebih lanjut tentang donasi untuk asrama santri');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-muted-foreground">
            Ada pertanyaan atau ingin mendiskusikan lebih lanjut?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* WhatsApp Card */}
          <Card className="bg-card border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.773 1.149c-2.693 1.419-4.292 4.049-4.292 6.927 0 1.775.292 3.495.823 5.122l-1.06 3.861 3.95-1.034c1.487.823 3.113 1.549 4.992 1.695h.005c.001 0 .001 0 .001 0 5.338 0 9.703-4.365 9.703-9.703 0-2.591-.505-5.034-1.413-7.285C18.928 2.071 15.801.11 12.051.11zm5.904 17.952h-.004c-1.678-.41-3.534-1.189-5.192-2.202l-.397-.21-3.702.968.987-3.595-.231-.368a8.965 8.965 0 01-1.382-4.579c0-4.961 4.038-9 9-9 2.395 0 4.656.823 6.364 2.431 1.708 1.608 2.656 3.869 2.656 6.569 0 4.961-4.038 9-9 9z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              WhatsApp
            </h3>
            <p className="text-muted-foreground mb-2">
              Hubungi langsung melalui WhatsApp
            </p>
            <p className="text-lg font-semibold text-primary mb-6">
              087766887622
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              (Mas Farid)
            </p>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg"
            >
              <Link href={whatsappUrl} target="_blank">
                Chat WhatsApp
              </Link>
            </Button>
          </Card>

          {/* Instagram Card */}
          <Card className="bg-card border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Instagram
            </h3>
            <p className="text-muted-foreground mb-2">
              Ikuti kami untuk update terbaru
            </p>
            <p className="text-lg font-semibold text-primary mb-6">
              @lksaarrisalahhdykdr
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Dapatkan update proyek dan cerita dari santri
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg"
            >
              <Link href="https://instagram.com/lksaarrisalahhdykdr" target="_blank">
                Kunjungi Instagram
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
