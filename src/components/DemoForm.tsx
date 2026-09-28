import { useState, type FormEvent } from 'react';
import { Check, Send, AlertCircle } from 'lucide-react';
import { contact } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const businessTypes = [
  'Medical & Pharma',
  'Wholesale',
  'Retail',
  'Distribution',
  'General Trading',
  'Other',
];

type FormState = {
  name: string;
  business: string;
  phone: string;
  email: string;
  type: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export function DemoForm() {
  const [form, setForm] = useState<FormState>({
    name: '', business: '', phone: '', email: '', type: '', message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.business.trim()) e.business = 'Please enter your business name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.type) e.type = 'Please select a business type';
    return e;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  }

  const emailSubject = encodeURIComponent(`Sigma ERP demo request - ${form.business}`);
  const emailBody = encodeURIComponent(
    `Name: ${form.name}\nBusiness: ${form.business}\nPhone: ${form.phone}\nEmail: ${form.email}\nBusiness type: ${form.type}\nMessage: ${form.message || 'Not provided'}`
  );
  const emailDraft = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  if (submitted) {
    return (
      <Section id="demo" className="py-20 lg:py-28">
        <div className="mx-auto max-w-xl rounded-3xl border border-emerald-200 bg-emerald-50/50 p-12 text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
          <h3 className="text-2xl font-bold text-slate-900">Demo Request Received!</h3>
          <p className="mt-3 text-sm text-slate-600">
            Your email app can open a prepared demo request. Send the email to
            contact our team and schedule your personalized demo.
          </p>
          <a
            href={emailDraft}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
          >
            Open email draft
          </a>
          <Button
            variant="secondary"
            size="md"
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', business: '', phone: '', email: '', type: '', message: '' });
            }}
          >
            Submit another request
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="demo" className="py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: info */}
        <div className="reveal">
          <SectionLabel>Get Started</SectionLabel>
          <SectionHeading className="mt-4">
            Request a{' '}
            <span className="text-gradient">Personalized Demo</span>
          </SectionHeading>
          <p className="mt-4 text-base text-slate-600">
            Fill out the form and our team will get back to you within 24 hours
            to schedule a walkthrough of Sigma ERP tailored to your business.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" /><path d="M4 8h16" /></svg>
              </span>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-semibold text-slate-700">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.74-1.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0122 16.92z" /></svg>
              </span>
              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="text-sm font-semibold text-slate-700">{contact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="reveal">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
            noValidate
          >
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  error={errors.name}
                  placeholder="Rajesh Kumar"
                />
                <Field
                  label="Business Name"
                  value={form.business}
                  onChange={(v) => update('business', v)}
                  error={errors.business}
                  placeholder="Sharma Medical Store"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Phone Number"
                  value={form.phone}
                  onChange={(v) => update('phone', v)}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                  type="tel"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                  placeholder="rajesh@business.in"
                  type="email"
                />
              </div>

              {/* Business type select */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Business Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => update('type', e.target.value)}
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${
                    errors.type ? 'border-rose-300' : 'border-slate-200'
                  }`}
                >
                  <option value="">Select your business type</option>
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                    <AlertCircle className="h-3 w-3" /> {errors.type}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Message <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  rows={3}
                  placeholder="Tell us about your requirements..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Request Demo
                <Send className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-slate-400">
                By submitting, you agree to be contacted about Sigma ERP.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:ring-2 focus:ring-brand-100 ${
          error ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-brand-400'
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}
