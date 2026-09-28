import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function DashboardPreview() {
  return (
    <Section className="overflow-hidden bg-[#f4f7fc] py-16 lg:py-20">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Product Preview</SectionLabel>
        <SectionHeading className="mt-4">
          Your business, <span className="text-gradient">at a glance.</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Sales, inventory, billing and business performance together in Sigma ERP.
        </p>
      </div>

      <div className="reveal mx-auto mt-10 max-w-6xl sm:mt-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-elevated">
          <img
            src="/sigma-dashboard-preview.svg"
            alt="Sigma ERP sample dashboard with sales, inventory, revenue charts and recent transactions"
            className="block h-auto w-full"
            width="1600"
            height="1000"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
