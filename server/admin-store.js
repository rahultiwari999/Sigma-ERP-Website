import dotenv from 'dotenv';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: new URL('../.env.admin', import.meta.url) });
}

const databasePath = process.env.DATABASE_PATH || fileURLToPath(new URL('./data/sigma-admin.sqlite', import.meta.url));
mkdirSync(dirname(databasePath), { recursive: true });

const pricing = JSON.parse(
  readFileSync(new URL('../src/config/pricing.json', import.meta.url), 'utf8')
);
const defaults = {
  pricing,
  release: { version: 'v1.0.0', downloadUrl: '/SigmaERP-Setup-v1.0.0.exe' },
};
const database = new DatabaseSync(databasePath);

database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS demo_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    business TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    razorpay_payment_id TEXT NOT NULL UNIQUE,
    razorpay_order_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    billing_cycle TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertDefault = database.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
for (const [key, value] of Object.entries(defaults)) {
  insertDefault.run(key, JSON.stringify(value));
}

export function getSettings() {
  const rows = database.prepare('SELECT key, value FROM settings').all();
  return Object.fromEntries(rows.map(({ key, value }) => [key, JSON.parse(value)]));
}

export function updateSettings(settings) {
  const upsert = database.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  database.exec('BEGIN IMMEDIATE');
  try {
    upsert.run('pricing', JSON.stringify(settings.pricing));
    upsert.run('release', JSON.stringify(settings.release));
    database.exec('COMMIT');
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  }
  return getSettings();
}

export function createDemoRequest(request) {
  const result = database.prepare(`
    INSERT INTO demo_requests (name, business, phone, email, type, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(request.name, request.business, request.phone, request.email, request.type, request.message);
  return Number(result.lastInsertRowid);
}

export function listDemoRequests() {
  return database.prepare(`
    SELECT id, name, business, phone, email, type, message, status, created_at AS createdAt
    FROM demo_requests ORDER BY id DESC
  `).all();
}

export function updateDemoRequestStatus(id, status) {
  return database.prepare('UPDATE demo_requests SET status = ? WHERE id = ?').run(status, id).changes > 0;
}

export function savePayment(payment) {
  database.prepare(`
    INSERT OR IGNORE INTO payments
      (razorpay_payment_id, razorpay_order_id, plan_name, billing_cycle, amount, currency)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    payment.paymentId,
    payment.orderId,
    payment.planName,
    payment.billingCycle,
    payment.amount,
    payment.currency
  );
}

export function listPayments() {
  return database.prepare(`
    SELECT id, razorpay_payment_id AS paymentId, razorpay_order_id AS orderId,
      plan_name AS planName, billing_cycle AS billingCycle, amount, currency,
      created_at AS createdAt
    FROM payments ORDER BY id DESC
  `).all();
}

export function getAdminSummary() {
  const row = database.prepare(`
    SELECT
      (SELECT COUNT(*) FROM demo_requests) AS totalLeads,
      (SELECT COUNT(*) FROM demo_requests WHERE status = 'new') AS newLeads,
      (SELECT COUNT(*) FROM payments) AS totalPayments,
      (SELECT COALESCE(SUM(amount), 0) FROM payments) AS totalRevenue
  `).get();
  return row;
}