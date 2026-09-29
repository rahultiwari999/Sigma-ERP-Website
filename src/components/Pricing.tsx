import { useEffect, useState } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { pricingPlans, type PricingPlan } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { apiFetch } from '@/lib/api';

type BillingCycle = 'monthly' | 'yearly';

type RazorpayOrder = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
};

type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (payment: RazorpayPaymentResponse) => void;
  modal: { ondismiss: () => void };
  theme: { color: string };
};

type RazorpayCheckout = {
  open: () => void;
  on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayCheckout;
  }
}

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error('Could not load secure checkout. Please try again.'));
    };
    document.body.appendChild(script);
  });
}

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [plans, setPlans] = useState(pricingPlans);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void apiFetch<{ pricing: Record<string, { monthly: number; yearly: number }> }>('/api/public/settings')
      .then(({ pricing }) => {
        if (cancelled) return;
        setPlans((current) => current.map((plan) => ({
          ...plan,
          monthly: pricing[plan.name]?.monthly ?? plan.monthly,
          yearly: pricing[plan.name]?.yearly ?? plan.yearly,
        })));
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  async function startCheckout(plan: PricingPlan) {
    if (loadingPlan) return;

    setCheckoutMessage(null);
    setLoadingPlan(plan.name);

    try {
      await loadRazorpayCheckout();
      if (!window.Razorpay) throw new Error('Secure checkout is unavailable. Please try again.');

      const order = await apiFetch<RazorpayOrder>('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ planName: plan.name, billingCycle }),
      });
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Sigma ERP',
        description: `${plan.name} plan · ${billingCycle}`,
        image: `${window.location.origin}/icon.png`,
        order_id: order.orderId,
        theme: { color: '#4f46e5' },
        modal: { ondismiss: () => setLoadingPlan(null) },
        handler: async (payment) => {
          try {
            const verification = await apiFetch<{ verified: boolean; paymentId: string }>('/api/payments/verify', {
              method: 'POST',
              body: JSON.stringify({ ...payment, planName: plan.name, billingCycle }),
            });
            if (!verification.verified) {
              throw new Error('Payment verification failed. Contact support with your payment ID.');
            }
            setCheckoutMessage({
              type: 'success',
              text: `Payment verified. Keep your payment ID: ${verification.paymentId}`,
            });
          } catch (error) {
            setCheckoutMessage({
              type: 'error',
              text: error instanceof Error ? error.message : 'Payment verification failed.',
            });
          } finally {
            setLoadingPlan(null);
          }
        },
      });

      checkout.on('payment.failed', (failure) => {
        setCheckoutMessage({
          type: 'error',
          text: failure.error?.description || 'Payment failed. Please try again.',
        });
        setLoadingPlan(null);
      });
      checkout.open();
    } catch (error) {
      setCheckoutMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Could not start checkout.',
      });
      setLoadingPlan(null);
    }
  }

  return (
    <Section id="pricing" className="py-20 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionLabel>Pricing</SectionLabel>
        <SectionHeading className="mt-4">
          Simple Pricing. <span className="text-gradient">Powerful Software.</span>
        </SectionHeading>
        <p className="mt-4 text-base text-slate-600">
          Choose a plan and billing period, then complete your payment securely.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-soft">
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition-all ${
                billingCycle === cycle ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="reveal mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-card ${
              plan.popular
                ? 'border-brand-300 ring-2 ring-brand-200 lg:-translate-y-3'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-card">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  ₹{(billingCycle === 'yearly' ? plan.yearly : plan.monthly).toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400">
                  /{billingCycle === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  Billed annually · Save {Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100)}% vs monthly
                </p>
              )}
              {billingCycle === 'monthly' && (
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  ₹{plan.monthly.toLocaleString('en-IN')} billed monthly
                </p>
              )}
            </div>

            <Button
              variant={plan.popular ? 'primary' : 'secondary'}
              size="md"
              className="w-full"
              disabled={loadingPlan !== null}
              onClick={() => startCheckout(plan)}
            >
              {loadingPlan === plan.name
                ? 'Opening checkout…'
                : 'Continue to Payment'}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="my-6 border-t border-slate-100" />

            <ul className="space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {checkoutMessage && (
        <p
          role="status"
          aria-live="polite"
          className={`mx-auto mt-6 max-w-2xl rounded-lg border px-4 py-3 text-sm ${
            checkoutMessage.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {checkoutMessage.text}
        </p>
      )}

      <p className="reveal mt-8 text-center text-sm text-slate-400">
        All prices in INR. Yearly plans are billed annually.
      </p>
    </Section>
  );
}
