import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>FAQ</SectionLabel>
        <SectionHeading className="mt-4">
          Frequently Asked{' '}
          <span className="text-gradient">Questions</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Everything you need to know about Sigma ERP. Still have questions?
          Book a demo and we will walk you through.
        </p>
      </div>

      <div className="reveal mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen ? 'border-brand-200 shadow-soft' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900 sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
