import 'dotenv/config';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import cors from 'cors';
import express from 'express';
import Razorpay from 'razorpay';

const pricing = JSON.parse(
  readFileSync(new URL('../src/config/pricing.json', import.meta.url), 'utf8')
);
const app = express();
const port = Number(process.env.PORT || 3001);
const allowedOrigins = new Set(
  (process.env.FRONTEND_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin is not allowed'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json({ limit: '10kb' }));

function getPaymentProvider() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return null;
  return { keyId, client: new Razorpay({ key_id: keyId, key_secret: keySecret }) };
}

function resolvePlan(planName, billingCycle) {
  if (typeof planName !== 'string' || !['monthly', 'yearly'].includes(billingCycle)) {
    return null;
  }

  const canonicalName = Object.keys(pricing).find(
    (name) => name.toLowerCase() === planName.toLowerCase()
  );
  if (!canonicalName) return null;

  return {
    name: canonicalName,
    billingCycle,
    amountRupees: pricing[canonicalName][billingCycle],
  };
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/payments/create-order', async (request, response) => {
  const paymentProvider = getPaymentProvider();
  if (!paymentProvider) {
    response.status(503).json({ error: 'Payments are not configured on the server.' });
    return;
  }

  const plan = resolvePlan(request.body?.planName, request.body?.billingCycle);
  if (!plan) {
    response.status(400).json({ error: 'Choose a valid plan and billing cycle.' });
    return;
  }

  try {
    const order = await paymentProvider.client.orders.create({
      amount: plan.amountRupees * 100,
      currency: 'INR',
      receipt: `sigma-${plan.name.toLowerCase()}-${Date.now()}`,
      notes: { planName: plan.name, billingCycle: plan.billingCycle },
    });

    response.json({
      keyId: paymentProvider.keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planName: plan.name,
      billingCycle: plan.billingCycle,
    });
  } catch {
    response.status(502).json({ error: 'Could not create a payment order. Please try again.' });
  }
});

app.post('/api/payments/verify', async (request, response) => {
  const paymentProvider = getPaymentProvider();
  if (!paymentProvider) {
    response.status(503).json({ error: 'Payments are not configured on the server.' });
    return;
  }

  const {
    planName,
    billingCycle,
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = request.body || {};
  const plan = resolvePlan(planName, billingCycle);

  if (
    !plan ||
    typeof orderId !== 'string' ||
    typeof paymentId !== 'string' ||
    typeof signature !== 'string' ||
    !/^[a-f0-9]{64}$/i.test(signature)
  ) {
    response.status(400).json({ error: 'Payment verification details are invalid.' });
    return;
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest();
  const receivedSignature = Buffer.from(signature, 'hex');

  if (
    receivedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(receivedSignature, expectedSignature)
  ) {
    response.status(400).json({ error: 'Payment signature could not be verified.' });
    return;
  }

  try {
    const [order, payment] = await Promise.all([
      paymentProvider.client.orders.fetch(orderId),
      paymentProvider.client.payments.fetch(paymentId),
    ]);
    const expectedAmount = plan.amountRupees * 100;
    const orderMatchesPlan =
      order.amount === expectedAmount &&
      order.currency === 'INR' &&
      order.notes?.planName === plan.name &&
      order.notes?.billingCycle === plan.billingCycle;
    const paymentMatchesOrder =
      payment.order_id === orderId &&
      payment.amount === expectedAmount &&
      payment.currency === 'INR' &&
      payment.status === 'captured';

    if (!orderMatchesPlan || !paymentMatchesOrder) {
      response.status(400).json({ error: 'Payment does not match the selected plan.' });
      return;
    }

    response.json({ verified: true, paymentId, planName: plan.name, billingCycle: plan.billingCycle });
  } catch {
    response.status(502).json({ error: 'Could not verify the payment. Please contact support.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Sigma ERP payment API listening on port ${port}`);
});