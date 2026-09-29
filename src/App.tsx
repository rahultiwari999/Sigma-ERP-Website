import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DownloadApp } from '@/components/DownloadApp';
import { TrustStrip } from '@/components/TrustStrip';
import { ProductOverview } from '@/components/ProductOverview';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { DashboardPreview } from '@/components/DashboardPreview';
import { IndustryCards } from '@/components/IndustryCards';
import { Benefits } from '@/components/Benefits';
import { Comparison } from '@/components/Comparison';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { DemoCTA } from '@/components/DemoCTA';
import { DemoForm } from '@/components/DemoForm';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { AdminPortal } from '@/components/AdminPortal';

function App() {
  // Global scroll-reveal: observe every element with class "reveal"
  useEffect(() => {
    if (window.location.pathname === '/admin') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (window.location.pathname === '/admin/demo') return <AdminPortal demoMode />;
  if (window.location.pathname === '/admin') return <AdminPortal />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <DownloadApp />
        <TrustStrip />
        <ProductOverview />
        <FeatureShowcase />
        <IndustryCards />
        <Benefits />
        <Comparison />
        <Pricing />
        <Testimonials />
        <DemoCTA />
        <DemoForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
