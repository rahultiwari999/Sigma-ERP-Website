import { useState } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { pricingPlans, type PricingPlan } from '@/config/brand';
import { Section, SectionLabel, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

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

async function readApiResponse<T>(
  response: Response,
  emptyMessage: string,
  invalidMessage: string,
  fallbackMessage: string
): Promise<T> {
  const body = await response.text();
  if (!body) {
    throw new Error(response.ok ? invalidMessage : emptyMessage);
  }

  let result: T & { error?: string };
  try {
    result = JSON.parse(body) as T & { error?: string };
  } catch {
    throw new Error(invalidMessage);
  }

  if (!response.ok) throw new Error(result.error || fallbackMessage);
  return result;
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function startCheckout(plan: PricingPlan) {
    if (plan.name === 'Enterprise') {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (loadingPlan) return;

    const billingCycle: BillingCycle = yearly ? 'yearly' : 'monthly';
    setCheckoutMessage(null);
    setLoadingPlan(plan.name);

    try {
      await loadRazorpayCheckout();
      if (!window.Razorpay) throw new Error('Secure checkout is unavailable. Please try again.');

      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const orderResponse = await fetch(`${apiBaseUrl}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: plan.name, billingCycle }),
      });
      const order = await readApiResponse<RazorpayOrder>(
        orderResponse,
        'Payment API returned an empty response. Make sure npm run api is running, then try again.',
        'Payment API returned an invalid response. Check npm run api, then try again.',
        'Could not start checkout.'
      );
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
            const verifyResponse = await fetch(`${apiBaseUrl}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...payment, planName: plan.name, billingCycle }),
            });
            const verification = await readApiResponse<{ verified: boolean; paymentId: string }>(
              verifyResponse,
              'Verification response was empty. Do not pay again yet; restart npm run api and contact support with your payment ID.',
              'Verification response was invalid. Do not pay again yet; contact support with your payment ID.',
              'Payment verification failed.'
            );
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
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-soft">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              !yearly ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              yearly ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Yearly
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              yearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}>
              Annual billing
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="reveal mt-14 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
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
                  ₹{(yearly ? Math.round(plan.yearly / 12) : plan.monthly).toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400">/month</span>
              </div>
              {yearly && (
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  ₹{plan.yearly.toLocaleString('en-IN')} billed yearly
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
                : plan.name === 'Enterprise'
                  ? 'Contact Sales'
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
        All prices in INR. Prices are placeholders and can be updated anytime.
      </p>
    </Section>
  );
}
