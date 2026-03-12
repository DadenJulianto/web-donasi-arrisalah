'use client';

import Link from 'next/link';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              Yayasan Ar-Risalah
            </h3>
            <p className="text-background/80 leading-relaxed text-sm">
              Komitmen kami adalah membangun generasi pemimpin Islam yang berakhlak mulia dan berpengetahuan luas melalui pendidikan berkualitas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Program Donasi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Transparansi Keuangan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <div className="space-y-2 text-sm text-background/80">
              <p>
                <span className="font-medium">WhatsApp:</span> 087766887622
              </p>
              <p>
                <span className="font-medium">Instagram:</span> @lksaarrisalahhdykdr
              </p>
              <p>
                <span className="font-medium">Bank:</span> Bank Jatim 6112003337
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8 mt-8">
          {/* Bottom Text */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/80">
            <p>
              © {currentYear} Yayasan Ar-Risalah. Semua hak cipta dilindungi.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-background transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <p className="text-background/90 font-medium">
              Sedekah Anda adalah investasi untuk masa depan yang lebih cerah 🌟
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
