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
          
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-4 leading-relaxed">
            "Dari Anas dikatakan, Wahai Rasulullah, sedekah apa yang nilainya paling utama? Rasul menjawab: Sedekah di bulan Ramadhan."
          </p>
          
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            (HR At-Tirmidzi)
          </p>

          <div className="mt-8 pt-8 border-t border-primary/20">
            <p className="text-muted-foreground text-sm md:text-base">
              Sedekah jariyah adalah investasi spiritual yang tidak pernah putus. Dengan mendukung pembangunan asrama santri, Anda membantu membentuk pemimpin yang berakhlak mulia dan berpengetahuan luas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
