import { ArrowRight } from 'lucide-react';
import { industries } from '@/config/brand';
import { getIcon } from '@/lib/icons';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function IndustryCards() {
  return (
    <Section id="solutions" className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Industries</SectionLabel>
        <SectionHeading className="mt-4">
          One ERP. <span className="text-gradient">Multiple Businesses.</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Sigma ERP adapts to the way different industries work — from pharma
          to wholesale, retail to distribution.
        </p>
      </div>

      <div className="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => {
          const Icon = getIcon(ind.icon);
          return (
            <div
              key={ind.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-card"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-500" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{ind.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {ind.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
