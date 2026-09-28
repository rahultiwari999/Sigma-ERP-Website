import { trustItems } from '@/config/brand';
import { getIcon } from '@/lib/icons';

export function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.label}
                className="reveal flex items-center gap-3 justify-center sm:justify-start"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
