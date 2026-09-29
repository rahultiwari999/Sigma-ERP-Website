# Razorpay Checkout Setup

The pricing buttons create a one-time Razorpay payment for the selected monthly or yearly amount. The yearly price is charged once for the year; it does not auto-renew.

## Local test mode

1. Copy `.env.example` to `.env`.
2. Add Razorpay **Test Mode** Key ID and Key Secret to `.env`. Keep the secret server-side; never use a `VITE_` prefix for it or commit `.env`.
3. Run `npm run api` in one terminal.
4. Run `npm run dev` in another terminal.
5. Complete checkout with Razorpay test-mode payment details.

The frontend uses the Vite `/api` proxy locally. The API reads the plan amount from `src/config/pricing.json`, creates the order, verifies Razorpay's signature, and confirms the payment is captured for the selected plan.

## Website admin

The `/admin` page manages website demo requests, verified payments, plan prices, and the desktop app version/download URL. New demo requests and verified payments are stored in SQLite; this is website operations data, not live sales or inventory data from the desktop ERP.

For local development, the server loads `.env.admin` when present. Set these server-side values there (or in `.env`):

- `ADMIN_EMAIL`: the admin sign-in email.
- `ADMIN_PASSWORD`: a unique password with at least 12 characters.
- `ADMIN_SESSION_SECRET`: a random secret of at least 32 bytes. Generate one with `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"` and keep it private.
- `DATABASE_PATH`: optional SQLite file path. The default is `server/data/sigma-admin.sqlite`.

Run `npm run api` and `npm run dev`, then open `/admin`. A read-only sample preview is available at `/admin/demo`. Both `.env.admin` and the SQLite file are excluded from Git; never force-add credentials or customer data to a commit. In production, use Node.js 22.5 or newer, set admin credentials in the hosting provider's secret settings, and mount persistent storage for the database path. Back up the database because it contains customer enquiries and payment records. Only payments verified after this admin feature is deployed are recorded.

## Production

Deploy the Node API over HTTPS and configure `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `FRONTEND_ORIGINS`, and `PORT` in the API host's environment settings. Set `VITE_API_BASE_URL` to the deployed API origin when building the frontend. Use Razorpay Live Mode keys only in the API host's secret settings.

This site currently verifies and displays the payment ID; it does not create customer accounts, issue software licenses, or activate plan entitlements. Those require a persistent customer/license backend.
