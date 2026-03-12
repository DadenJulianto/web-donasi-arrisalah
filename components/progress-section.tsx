'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ProgressSection() {
  // Example data - will be replaced with Google Sheets integration
  const targetAmount = 300000000;
  const collectedAmount = 52450000;
  const progressPercentage = (collectedAmount / targetAmount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="w-full py-12 md:py-20 bg-primary/5">
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
          <Card className="bg-card border border-primary/20 p-8 md:p-12 rounded-2xl shadow-lg">
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
                  {formatCurrency(targetAmount - collectedAmount)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
