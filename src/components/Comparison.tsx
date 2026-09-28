import { X, Check, ArrowRight } from 'lucide-react';
import { beforeAfter } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function Comparison() {
  return (
    <Section className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Transformation</SectionLabel>
        <SectionHeading className="mt-4">
          From Business Chaos to{' '}
          <span className="text-gradient">Business Control</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          See the difference Sigma ERP makes to your everyday operations.
        </p>
      </div>

      <div className="reveal mt-14 grid gap-6 lg:grid-cols-2">
        {/* BEFORE */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <X className="h-5 w-5" strokeWidth={3} />
            </span>
            <h3 className="text-xl font-bold text-slate-700">Before Sigma ERP</h3>
          </div>
          <ul className="space-y-4">
            {beforeAfter.before.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-500">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-card">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-brand-200/20 blur-3xl" />
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <h3 className="text-xl font-bold text-slate-900">After Sigma ERP</h3>
          </div>
          <ul className="space-y-4">
            {beforeAfter.after.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#demo"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Start your transformation
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}
