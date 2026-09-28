import { Quote } from 'lucide-react';
import { testimonials } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function Testimonials() {
  return (
    <Section className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Testimonials</SectionLabel>
        <SectionHeading className="mt-4">
          What Businesses Say About{' '}
          <span className="text-gradient">Sigma ERP</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Real feedback from businesses using Sigma ERP to manage their daily
          operations. (Placeholder testimonials — replace with real reviews.)
        </p>
      </div>

      <div className="reveal mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-card"
          >
            <Quote className="h-8 w-8 text-brand-200" fill="currentColor" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
              "{t.quote}"
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">
                  {t.role} · {t.business}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
