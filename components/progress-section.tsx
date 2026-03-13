'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { fetchProgress, DonationProgress } from '@/lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

export function ProgressSection() {
  const [progress, setProgress] = useState<DonationProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProgress() {
      try {
        setLoading(true);
        const data = await fetchProgress();
        setProgress(data);
        setError(null);
      } catch (err) {
        setError('Gagal mengambil data progres');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const targetAmount = progress?.target || 0;
  const collectedAmount = progress?.terkumpul || 0;
  const progressPercentage = targetAmount > 0 ? (collectedAmount / targetAmount) * 100 : 0;

  return (
    <section id="progress" className="w-full py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Progres Donasi
          </h2>
          <p className="text-lg text-muted-foreground">
            Lihat sejauh mana kita telah berkontribusi bersama
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border border-primary/20 p-8 md:p-12 rounded-2xl shadow-lg min-h-[300px] flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground">Memuat data progres...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <AlertCircle className="w-10 h-10 text-destructive" />
                <p className="text-lg font-semibold">{error}</p>
                <p className="text-sm text-muted-foreground">Silakan segarkan halaman.</p>
              </div>
            ) : !progress ? (
              <div className="text-center">
                <p className="text-muted-foreground">Data progres belum tersedia.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Dana Terkumpul
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className="h-4 bg-primary/10 rounded-full"
                  />
                </div>

                {/* Amount Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-1">
                      Terkumpul
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary break-words">
                      {formatCurrency(collectedAmount)}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-sm text-muted-foreground mb-1">
                      Target Dana
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground break-words">
                      {formatCurrency(targetAmount)}
                    </p>
                  </div>
                </div>

                {/* Remaining Amount */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Dana yang Dibutuhkan
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-primary">
                    {formatCurrency(Math.max(0, targetAmount - collectedAmount))}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
