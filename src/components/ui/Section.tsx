import { type ReactNode } from 'react';

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-bold tracking-tight text-slate-900 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
