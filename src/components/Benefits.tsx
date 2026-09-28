import { benefits } from '@/config/brand';
import { getIcon } from '@/lib/icons';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function Benefits() {
  return (
    <Section className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Why Sigma ERP</SectionLabel>
        <SectionHeading className="mt-4">
          Built Around The Way{' '}
          <span className="text-gradient">Your Business Works.</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Sigma ERP is not just software — it is a business partner designed to
          make your daily operations simpler, faster, and more connected.
        </p>
      </div>

      <div className="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => {
          const Icon = getIcon(b.icon);
          return (
            <div
              key={b.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-200 hover:shadow-card"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
