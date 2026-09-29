import crypto from 'node:crypto';
import cors from 'cors';
import express from 'express';
import Razorpay from 'razorpay';
import {
  createDemoRequest,
  getAdminSummary,
  getSettings,
  listDemoRequests,
  listPayments,
  savePayment,
  updateDemoRequestStatus,
  updateSettings,
} from './admin-store.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const adminSessionCookie = 'sigma_admin_session';
const adminSessionLifetime = 12 * 60 * 60;
const loginAttempts = new Map();
const revokedSessions = new Map();
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
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

function constantTimeMatch(candidate, expected) {
  if (typeof candidate !== 'string' || typeof expected !== 'string') return false;
  const candidateBytes = Buffer.from(candidate);
  const expectedBytes = Buffer.from(expected);
  return candidateBytes.length === expectedBytes.length && crypto.timingSafeEqual(candidateBytes, expectedBytes);
}

function createAdminSession(email) {
  const payload = Buffer.from(`${email}|${Date.now() + adminSessionLifetime * 1000}|${crypto.randomUUID()}`).toString('base64url');
  const signature = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('base64url');
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const sameSite = process.env.NODE_ENV === 'production' ? 'None' : 'Strict';
  return `${adminSessionCookie}=${payload}.${signature}; HttpOnly; SameSite=${sameSite}; Path=/api/admin; Max-Age=${adminSessionLifetime}${secure}`;
}

function getAdminSessionToken(request) {
  const cookie = request.headers.cookie?.split(';').map((item) => item.trim())
    .find((item) => item.startsWith(`${adminSessionCookie}=`));
  return cookie?.slice(adminSessionCookie.length + 1);
}

function getAdminSessionEmail(request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) return null;

  const token = getAdminSessionToken(request);
  if (!token) return null;
  for (const [revokedToken, expiresAt] of revokedSessions) {
    if (expiresAt <= Date.now()) revokedSessions.delete(revokedToken);
  }
  if (revokedSessions.has(token)) return null;

  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return null;

  const expected = crypto.createHmac('sha256', secret).update(payload).digest();
  const received = Buffer.from(signature, 'base64url');
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) return null;

  try {
    const [email, expiresAt] = Buffer.from(payload, 'base64url').toString().split('|');
    if (!email || Number(expiresAt) <= Date.now() || email !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) return null;
    return email;
  } catch {
    return null;
  }
}

function requireAdmin(request, response, next) {
  if (!getAdminSessionEmail(request)) {
    response.status(401).json({ error: 'Admin login required.' });
    return;
  }
  next();
}

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

  const pricing = getSettings().pricing;
  const canonicalName = Object.keys(pricing).find(
    (name) => name.toLowerCase() === planName.toLowerCase()
  );
  if (!canonicalName || !Number.isInteger(pricing[canonicalName]?.[billingCycle])) return null;

  return {
    name: canonicalName,
    billingCycle,
    amountRupees: pricing[canonicalName][billingCycle],
  };
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/public/settings', (_request, response) => {
  response.json(getSettings());
});

app.post('/api/demo-requests', (request, response) => {
  const fields = ['name', 'business', 'phone', 'email', 'type', 'message'];
  const values = Object.fromEntries(fields.map((field) => [
    field,
    typeof request.body?.[field] === 'string' ? request.body[field].trim() : '',
  ]));
  const required = ['name', 'business', 'phone', 'email', 'type'];

  if (
    required.some((field) => !values[field] || values[field].length > 200) ||
    values.message.length > 2000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    !/^[+]?[-\d\s]{10,20}$/.test(values.phone)
  ) {
    response.status(400).json({ error: 'Enter valid demo request details and try again.' });
    return;
  }

  response.status(201).json({ id: createDemoRequest(values) });
});

app.post('/api/admin/login', (request, response) => {
  const ip = request.ip;
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  if (attempt?.blockedUntil > now) {
    response.status(429).json({ error: 'Too many sign-in attempts. Try again in 15 minutes.' });
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!adminEmail || !adminPassword || adminPassword.length < 12 || !sessionSecret || Buffer.byteLength(sessionSecret) < 32) {
    response.status(503).json({ error: 'Admin login is not configured on the server.' });
    return;
  }

  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  if (!constantTimeMatch(email, adminEmail) || !constantTimeMatch(password, adminPassword)) {
    const failures = (attempt?.failures || 0) + 1;
    loginAttempts.set(ip, {
      failures,
      blockedUntil: failures >= 5 ? now + 15 * 60 * 1000 : 0,
    });
    response.status(401).json({ error: 'Email or password is incorrect.' });
    return;
  }

  loginAttempts.delete(ip);
  response.setHeader('Set-Cookie', createAdminSession(adminEmail));
  response.json({ email: adminEmail });
});

app.get('/api/admin/session', requireAdmin, (request, response) => {
  response.json({ email: getAdminSessionEmail(request) });
});

app.post('/api/admin/logout', requireAdmin, (_request, response) => {
  const token = getAdminSessionToken(_request);
  if (token) revokedSessions.set(token, Date.now() + adminSessionLifetime * 1000);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const sameSite = process.env.NODE_ENV === 'production' ? 'None' : 'Strict';
  response.setHeader('Set-Cookie', `${adminSessionCookie}=; HttpOnly; SameSite=${sameSite}; Path=/api/admin; Max-Age=0${secure}`);
  response.json({ success: true });
});

app.get('/api/admin/dashboard', requireAdmin, (_request, response) => {
  response.json({
    summary: getAdminSummary(),
    leads: listDemoRequests(),
    payments: listPayments(),
    settings: getSettings(),
  });
});

app.patch('/api/admin/leads/:id', requireAdmin, (request, response) => {
  const id = Number(request.params.id);
  const status = request.body?.status;
  if (!Number.isSafeInteger(id) || id < 1 || !['new', 'contacted', 'closed'].includes(status)) {
    response.status(400).json({ error: 'Choose a valid lead and status.' });
    return;
  }
  if (!updateDemoRequestStatus(id, status)) {
    response.status(404).json({ error: 'Demo request not found.' });
    return;
  }
  response.json({ success: true });
});

app.put('/api/admin/settings', requireAdmin, (request, response) => {
  const { pricing, release } = request.body || {};
  const currentPricing = getSettings().pricing;
  const pricesAreValid = pricing && Object.keys(currentPricing).every((name) => {
    const values = pricing[name];
    return values && Number.isSafeInteger(values.monthly) && values.monthly > 0 &&
      Number.isSafeInteger(values.yearly) && values.yearly > 0 && values.yearly < values.monthly * 12;
  });
  const releaseIsValid = release &&
    typeof release.version === 'string' && /^[\w.-]{1,40}$/.test(release.version) &&
    typeof release.downloadUrl === 'string' && release.downloadUrl.length <= 2048 &&
    ((release.downloadUrl.startsWith('/') && !release.downloadUrl.startsWith('//')) || /^https:\/\//i.test(release.downloadUrl));

  if (!pricesAreValid || !releaseIsValid) {
    response.status(400).json({ error: 'Check yearly and monthly prices, app version, and HTTPS download link.' });
    return;
  }

  response.json({ settings: updateSettings({ pricing, release }) });
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

    savePayment({
      paymentId,
      orderId,
      planName: plan.name,
      billingCycle: plan.billingCycle,
      amount: payment.amount,
      currency: payment.currency,
    });
    response.json({ verified: true, paymentId, planName: plan.name, billingCycle: plan.billingCycle });
  } catch {
    response.status(502).json({ error: 'Could not verify the payment. Please contact support.' });
  }
});

export const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Sigma ERP payment API listening on port ${port}`);
});