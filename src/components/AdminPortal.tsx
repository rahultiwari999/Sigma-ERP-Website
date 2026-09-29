import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Check,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  Settings,
} from 'lucide-react';
import { appRelease, brand, pricingPlans } from '@/config/brand';
import { apiFetch } from '@/lib/api';

type LeadStatus = 'new' | 'contacted' | 'closed';
type BillingCycle = 'monthly' | 'yearly';

type Lead = {
  id: number;
  name: string;
  business: string;
  phone: string;
  email: string;
  type: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
};

type Payment = {
  id: number;
  paymentId: string;
  orderId: string;
  planName: string;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  createdAt: string;
};

type AdminSettings = {
  pricing: Record<string, Record<BillingCycle, number>>;
  release: { version: string; downloadUrl: string };
};

type DashboardData = {
  summary: { totalLeads: number; newLeads: number; totalPayments: number; totalRevenue: number };
  leads: Lead[];
  payments: Payment[];
  settings: AdminSettings;
};

type AdminTab = 'overview' | 'leads' | 'payments' | 'settings';

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'leads', label: 'Demo requests', icon: ClipboardList },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Website settings', icon: Settings },
];

const money = (paise: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(paise / 100);

const dateTime = (value: string) => new Date(`${value.replace(' ', 'T')}Z`).toLocaleString('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const demoDashboard: DashboardData = {
  summary: { totalLeads: 18, newLeads: 4, totalPayments: 12, totalRevenue: 8998800 },
  leads: [
    { id: 3, name: 'Aarav Mehta', business: 'Mehta Medicals', phone: '+91 98765 43210', email: 'aarav@example.test', type: 'Medical & Pharma', message: 'Interested in batch tracking.', status: 'new', createdAt: '2026-09-29 10:25:00' },
    { id: 2, name: 'Riya Shah', business: 'Shah Wholesale', phone: '+91 98765 12340', email: 'riya@example.test', type: 'Wholesale', message: 'Need a walkthrough for the team.', status: 'contacted', createdAt: '2026-09-28 14:10:00' },
    { id: 1, name: 'Kabir Patel', business: 'Patel General Store', phone: '+91 98765 54321', email: 'kabir@example.test', type: 'Retail', message: '', status: 'closed', createdAt: '2026-09-27 09:05:00' },
  ],
  payments: [
    { id: 2, paymentId: 'demo_pay_professional', orderId: 'demo_order_professional', planName: 'Professional', billingCycle: 'yearly', amount: 749900, currency: 'INR', createdAt: '2026-09-28 12:40:00' },
    { id: 1, paymentId: 'demo_pay_starter', orderId: 'demo_order_starter', planName: 'Starter', billingCycle: 'monthly', amount: 69900, currency: 'INR', createdAt: '2026-09-26 16:20:00' },
  ],
  settings: {
    pricing: Object.fromEntries(pricingPlans.map(({ name, monthly, yearly }) => [name, { monthly, yearly }])),
    release: appRelease,
  },
};

export function AdminPortal({ demoMode = false }: { demoMode?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [checkingSession, setCheckingSession] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function refreshDashboard() {
    const dashboard = await apiFetch<DashboardData>('/api/admin/dashboard');
    setData(dashboard);
    setSettings(dashboard.settings);
  }

  useEffect(() => {
    if (demoMode) {
      setUser('Sample data');
      setData(demoDashboard);
      setSettings(demoDashboard.settings);
      setCheckingSession(false);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const session = await apiFetch<{ email: string }>('/api/admin/session');
        if (cancelled) return;
        setUser(session.email);
        const dashboard = await apiFetch<DashboardData>('/api/admin/dashboard');
        if (!cancelled) {
          setData(dashboard);
          setSettings(dashboard.settings);
        }
      } catch {
        if (!cancelled) setUser('');
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();
    return () => { cancelled = true; };
  }, [demoMode]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const session = await apiFetch<{ email: string }>('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      await refreshDashboard();
      setUser(session.email);
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Could not sign in.');
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setUser('');
      setData(null);
      setSettings(null);
      setBusy(false);
    }
  }

  async function changeLeadStatus(lead: Lead, status: LeadStatus) {
    if (demoMode) return;
    setError('');
    try {
      await apiFetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setData((current) => current && ({
        ...current,
        leads: current.leads.map((item) => item.id === lead.id ? { ...item, status } : item),
        summary: {
          ...current.summary,
          newLeads: current.summary.newLeads + (lead.status === 'new' ? -1 : 0) + (status === 'new' ? 1 : 0),
        },
      }));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update request.');
    }
  }

  async function saveWebsiteSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings || demoMode) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await apiFetch<{ settings: AdminSettings }>('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      setSettings(result.settings);
      setData((current) => current && { ...current, settings: result.settings });
      setNotice('Website settings saved. Public pricing and checkout now use these values.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save website settings.');
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">Checking admin session…</div>;
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md">
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </a>
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <img src={brand.logoUrl} alt={brand.name} className="mb-8 h-10 w-auto object-contain" />
            <h1 className="text-2xl font-bold text-slate-950">Admin sign in</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to manage Sigma ERP website operations.</p>
            <form onSubmit={handleLogin} className="mt-7 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Admin email
                <input
                  autoComplete="username"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  autoComplete="current-password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="flex h-11 w-full items-center justify-center rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <a href="/admin/demo" className="mt-5 flex h-10 items-center justify-center rounded-md border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Preview admin dashboard
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!data || !settings) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">Loading admin data…</div>;
  }

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <img src={brand.logoUrl} alt={brand.name} className="h-9 w-auto max-w-36 object-contain" />
            <span className="border-l border-slate-200 pl-3 text-xs font-semibold uppercase text-slate-500">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {demoMode && <span className="rounded-md bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800">Sample data · read only</span>}
            <span className="hidden text-sm text-slate-500 sm:inline">{user}</span>
            <button
              type="button"
              onClick={() => { window.location.assign('/'); }}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" /> Website
            </button>
            {!demoMode && <button
              type="button"
              disabled={busy}
              onClick={() => { void handleLogout(); }}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>}
            {demoMode && <a href="/admin" className="inline-flex h-9 items-center rounded-md bg-brand-700 px-3 text-sm font-semibold text-white hover:bg-brand-800">Admin login</a>}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-7 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-10">
        <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id); setError(''); setNotice(''); }}
                className={`inline-flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </nav>

        <main className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-brand-700">Sigma ERP</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">{activeTabInfo.label}</h1>
            </div>
            {!demoMode && <button
              type="button"
              onClick={() => { void refreshDashboard().catch((refreshError) => setError(refreshError.message)); }}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>}
          </div>

          {error && <p role="alert" className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
          {notice && <p role="status" className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}

          {activeTab === 'overview' && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryTile label="All demo requests" value={data.summary.totalLeads.toLocaleString('en-IN')} />
                <SummaryTile label="New requests" value={data.summary.newLeads.toLocaleString('en-IN')} />
                <SummaryTile label="Verified payments" value={data.summary.totalPayments.toLocaleString('en-IN')} />
                <SummaryTile label="Recorded revenue" value={money(data.summary.totalRevenue)} />
              </div>
              <section className="mt-7 overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <h2 className="text-sm font-semibold">Recent demo requests</h2>
                  <button type="button" onClick={() => setActiveTab('leads')} className="text-sm font-semibold text-brand-700 hover:text-brand-900">View all</button>
                </div>
                {data.leads.length ? (
                  <LeadTable leads={data.leads.slice(0, 5)} onStatusChange={changeLeadStatus} readOnly={demoMode} />
                ) : <EmptyState>No demo requests have been received yet.</EmptyState>}
              </section>
            </>
          )}

          {activeTab === 'leads' && (
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {data.leads.length ? <LeadTable leads={data.leads} onStatusChange={changeLeadStatus} readOnly={demoMode} /> : <EmptyState>No demo requests have been received yet.</EmptyState>}
            </section>
          )}

          {activeTab === 'payments' && (
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {data.payments.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr><th className="px-4 py-3 font-semibold">Plan</th><th className="px-4 py-3 font-semibold">Cycle</th><th className="px-4 py-3 font-semibold">Amount</th><th className="px-4 py-3 font-semibold">Payment ID</th><th className="px-4 py-3 font-semibold">Date</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-4 py-3 font-medium">{payment.planName}</td>
                          <td className="px-4 py-3 capitalize text-slate-600">{payment.billingCycle}</td>
                          <td className="px-4 py-3 font-semibold">{money(payment.amount)}</td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-500">{payment.paymentId}</td>
                          <td className="px-4 py-3 text-slate-500">{dateTime(payment.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <EmptyState>Verified payments will appear here.</EmptyState>}
            </section>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={saveWebsiteSettings} className="space-y-5">
              <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-base font-semibold">Plan pricing</h2>
                <p className="mt-1 text-sm text-slate-500">Prices update the public plans and the amount sent to checkout.</p>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-2 font-semibold">Plan</th><th className="pb-2 font-semibold">Monthly (₹)</th><th className="pb-2 font-semibold">Yearly (₹)</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(settings.pricing).map(([planName, prices]) => (
                        <tr key={planName}>
                          <td className="py-3 font-medium">{planName}</td>
                          {(['monthly', 'yearly'] as const).map((cycle) => (
                            <td key={cycle} className="py-2 pr-3">
                              <input
                                aria-label={`${planName} ${cycle} price`}
                                type="number"
                                disabled={demoMode}
                                min="1"
                                step="1"
                                required
                                value={prices[cycle]}
                                onChange={(event) => setSettings((current) => current && ({
                                  ...current,
                                  pricing: {
                                    ...current.pricing,
                                    [planName]: { ...current.pricing[planName], [cycle]: Number(event.target.value) },
                                  },
                                }))}
                                className="h-10 w-full max-w-48 rounded-md border border-slate-300 px-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-slate-500">Yearly price must be less than 12 monthly payments.</p>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-base font-semibold">Desktop app download</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    App version
                    <input
                      disabled={demoMode}
                      required
                      value={settings.release.version}
                      onChange={(event) => setSettings((current) => current && ({ ...current, release: { ...current.release, version: event.target.value } }))}
                      className="mt-1.5 h-10 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Download URL
                    <input
                      disabled={demoMode}
                      required
                      type="url"
                      value={settings.release.downloadUrl.startsWith('/') ? `${window.location.origin}${settings.release.downloadUrl}` : settings.release.downloadUrl}
                      onChange={(event) => setSettings((current) => {
                        if (!current) return current;
                        let downloadUrl = event.target.value;
                        if (downloadUrl.startsWith(window.location.origin)) downloadUrl = downloadUrl.slice(window.location.origin.length) || '/';
                        return { ...current, release: { ...current.release, downloadUrl } };
                      })}
                      className="mt-1.5 h-10 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                </div>
              </section>
              {!demoMode && <button type="submit" disabled={busy} className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
                <Check className="h-4 w-4" /> {busy ? 'Saving…' : 'Save website settings'}
              </button>}
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-5 py-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-slate-950">{value}</p>
    </div>
  );
}

function EmptyState({ children }: { children: string }) {
  return <p className="px-5 py-12 text-center text-sm text-slate-500">{children}</p>;
}

function LeadTable({ leads, onStatusChange, readOnly }: { leads: Lead[]; onStatusChange: (lead: Lead, status: LeadStatus) => void; readOnly: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr><th className="px-4 py-3 font-semibold">Contact</th><th className="px-4 py-3 font-semibold">Business</th><th className="px-4 py-3 font-semibold">Type</th><th className="px-4 py-3 font-semibold">Received</th><th className="px-4 py-3 font-semibold">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{lead.name}</p>
                <a href={`mailto:${lead.email}`} className="mt-0.5 block text-xs text-brand-700 hover:underline">{lead.email}</a>
                <a href={`tel:${lead.phone}`} className="mt-0.5 block text-xs text-slate-500">{lead.phone}</a>
              </td>
              <td className="px-4 py-3 text-slate-700">{lead.business}</td>
              <td className="px-4 py-3 text-slate-600">{lead.type}</td>
              <td className="px-4 py-3 text-slate-500">{dateTime(lead.createdAt)}</td>
              <td className="px-4 py-3">
                <select
                  aria-label={`Status for ${lead.name}`}
                  value={lead.status}
                  disabled={readOnly}
                  onChange={(event) => onStatusChange(lead, event.target.value as LeadStatus)}
                  className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs font-medium capitalize outline-none focus:border-brand-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}