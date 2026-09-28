import {
  Search, Plus, Trash2, Printer, Download, IndianRupee,
  Package, AlertTriangle, Calendar, Truck, TrendingUp,
  FileText, Percent, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

/**
 * Feature-specific UI mockups for the FeatureShowcase section.
 * Each renders a realistic mini-UI for the corresponding module.
 * Swap with real screenshots later by replacing <FeatureMockup type="..." />
 * with an <img> — the surrounding layout stays unchanged.
 */

function BillingMockup() {
  const items = [
    { name: 'Paracetamol 500mg (Box of 100)', qty: 5, rate: 350, tax: 5 },
    { name: 'Cough Syrup 100ml', qty: 10, rate: 85, tax: 12 },
    { name: 'Vitamin C Tablets (Strip of 10)', qty: 20, rate: 45, tax: 12 },
  ];
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const taxAmt = items.reduce((s, i) => s + i.qty * i.rate * (i.tax / 100), 0);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="text-xs font-bold text-slate-700">Create Invoice · INV-2452</p>
        <div className="flex gap-1.5">
          <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[9px] text-slate-500"><Printer className="h-3 w-3" /> Print</button>
          <button className="flex items-center gap-1 rounded-lg bg-brand-600 px-2 py-1 text-[9px] text-white"><Download className="h-3 w-3" /> Save</button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5">
            <p className="text-[8px] text-slate-400">Customer</p>
            <p className="text-[10px] font-semibold text-slate-700">Sharma Medical Store</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5">
            <p className="text-[8px] text-slate-400">Date</p>
            <p className="text-[10px] font-semibold text-slate-700">06 Sep 2026</p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-400">
          <Search className="h-3 w-3" /> Search products to add...
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-50 text-[8px] uppercase text-slate-400">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">Product</th>
                <th className="px-2 py-1.5 text-right font-medium">Qty</th>
                <th className="px-2 py-1.5 text-right font-medium">Rate</th>
                <th className="px-2 py-1.5 text-right font-medium">GST</th>
                <th className="px-2 py-1.5 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.name} className="border-t border-slate-50 text-[10px]">
                  <td className="px-2 py-1.5 text-slate-600">{it.name}</td>
                  <td className="px-2 py-1.5 text-right text-slate-600">{it.qty}</td>
                  <td className="px-2 py-1.5 text-right text-slate-600">₹{it.rate}</td>
                  <td className="px-2 py-1.5 text-right text-brand-600">{it.tax}%</td>
                  <td className="px-2 py-1.5 text-right font-semibold text-slate-800">₹{(it.qty * it.rate).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-end">
          <div className="w-40 space-y-1 text-[10px]">
            <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-slate-500"><span>CGST + SGST</span><span>₹{Math.round(taxAmt).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between border-t border-slate-100 pt-1 font-bold text-slate-800"><span>Total</span><span>₹{Math.round(subtotal + taxAmt).toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryMockup() {
  const products = [
    { name: 'Paracetamol 500mg', stock: 1240, unit: 'Box', status: 'ok', batch: 'B-2026-03' },
    { name: 'Amoxicillin 250mg', stock: 12, unit: 'Box', status: 'low', batch: 'B-2026-01' },
    { name: 'Cough Syrup 100ml', stock: 890, unit: 'Btl', status: 'ok', batch: 'B-2026-02' },
    { name: 'Insulin Pen', stock: 45, unit: 'Pcs', status: 'medium', batch: 'B-2026-04' },
  ];
  const statusMap: Record<string, { label: string; cls: string }> = {
    ok: { label: 'In Stock', cls: 'bg-emerald-50 text-emerald-700' },
    low: { label: 'Low Stock', cls: 'bg-rose-50 text-rose-700' },
    medium: { label: 'Medium', cls: 'bg-amber-50 text-amber-700' },
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="text-xs font-bold text-slate-700">Inventory Overview</p>
        <span className="flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-[9px] font-semibold text-brand-700"><Plus className="h-3 w-3" /> Add Product</span>
      </div>
      <div className="p-4">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: 'Total Products', val: '248', icon: Package, color: 'text-brand-600 bg-brand-50' },
            { label: 'Low Stock', val: '7', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50' },
            { label: 'Stock Value', val: '₹23.9L', icon: IndianRupee, color: 'text-emerald-600 bg-emerald-50' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-slate-100 p-2">
              <span className={`mb-1 flex h-6 w-6 items-center justify-center rounded-md ${s.color}`}><s.icon className="h-3 w-3" /></span>
              <p className="text-[8px] text-slate-400">{s.label}</p>
              <p className="text-xs font-bold text-slate-800">{s.val}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-50 text-[8px] uppercase text-slate-400">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">Product</th>
                <th className="px-2 py-1.5 text-left font-medium">Batch</th>
                <th className="px-2 py-1.5 text-right font-medium">Stock</th>
                <th className="px-2 py-1.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} className="border-t border-slate-50 text-[10px]">
                  <td className="px-2 py-1.5 text-slate-600">{p.name}</td>
                  <td className="px-2 py-1.5 text-slate-400">{p.batch}</td>
                  <td className="px-2 py-1.5 text-right text-slate-600">{p.stock} {p.unit}</td>
                  <td className="px-2 py-1.5 text-right">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${statusMap[p.status].cls}`}>{statusMap[p.status].label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

function PurchaseMockup() {
  const purchases = [
    { id: 'PO-1042', supplier: 'Cipla Pharma Ltd', items: 12, total: '₹1,24,500', date: '04 Sep' },
    { id: 'PO-1041', supplier: 'Sun Pharma Distributor', items: 8, total: '₹87,200', date: '02 Sep' },
    { id: 'PO-1040', supplier: 'Mankind Suppliers', items: 15, total: '₹2,10,000', date: '28 Aug' },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="text-xs font-bold text-slate-700">Purchase Orders</p>
        <span className="flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-[9px] font-semibold text-brand-700"><Plus className="h-3 w-3" /> New PO</span>
      </div>
      <div className="p-4">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
            <p className="text-[8px] text-slate-400">Total Purchases (MTD)</p>
            <p className="text-sm font-bold text-slate-800">₹5,14,200</p>
            <p className="text-[8px] text-rose-500 flex items-center gap-0.5"><ArrowDownRight className="h-2 w-2" /> 4.1% vs last month</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
            <p className="text-[8px] text-slate-400">Pending POs</p>
            <p className="text-sm font-bold text-slate-800">3 Orders</p>
            <p className="text-[8px] text-amber-500">Awaiting delivery</p>
          </div>
        </div>
        <div className="space-y-2">
          {purchases.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-50 text-accent-600"><Truck className="h-3.5 w-3.5" /></span>
                <div>
                  <p className="text-[10px] font-semibold text-slate-700">{p.id} · {p.supplier}</p>
                  <p className="text-[8px] text-slate-400">{p.items} items · {p.date}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-800">{p.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesMockup() {
  const data = [35, 48, 42, 58, 52, 68, 62, 75, 70, 82, 78, 88];
  const customers = [
    { name: 'Sharma Medical', outstanding: '₹24,500', status: 'Overdue' },
    { name: 'Krishna Distributors', outstanding: '₹0', status: 'Paid' },
    { name: 'Aggarwal General', outstanding: '₹9,750', status: 'Pending' },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="text-xs font-bold text-slate-700">Sales Dashboard</p>
        <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600"><ArrowUpRight className="h-3 w-3" /> +12.5%</span>
      </div>
      <div className="p-4">
        <div className="mb-3 rounded-lg border border-slate-100 bg-gradient-to-br from-brand-50 to-white p-3">
          <p className="text-[8px] text-slate-400">Total Sales (MTD)</p>
          <p className="text-lg font-bold text-slate-800">₹8,32,400</p>
          <div className="mt-2 flex h-12 items-end gap-1">
            {data.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-brand-400/60" style={{ height: `${(v / 88) * 100}%` }} />
            ))}
          </div>
        </div>
        <p className="mb-1.5 text-[10px] font-semibold text-slate-700">Customer Outstanding</p>
        <div className="space-y-1.5">
          {customers.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-slate-100 p-2">
              <span className="text-[10px] text-slate-600">{c.name}</span>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-800">{c.outstanding}</span>
                <span className={`ml-2 inline-block rounded-full px-1.5 py-0.5 text-[7px] font-semibold ${c.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : c.status === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GstMockup() {
  const taxBreakdown = [
    { rate: '5%', taxable: 245000, cgst: 6125, sgst: 6125 },
    { rate: '12%', taxable: 410000, cgst: 24600, sgst: 24600 },
    { rate: '18%', taxable: 177400, cgst: 15966, sgst: 15966 },
  ];
  const total = taxBreakdown.reduce((s, t) => s + t.cgst + t.sgst, 0);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><FileText className="h-3.5 w-3.5 text-brand-600" /> GST Tax Summary</p>
        <span className="text-[9px] text-slate-400">September 2026</span>
      </div>
      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-50 text-[8px] uppercase text-slate-400">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">GST Rate</th>
                <th className="px-2 py-1.5 text-right font-medium">Taxable</th>
                <th className="px-2 py-1.5 text-right font-medium">CGST</th>
                <th className="px-2 py-1.5 text-right font-medium">SGST</th>
              </tr>
            </thead>
            <tbody>
              {taxBreakdown.map((t) => (
                <tr key={t.rate} className="border-t border-slate-50 text-[10px]">
                  <td className="px-2 py-1.5"><span className="flex items-center gap-1 font-semibold text-slate-700"><Percent className="h-2.5 w-2.5 text-brand-500" />{t.rate}</span></td>
                  <td className="px-2 py-1.5 text-right text-slate-600">₹{t.taxable.toLocaleString('en-IN')}</td>
                  <td className="px-2 py-1.5 text-right text-slate-600">₹{t.cgst.toLocaleString('en-IN')}</td>
                  <td className="px-2 py-1.5 text-right text-slate-600">₹{t.sgst.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-50 p-3">
          <div>
            <p className="text-[8px] text-slate-400">Total Tax Payable</p>
            <p className="text-lg font-bold text-brand-700">₹{total.toLocaleString('en-IN')}</p>
          </div>
          <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">GST Ready</span>
        </div>
      </div>
    </div>
  );
}

function ReportsMockup() {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const sales = [52, 61, 58, 72, 68, 82];
  const profit = [18, 22, 20, 28, 26, 34];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><TrendingUp className="h-3.5 w-3.5 text-brand-600" /> Business Performance</p>
        <span className="flex items-center gap-1 text-[9px] text-slate-400"><Calendar className="h-3 w-3" /> Last 6 months</span>
      </div>
      <div className="p-4">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-slate-100 p-2.5">
            <p className="text-[8px] text-slate-400">Net Profit</p>
            <p className="text-sm font-bold text-emerald-600">₹4,28,500</p>
            <p className="text-[8px] text-emerald-500">+22.4% growth</p>
          </div>
          <div className="rounded-lg border border-slate-100 p-2.5">
            <p className="text-[8px] text-slate-400">Profit Margin</p>
            <p className="text-sm font-bold text-brand-700">34.2%</p>
            <p className="text-[8px] text-slate-400">Healthy</p>
          </div>
        </div>
        {/* Dual-line chart */}
        <div className="relative h-32 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
          <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rptGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rptGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* grid lines */}
            {[20, 40, 60].map((y) => (
              <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
            ))}
            {/* sales area */}
            <polygon
              points={`0,80 ${sales.map((v, i) => `${(i / (sales.length - 1)) * 200},${80 - (v / 90) * 70}`).join(' ')} 200,80`}
              fill="url(#rptGrad1)"
            />
            <polyline
              points={sales.map((v, i) => `${(i / (sales.length - 1)) * 200},${80 - (v / 90) * 70}`).join(' ')}
              fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
            />
            {/* profit area */}
            <polygon
              points={`0,80 ${profit.map((v, i) => `${(i / (profit.length - 1)) * 200},${80 - (v / 90) * 70}`).join(' ')} 200,80`}
              fill="url(#rptGrad2)"
            />
            <polyline
              points={profit.map((v, i) => `${(i / (profit.length - 1)) * 200},${80 - (v / 90) * 70}`).join(' ')}
              fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-[9px]">
          <span className="flex items-center gap-1 text-slate-500"><span className="h-2 w-2 rounded-full bg-brand-500" /> Sales</span>
          <span className="flex items-center gap-1 text-slate-500"><span className="h-2 w-2 rounded-full bg-accent-400" /> Profit</span>
        </div>
      </div>
    </div>
  );
}

const mockups = {
  billing: BillingMockup,
  inventory: InventoryMockup,
  purchase: PurchaseMockup,
  sales: SalesMockup,
  gst: GstMockup,
  reports: ReportsMockup,
};

export function FeatureMockup({ type }: { type: string }) {
  const Comp = mockups[type as keyof typeof mockups] ?? BillingMockup;
  return <Comp />;
}
