import { productModules } from '@/config/brand';
import { getIcon } from '@/lib/icons';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function ProductOverview() {
  return (
    <Section id="product" className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Product Ecosystem</SectionLabel>
        <SectionHeading className="mt-4">
          Everything Your Business Needs.
          <br /> <span className="text-gradient">In One Place.</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Sigma ERP connects the core operations of your business into one
          unified system — so data flows seamlessly between billing, inventory,
          sales, purchases, and reports.
        </p>
      </div>

      {/* Ecosystem visual */}
      <div className="reveal mt-14">
        <div className="relative mx-auto max-w-4xl">
          {/* Connection lines (decorative) */}
          <div className="absolute inset-0 -z-10 hidden lg:block">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-200/60" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-100/60" />
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {productModules.map((mod) => {
              const Icon = getIcon(mod.icon);
              return (
                <div
                  key={mod.name}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-bold text-slate-900">{mod.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
