import { Check, ArrowRight } from 'lucide-react';
import { features } from '@/config/brand';
import { getIcon } from '@/lib/icons';
import { Section, SectionLabel } from '@/components/ui/Section';
import { FeatureMockup } from '@/components/FeatureMockup';

export function FeatureShowcase() {
  return (
    <Section id="features" className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Feature Showcase</SectionLabel>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Powerful Tools for Every Part of Your Business
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Each module in Sigma ERP is designed to be powerful on its own and
          even better when connected together.
        </p>
      </div>

      <div className="mt-16 space-y-20 lg:space-y-28">
        {features.map((feature) => {
          const Icon = getIcon(feature.icon);
          return (
            <div
              key={feature.id}
              id={feature.id}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                feature.reverse ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Text */}
              <div className="reveal">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  <Icon className="h-3.5 w-3.5" />
                  {feature.category}
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-lg font-medium text-brand-600">
                  {feature.subtitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#demo"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Mockup */}
              <div className="reveal">
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-100/40 to-accent-100/30 blur-2xl" />
                  <FeatureMockup type={feature.mockup} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
