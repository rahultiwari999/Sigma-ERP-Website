# Razorpay Checkout Setup

The pricing buttons create a one-time Razorpay payment for the selected monthly or yearly amount. The yearly price is charged once for the year; it does not auto-renew.

## Local test mode

1. Copy `.env.example` to `.env`.
2. Add Razorpay **Test Mode** Key ID and Key Secret to `.env`. Keep the secret server-side; never use a `VITE_` prefix for it or commit `.env`.
3. Run `npm run api` in one terminal.
4. Run `npm run dev` in another terminal.
5. Complete checkout with Razorpay test-mode payment details.

The frontend uses the Vite `/api` proxy locally. The API reads the plan amount from `src/config/pricing.json`, creates the order, verifies Razorpay's signature, and confirms the payment is captured for the selected plan.

## Production

Deploy the Node API over HTTPS and configure `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `FRONTEND_ORIGINS`, and `PORT` in the API host's environment settings. Set `VITE_API_BASE_URL` to the deployed API origin when building the frontend. Use Razorpay Live Mode keys only in the API host's secret settings.

This site currently verifies and displays the payment ID; it does not create customer accounts, issue software licenses, or activate plan entitlements. Those require a persistent customer/license backend.
