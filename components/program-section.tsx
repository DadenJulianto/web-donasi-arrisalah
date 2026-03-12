'use client';

import { Card } from '@/components/ui/card';

export function ProgramSection() {
  const programs = [
    {
      title: 'Finishing Lantai 3',
      description: 'Penyelesaian pembangunan asrama lantai 3 dengan standar kualitas terbaik',
      icon: '🏗️',
    },
    {
      title: 'Fasilitas Santri',
      description: 'Penyediaan fasilitas lengkap untuk kenyamanan dan mendukung pendidikan santri',
      icon: '🛏️',
    },
    {
      title: 'Material Bangunan',
      description: 'Kebutuhan material konstruksi berkualitas tinggi untuk struktur bangunan yang kokoh',
      icon: '🧱',
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Program Pembangunan Asrama
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dana donasi Anda akan digunakan untuk mendukung tiga pilar utama pembangunan asrama santri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="bg-card border border-primary/20 hover:border-primary/40 transition-all duration-300 p-8 rounded-xl shadow-sm hover:shadow-md"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {program.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
