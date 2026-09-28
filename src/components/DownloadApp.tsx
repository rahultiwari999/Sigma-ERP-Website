import { BarChart3, Boxes, FileCheck2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { appRelease } from '@/config/brand';

function WindowsLogo() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 4.4 10.4 3.2v8.1H1.5V4.4Zm10.3-1.4L22.5 1.5v9.8H11.8V3Zm-10.3 9.7h8.9v8.1l-8.9-1.3v-6.8Zm10.3 0h10.7v9.8l-10.7-1.5v-8.3Z" />
    </svg>
  );
}

export function DownloadApp() {
  function triggerDownload() {
    const link = document.createElement('a');
    link.href = appRelease.downloadUrl;
    link.download = 'SigmaERP-Setup-v1.0.0.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section id="download" className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-[#f3f7ff] to-cyan-50/70" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-75"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        fill="none"
      >
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
          <path d="M-20 130h135l34 34h86m-235 205h102l36-36h85" stroke="#4f46e5" strokeOpacity=".42" />
          <path d="M1460 145h-40l-22 22h-26m88 201h-40l-22-22h-24" stroke="#0891b2" strokeOpacity=".42" />
          <path d="M0 565h120l28-28h88m1224-42h-38l-18 18h-14" stroke="#4f46e5" strokeDasharray="3 9" strokeOpacity=".32" />
        </g>
        <g fill="#f3f7ff" strokeWidth="1.8">
          <circle cx="149" cy="164" r="3.5" stroke="#4f46e5" />
          <circle cx="138" cy="333" r="3.5" stroke="#4f46e5" />
          <circle cx="1398" cy="167" r="3.5" stroke="#0891b2" />
          <circle cx="1398" cy="346" r="3.5" stroke="#0891b2" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal flex flex-col items-center text-center">
          <img
            src="/icon.png"
            alt="Sigma ERP app icon"
            className="h-52 w-52 object-contain mix-blend-multiply"
          />
          <Button variant="primary" size="lg" className="mt-6 w-full max-w-xs !rounded-lg" onClick={triggerDownload}>
            <WindowsLogo />
            Download for Windows
          </Button>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
            Windows 10 &amp; 11 (64-bit) · {appRelease.version}
          </p>
        </div>

        <div className="reveal lg:pl-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Sigma ERP desktop
          </span>
          <h2 className="mt-4 text-3xl font-bold !leading-[1.2] text-slate-950 sm:text-4xl lg:text-[2.75rem]">
            Billing, Stock and Reports in One Application.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Sigma ERP helps you handle everyday business tasks, from GST billing and supplier purchases to inventory tracking and clear business reports.
          </p>

          <div className="mt-7 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-white text-brand-600 shadow-sm">
                <FileCheck2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">GST billing and invoices</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">Create customer invoices with clear tax details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-100 bg-white text-cyan-700 shadow-sm">
                <ShoppingCart className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Purchases and suppliers</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">Keep supplier records and purchase activity together.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-100 bg-white text-cyan-700 shadow-sm">
                <Boxes className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Inventory and stock tracking</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">Follow stock levels as purchases and sales are recorded.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-white text-emerald-700 shadow-sm">
                <BarChart3 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Sales insights and reports</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">Review business activity from one clear overview.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
