import { ArrowRight, PlayCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <Section className="py-20 lg:py-28">
      <div className="reveal relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-center lg:px-16 lg:py-24">
        {/* Background treatment */}
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-600/40 via-brand-500/20 to-accent-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />

        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          Ready to Take Control of Your Business?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
          Bring billing, inventory, sales and business management together
          with Sigma ERP.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="white"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <PlayCircle className="h-4 w-4" />
            Book a Demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
