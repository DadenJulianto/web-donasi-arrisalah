'use client';

export function HadithSection() {
  return (
    <section className="w-full bg-primary/10 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <div className="mb-6">
            <svg className="w-12 h-12 mx-auto text-primary/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 21c3 -1 7 -1 11 -1c4 0 8 0 11 1M3 6c3 -1 7 -1 11 -1c4 0 8 0 11 1M3 12c3 -1 7 -1 11 -1c4 0 8 0 11 1" />
            </svg>
          </div>
          <div className="space-y-6 text-foreground/90 leading-relaxed text-left md:text-center">
            <p className="text-lg md:text-xl font-medium text-foreground">
              Tahukah kamu bahwa amal kebaikan yang dilakukan pada malam <span className="text-primary font-bold">Lailatul Qadr</span> nilainya setara dengan kebaikan selama <span className="underline decoration-primary/40 underline-offset-4">1000 bulan</span>? 
            </p>
            
            <p className="text-sm md:text-base text-muted-foreground">
              Allah SWT berfirman bahwa Lailatul Qadr lebih baik dari seribu bulan. Ini adalah kesempatan besar bagi kita untuk menanam amal yang pahalanya berlipat ganda dan terus mengalir.
            </p>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-sm space-y-4">
              <p className="text-sm md:text-base">
                Dalam momentum Ramadan yang penuh berkah ini, <span className="font-semibold">Pondok Pesantren Darul Hijrah Kediri</span> sedang melaksanakan program penyelesaian pembangunan asrama santri penghafal Al-Qur’an.
              </p>
              
              <p className="text-sm md:text-base font-semibold text-primary">
                Dibutuhkan dana sebesar Rp50.000.000 untuk menyelesaikan pembangunan asrama ini.
              </p>

              <div className="pt-2">
                <p className="text-sm md:text-base italic mb-2">Melalui program ini kami mengajak:</p>
                <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold">
                  Gerakan 1 Kebaikan untuk 1000 Bulan
                </div>
                <p className="text-sm mt-2 text-primary font-medium">Donasi Rp50.000 per orang untuk 1.000 dermawan</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground">
              Bayangkan, setiap ayat yang dibaca, dihafal, dan diamalkan oleh para santri di asrama ini insyaAllah akan menjadi <span className="text-foreground font-medium">amal jariyah</span> yang terus mengalir bagi para donatur.
            </p>

            <p className="text-sm md:text-base">
              Mari menjadi bagian dari 1.000 dermawan yang menghadirkan rumah bagi para penjaga Al-Qur’an.
            </p>

            <p className="text-base md:text-lg font-semibold text-primary pt-4 border-t border-primary/10">
              Semoga setiap rupiah yang kita sedekahkan menjadi pahala yang berlipat, keberkahan hidup, dan tabungan amal hingga akhirat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
