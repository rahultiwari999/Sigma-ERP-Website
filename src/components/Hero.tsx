import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#f5f8ff] px-5 py-16 text-center sm:px-6 sm:py-12">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f6f8ff] via-white to-[#e8f6ff]" />
      <div className="absolute inset-0 z-0 hero-grid" />
      <div className="absolute -left-24 top-[-90px] bottom-[-120px] z-0 w-[42%] -skew-x-[28deg] border-r border-brand-200/70 bg-gradient-to-b from-brand-100/85 via-brand-50/65 to-cyan-50/40" />
      <div className="absolute -right-20 top-[-100px] bottom-[-120px] z-0 w-[34%] -skew-x-[28deg] border-l border-accent-200/70 bg-gradient-to-b from-accent-100/80 via-accent-50/60 to-brand-50/45" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        fill="none"
      >
        <path className="hero-circuit-flow" d="M0 120h76l27 27h98l34 34h56" stroke="#4f46e5" strokeOpacity=".55" strokeWidth="1.5" />
        <path className="hero-circuit-flow" d="M0 295h104l30-30h67l25-25h68" stroke="#0891b2" strokeOpacity=".5" strokeWidth="1.5" />
        <path className="hero-circuit-flow" d="M1440 150h-86l-30 30h-74l-32 32h-68" stroke="#0891b2" strokeOpacity=".55" strokeWidth="1.5" />
        <path className="hero-circuit-flow" d="M1440 326h-112l-29-29h-72l-24-24h-61" stroke="#4f46e5" strokeOpacity=".5" strokeWidth="1.5" />
        <path className="hero-circuit-flow" d="M-30 590C125 590 118 485 267 485s156 78 267 78 117-107 228-107" stroke="#818cf8" strokeOpacity=".4" strokeWidth="1.5" />
        <path className="hero-circuit-flow" d="M1470 535c-150 0-145-100-290-100s-151 93-262 93" stroke="#06b6d4" strokeOpacity=".4" strokeWidth="1.5" />
        <path d="M0 650h210l48-48h126m105 0h88l42-42h122m350 82h112l55-55h182" stroke="#4f46e5" strokeDasharray="3 8" strokeOpacity=".3" />
        <circle cx="103" cy="147" r="4" fill="#f5f8ff" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="221" cy="181" r="4" fill="#f5f8ff" stroke="#0891b2" strokeWidth="2" />
        <circle cx="1320" cy="180" r="4" fill="#f5f8ff" stroke="#0891b2" strokeWidth="2" />
        <circle cx="1227" cy="297" r="4" fill="#f5f8ff" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="267" cy="485" r="5" fill="white" stroke="#818cf8" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="534" cy="563" r="5" fill="white" stroke="#06b6d4" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="962" cy="528" r="5" fill="white" stroke="#06b6d4" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="1180" cy="435" r="5" fill="white" stroke="#818cf8" strokeOpacity=".7" strokeWidth="2" />
      </svg>
      <div aria-hidden="true" className="hero-copy-softener" />
      <div className="absolute left-5 top-[15%] z-10 hidden w-[236px] rounded-xl border border-white/90 bg-white/90 p-5 text-left shadow-[0_18px_50px_-24px_rgba(41,65,130,0.35)] backdrop-blur-sm xl:block">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">GST billing</p>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">Ready</span>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-800">Invoice created</p>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span className="text-slate-500">INV-1042</span>
          <span className="font-semibold text-slate-700">GST included</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">Billing, connected to your books</p>
      </div>

      <div className="absolute left-7 bottom-[9%] z-10 hidden w-[176px] rounded-xl border border-white/90 bg-white/90 p-4 text-left shadow-[0_18px_50px_-24px_rgba(41,65,130,0.35)] backdrop-blur-sm xl:block">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Sales reports</p>
        <p className="mt-2 text-sm font-semibold text-slate-800">See what is moving</p>
        <div className="mt-3 flex h-9 items-end gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-t bg-brand-200" />
          <span className="h-5 w-3 rounded-t bg-brand-300" />
          <span className="h-4 w-3 rounded-t bg-cyan-300" />
          <span className="h-7 w-3 rounded-t bg-brand-400" />
          <span className="h-6 w-3 rounded-t bg-cyan-400" />
          <span className="h-9 w-3 rounded-t bg-brand-500" />
          <span className="ml-auto self-center text-[10px] font-medium text-emerald-600">Trends</span>
        </div>
      </div>

      <div className="absolute right-7 top-[24%] z-10 hidden w-[176px] rounded-xl border border-white/90 bg-white/90 p-4 text-left shadow-[0_18px_50px_-24px_rgba(41,65,130,0.35)] backdrop-blur-sm xl:block">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Purchases</p>
        <p className="mt-2 text-sm font-semibold text-slate-800">Every order in sync</p>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <span className="h-2 w-2 rounded-full bg-cyan-500" />
          <span className="text-[11px] text-slate-500">Suppliers to stock, connected</span>
        </div>
      </div>

      <div className="absolute right-5 top-[70%] z-10 hidden w-[230px] -translate-y-1/2 rounded-xl border border-white/90 bg-white/90 p-5 text-left shadow-[0_18px_50px_-24px_rgba(41,65,130,0.35)] backdrop-blur-sm xl:block">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Live business view</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Stock overview</p>
            <p className="mt-1 text-xs text-slate-500">Inventory at a glance</p>
          </div>
          <div className="flex h-9 items-end gap-1" aria-hidden="true">
            <span className="h-4 w-1.5 rounded-t bg-cyan-200" />
            <span className="h-6 w-1.5 rounded-t bg-cyan-300" />
            <span className="h-5 w-1.5 rounded-t bg-brand-300" />
            <span className="h-9 w-1.5 rounded-t bg-brand-500" />
            <span className="h-7 w-1.5 rounded-t bg-cyan-400" />
          </div>
        </div>
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-3">
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-slate-500"><span>Products in stock</span><span>Updated</span></div>
            <div className="h-1.5 rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-cyan-500" /></div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-slate-500"><span>Sales reports</span><span>Clear</span></div>
            <div className="h-1.5 rounded-full bg-slate-100"><div className="h-full w-5/6 rounded-full bg-brand-500" /></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 shadow-soft sm:text-sm">
          <Sparkles className="h-4 w-4 shrink-0" />
          The smarter way to run your business
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[60px]">
          Run Your Entire Business
          <br className="hidden sm:block" />
          {' '}From <span className="text-gradient">Sigma ERP</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Create GST-ready invoices, manage purchases, and keep stock and sales in sync in one connected workspace.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          See business trends clearly and know what needs attention next.
        </p>

        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 sm:text-sm">
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> GST invoicing</span>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Live stock tracking</span>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Sales insights</span>
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="#download"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 text-sm font-bold text-white shadow-soft transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </a>
          <Button
            variant="secondary"
            size="sm"
            className="h-10 !rounded-lg px-7"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <PlayCircle className="h-4 w-4" />
            Book a Demo
          </Button>
        </div>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Built for modern Indian businesses
        </p>
      </div>
    </section>
  );
}
