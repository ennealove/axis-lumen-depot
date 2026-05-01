AXIS LUMEN BACKEND — VERSION SANS COMPILATION NATIVE

Cette version utilise un fichier JSON local :
axis_lumen_db.json

Installation :
npm install
npm run dev

Test :
http://localhost:8787/api/health

Endpoints :
POST /api/auth/register
POST /api/auth/login
GET  /api/profile/me
GET  /api/referrals/me
POST /api/stripe/create-checkout-session
POST /api/stripe/webhook
GET  /api/admin/referral-summary

Parrainage :
- filleul : 30 % premier mois si STRIPE_COUPON_WELCOME_30 est configuré
- parrain : 1 € / mois par filleul actif
- validation après invoice.paid

Stripe CLI :
stripe listen --forward-to localhost:8787/api/stripe/webhook
