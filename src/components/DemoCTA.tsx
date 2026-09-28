import { PlayCircle, MessageCircle } from 'lucide-react';
import { contact } from '@/config/brand';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function DemoCTA() {
  const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    'Hi, I would like to know more about Sigma ERP.'
  )}`;

  return (
    <Section id="demo-cta" className="py-20 lg:py-28">
      <div className="reveal relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-6 py-16 text-center shadow-elevated lg:px-16">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-400/30 blur-3xl" />

        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          See What Sigma ERP Can Do For Your Business
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-brand-100">
          Book a personalized demo and discover how Sigma ERP can simplify your
          everyday business operations.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="white"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <PlayCircle className="h-4 w-4" />
            Book a Demo
          </Button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-7 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Talk on WhatsApp
          </a>
        </div>
      </div>
    </Section>
  );
}
