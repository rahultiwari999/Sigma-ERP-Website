import {
  TrendingUp, TrendingDown, Boxes, Receipt, AlertTriangle,
  IndianRupee, ArrowUpRight, MoreHorizontal,
} from 'lucide-react';

/**
 * A realistic ERP dashboard mockup rendered entirely in JSX/CSS.
 * Replace the data arrays below with real screenshot images later
 * by swapping <DashboardMockup /> for an <img> — the layout wrapper
 * stays the same.
 */

const kpis = [
  { label: 'Revenue', value: '₹12,48,500', change: '+18.2%', up: true, icon: IndianRupee },
  { label: 'Sales', value: '₹8,32,400', change: '+12.5%', up: true, icon: TrendingUp },
  { label: 'Purchases', value: '₹5,14,200', change: '-4.1%', up: false, icon: TrendingDown },
  { label: 'Inventory Value', value: '₹23,91,750', change: '+6.8%', up: true, icon: Boxes },
];

const chartData = [42, 55, 48, 67, 59, 78, 72, 85, 79, 92, 88, 96];
const chartData2 = [30, 38, 35, 45, 40, 52, 48, 58, 55, 62, 60, 68];

const recentInvoices = [
  { id: 'INV-2451', party: 'Sharma Medical Store', amount: '₹24,500', status: 'Paid' },
  { id: 'INV-2450', party: 'Krishna Distributors', amount: '₹18,200', status: 'Pending' },
  { id: 'INV-2449', party: 'Aggarwal General Store', amount: '₹9,750', status: 'Paid' },
  { id: 'INV-2448', party: 'Patel Pharma Wholesale', amount: '₹42,100', status: 'Overdue' },
];

const topProducts = [
  { name: 'Paracetamol 500mg', sold: 1240, pct: 96 },
  { name: 'Cough Syrup 100ml', sold: 890, pct: 72 },
  { name: 'Vitamin C Tablets', sold: 670, pct: 54 },
];

const alerts = [
  { text: 'Amoxicillin 250mg — Low stock (12 units)', level: 'high' },
  { text: 'Cough Syrup batch EXP-2026-03 expiring soon', level: 'medium' },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 36;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(' ');
  const areaPoints = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function BarChart({ data, data2 }: { data: number[]; data2: number[] }) {
  const max = Math.max(...data, ...data2);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex w-full flex-1 items-end gap-0.5">
            <div
              className="flex-1 rounded-t bg-brand-500 transition-all duration-700"
              style={{ height: `${(v / max) * 100}%` }}
            />
            <div
              className="flex-1 rounded-t bg-accent-400 transition-all duration-700"
              style={{ height: `${(data2[i] / max) * 100}%` }}
            />
          </div>
          <span className="text-[8px] text-slate-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
        </div>
      ))}
    </div>
  );
}

const statusColors: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Overdue: 'bg-rose-50 text-rose-700',
};

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-elevated">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-300" />
          <div className="h-3 w-3 rounded-full bg-amber-300" />
          <div className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-lg bg-white px-3 py-1 text-[10px] text-slate-400 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          app.sigmaerp.in/dashboard
        </div>
      </div>

      {/* App body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-44 shrink-0 border-r border-slate-100 bg-slate-50/50 p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 px-1">
            <img src="/image.png" alt="Sigma ERP Ultimate" className="h-7 w-auto max-w-[110px] object-contain" />
          </div>
          <nav className="flex flex-col gap-0.5">
            {[
              { label: 'Dashboard', active: true },
              { label: 'Sales', active: false },
              { label: 'Purchases', active: false },
              { label: 'Inventory', active: false },
              { label: 'Customers', active: false },
              { label: 'Suppliers', active: false },
              { label: 'Reports', active: false },
              { label: 'GST', active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
                  item.active ? 'bg-brand-100 text-brand-700' : 'text-slate-500'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.active ? 'bg-brand-500' : 'bg-slate-300'}`} />
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Header row */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">Business Overview</p>
              <p className="text-[10px] text-slate-400">September 2026 · Welcome back, Rajesh</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] text-slate-500 sm:flex">
                Last 12 months
              </div>
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <kpi.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className={`flex items-center gap-0.5 text-[9px] font-semibold ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {kpi.up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-[9px] font-medium text-slate-400">{kpi.label}</p>
                <p className="text-sm font-bold text-slate-800">{kpi.value}</p>
                <div className="mt-1">
                  <Sparkline data={chartData} color={kpi.up ? '#6366f1' : '#f43f5e'} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts + side panel */}
          <div className="mt-3 grid gap-2.5 lg:grid-cols-3">
            {/* Sales vs Purchase chart */}
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft lg:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700">Sales vs Purchases</p>
                <div className="flex items-center gap-3 text-[9px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-brand-500" /> Sales
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-accent-400" /> Purchases
                  </span>
                </div>
              </div>
              <BarChart data={chartData} data2={chartData2} />
            </div>

            {/* Outstanding + alerts */}
            <div className="flex flex-col gap-2.5">
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft">
                <p className="mb-2 text-xs font-semibold text-slate-700">Outstanding Payments</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Receivable', val: '₹3,24,500', color: 'text-emerald-600' },
                    { label: 'Payable', val: '₹1,87,200', color: 'text-rose-600' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{row.label}</span>
                      <span className={`text-xs font-bold ${row.color}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                </div>
                <p className="mt-1 text-[8px] text-slate-400">63% of receivables collected</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <p className="text-xs font-semibold text-slate-700">Low Stock Alerts</p>
                </div>
                <div className="space-y-1">
                  {alerts.map((a) => (
                    <div key={a.text} className="flex items-start gap-1.5">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${a.level === 'high' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                      <span className="text-[9px] leading-tight text-slate-500">{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent invoices + top products */}
          <div className="mt-3 grid gap-2.5 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft lg:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700">Recent Invoices</p>
                <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-[8px] uppercase tracking-wider text-slate-400">
                      <th className="pb-1.5 font-medium">Invoice</th>
                      <th className="pb-1.5 font-medium">Party</th>
                      <th className="pb-1.5 text-right font-medium">Amount</th>
                      <th className="pb-1.5 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-slate-50 last:border-0">
                        <td className="py-1.5 text-[10px] font-medium text-brand-600">{inv.id}</td>
                        <td className="py-1.5 text-[10px] text-slate-600">{inv.party}</td>
                        <td className="py-1.5 text-right text-[10px] font-semibold text-slate-800">{inv.amount}</td>
                        <td className="py-1.5 text-right">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${statusColors[inv.status]}`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-soft">
              <p className="mb-2 text-xs font-semibold text-slate-700">Top Products</p>
              <div className="space-y-2.5">
                {topProducts.map((p) => (
                  <div key={p.name}>
                    <div className="mb-1 flex items-center justify-between text-[10px]">
                      <span className="text-slate-600">{p.name}</span>
                      <span className="font-semibold text-slate-800">{p.sold}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
