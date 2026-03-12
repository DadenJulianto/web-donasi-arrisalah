import { HeroSection } from '@/components/hero-section';
import { HadithSection } from '@/components/hadith-section';
import { ProgramSection } from '@/components/program-section';
import { ProgressSection } from '@/components/progress-section';
import { DonationMethodsSection } from '@/components/donation-methods-section';
import { DonationFormSection } from '@/components/donation-form-section';
import { DonorListSection } from '@/components/donor-list-section';
import { UsageHistorySection } from '@/components/usage-history-section';
import { ContactSection } from '@/components/contact-section';
import { FooterSection } from '@/components/footer-section';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <HadithSection />
      <ProgramSection />
      <ProgressSection />
      <DonationMethodsSection />
      <DonationFormSection />
      <DonorListSection />
      <UsageHistorySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
