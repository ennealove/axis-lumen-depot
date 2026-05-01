from pathlib import Path
from datetime import datetime
import shutil

BACKEND = Path(r"C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\backend")
ROOT = BACKEND.parent
BACKUP = ROOT / "backups" / (datetime.now().strftime("%Y%m%d_%H%M%S") + "_backend_no_native_db")

def backup(path):
    if path.exists():
        rel = path.relative_to(ROOT)
        dest = BACKUP / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, dest)

def write(path, content):
    backup(path)
    path.write_text(content, encoding="utf-8", newline="")

package_json = r'''{
  "name": "axis-lumen-backend",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "stripe": "^16.0.0"
  }
}
'''

server_js = r'''require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8787);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8000";
const JWT_SECRET = process.env.JWT_SECRET || "DEV_ONLY_CHANGE_ME";
const DB_FILE = process.env.DATABASE_FILE || "./axis_lumen_db.json";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY || "";
const STRIPE_PRICE_YEARLY = process.env.STRIPE_PRICE_YEARLY || "";
const STRIPE_COUPON_WELCOME_30 = process.env.STRIPE_COUPON_WELCOME_30 || "";

const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL || `${FRONTEND_URL}/?checkout=success`;
const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL || `${FRONTEND_URL}/?checkout=cancel`;

const REFERRAL_REWARD_CENTS = Number(process.env.REFERRAL_REWARD_CENTS || 100);
const REFERRAL_MONTHLY_CAP_CENTS = Number(process.env.REFERRAL_MONTHLY_CAP_CENTS || 1900);
const APPLY_CREDITS = String(process.env.STRIPE_APPLY_REFERRER_CREDITS || "false") === "true";

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
const app = express();

const dbPath = path.resolve(__dirname, DB_FILE);

function emptyDb() {
  return {
    users: [],
    referrals: [],
    subscriptions: [],
    referralRewards: [],
    referralCreditLedger: [],
    stripeEvents: []
  };
}

function loadDb() {
  if (!fs.existsSync(dbPath)) {
    const initial = emptyDb();
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    return { ...emptyDb(), ...parsed };
  } catch {
    const initial = emptyDb();
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

let db = loadDb();

function saveDb() {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
}

function nowIso() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString("hex")}`;
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 32);
}

function clientNumber() {
  return `AXIS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function referralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "AXIS-";

  for (let i = 0; i < 5; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }

  return out;
}

function addDays(days) {
  return new Date(Date.now() + days * 86400000).toISOString();
}

function findUserById(userId) {
  return db.users.find((user) => user.id === userId) || null;
}

function findUserByEmail(email) {
  return db.users.find((user) => user.email === cleanEmail(email)) || null;
}

function findUserByReferralCode(code) {
  const finalCode = cleanCode(code);
  return db.users.find((user) => user.referralCode === finalCode) || null;
}

function uniqueClientNumber() {
  let number = clientNumber();

  while (db.users.some((user) => user.clientNumber === number)) {
    number = clientNumber();
  }

  return number;
}

function uniqueReferralCode() {
  let code = referralCode();

  while (db.users.some((user) => user.referralCode === code)) {
    code = referralCode();
  }

  return code;
}

function publicUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    clientNumber: user.clientNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    referralCode: user.referralCode,
    referredByCode: user.referredByCode,
    referredByUserId: user.referredByUserId,
    discoverySource: user.discoverySource,
    stripeCustomerId: user.stripeCustomerId,
    subscriptionStatus: user.subscriptionStatus,
    trialStartedAt: user.trialStartedAt,
    trialEndsAt: user.trialEndsAt,
    createdAt: user.createdAt
  };
}

function tokenFor(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "missing_token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: "user_not_found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "invalid_token" });
  }
}

function seedAdmin() {
  const adminEmail = cleanEmail(process.env.ADMIN_EMAIL || "");
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) return;

  if (findUserByEmail(adminEmail)) return;

  db.users.push({
    id: id("user"),
    clientNumber: uniqueClientNumber(),
    firstName: "Admin",
    lastName: "Axis Lumen",
    email: adminEmail,
    phone: "",
    passwordHash: bcrypt.hashSync(adminPassword, 12),
    role: "admin",
    referralCode: uniqueReferralCode(),
    referredByCode: "",
    referredByUserId: "",
    discoverySource: "admin",
    stripeCustomerId: "",
    subscriptionStatus: "active",
    trialStartedAt: nowIso(),
    trialEndsAt: addDays(3650),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });

  saveDb();
  console.log("Admin créé :", adminEmail);
}

seedAdmin();

/* Webhook Stripe : doit rester avant express.json() */
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: "stripe_not_configured" });
  }

  let event;

  try {
    if (STRIPE_WEBHOOK_SECRET) {
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(req.body.toString("utf8"));
    }
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  try {
    if (db.stripeEvents.some((stored) => stored.id === event.id)) {
      return res.json({ received: true, duplicate: true });
    }

    db.stripeEvents.push({
      id: event.id,
      type: event.type,
      createdAt: nowIso()
    });

    if (event.type === "checkout.session.completed") {
      await checkoutCompleted(event.data.object);
    }

    if (event.type === "invoice.paid") {
      await invoicePaid(event.data.object);
    }

    if (event.type === "invoice.payment_failed") {
      await invoiceFailed(event.data.object);
    }

    if (event.type === "customer.subscription.updated") {
      await subscriptionUpdated(event.data.object);
    }

    if (event.type === "customer.subscription.deleted") {
      await subscriptionDeleted(event.data.object);
    }

    saveDb();
    res.json({ received: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "webhook_failed" });
  }
});

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Axis Lumen Backend",
    database: dbPath,
    stripeConfigured: Boolean(stripe),
    users: db.users.length,
    referrals: db.referrals.length,
    time: nowIso()
  });
});

app.post("/api/auth/register", async (req, res) => {
  const body = req.body || {};
  const finalEmail = cleanEmail(body.email);

  if (!body.firstName || !body.lastName || !finalEmail || !body.password) {
    return res.status(400).json({ error: "missing_required_fields" });
  }

  if (findUserByEmail(finalEmail)) {
    return res.status(409).json({ error: "email_already_exists" });
  }

  const referredByCode = cleanCode(body.referredByCode);
  const referrer = referredByCode ? findUserByReferralCode(referredByCode) : null;

  const user = {
    id: id("user"),
    clientNumber: uniqueClientNumber(),
    firstName: String(body.firstName).trim(),
    lastName: String(body.lastName).trim(),
    email: finalEmail,
    phone: String(body.phone || "").trim(),
    passwordHash: await bcrypt.hash(String(body.password), 12),
    role: "user",
    referralCode: uniqueReferralCode(),
    referredByCode,
    referredByUserId: referrer ? referrer.id : "",
    discoverySource: String(body.discoverySource || "").trim(),
    stripeCustomerId: "",
    subscriptionStatus: "trialing",
    trialStartedAt: nowIso(),
    trialEndsAt: addDays(7),
    createdAt: nowIso(),
    updatedAt: nowIso()
  };

  db.users.push(user);

  if (referrer) {
    db.referrals.push({
      id: id("ref"),
      referrerUserId: referrer.id,
      referredUserId: user.id,
      referralCodeUsed: referredByCode,
      status: "pending",
      createdAt: nowIso(),
      activatedAt: "",
      cancelledAt: ""
    });
  }

  saveDb();

  res.status(201).json({
    token: tokenFor(user),
    user: publicUser(user)
  });
});

app.post("/api/auth/login", async (req, res) => {
  const finalEmail = cleanEmail(req.body?.email);
  const password = String(req.body?.password || "");

  const user = findUserByEmail(finalEmail);

  if (!user) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  res.json({
    token: tokenFor(user),
    user: publicUser(user)
  });
});

app.get("/api/profile/me", auth, (req, res) => {
  res.json({
    user: publicUser(req.user),
    referralLink: `${FRONTEND_URL}/?ref=${req.user.referralCode}`
  });
});

app.get("/api/referrals/me", auth, (req, res) => {
  const referrals = db.referrals
    .filter((referral) => referral.referrerUserId === req.user.id)
    .map((referral) => {
      const referred = findUserById(referral.referredUserId);

      return {
        ...referral,
        referredClientNumber: referred?.clientNumber || "",
        referredFirstName: referred?.firstName || "",
        referredLastName: referred?.lastName || "",
        referredSubscriptionStatus: referred?.subscriptionStatus || ""
      };
    });

  const activeCount = referrals.filter((item) => item.status === "active").length;

  res.json({
    referralCode: req.user.referralCode,
    referralLink: `${FRONTEND_URL}/?ref=${req.user.referralCode}`,
    activeCount,
    monthlyDiscountCents: activeCount * REFERRAL_REWARD_CENTS,
    referrals
  });
});

app.post("/api/stripe/create-checkout-session", auth, async (req, res) => {
  const plan = String(req.body?.plan || "monthly");
  const priceId = plan === "yearly" ? STRIPE_PRICE_YEARLY : STRIPE_PRICE_MONTHLY;

  const metadata = {
    userId: req.user.id,
    clientNumber: req.user.clientNumber,
    email: req.user.email,
    plan,
    referralCode: req.user.referralCode,
    referredByCode: req.user.referredByCode || "",
    referredByUserId: req.user.referredByUserId || "",
    discoverySource: req.user.discoverySource || ""
  };

  if (!stripe || !priceId) {
    return res.status(503).json({
      error: "stripe_not_configured",
      message: "Stripe n’est pas encore configuré.",
      metadata
    });
  }

  let customerId = req.user.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: req.user.email,
      name: `${req.user.firstName} ${req.user.lastName}`.trim(),
      phone: req.user.phone || undefined,
      metadata
    });

    customerId = customer.id;
    req.user.stripeCustomerId = customerId;
    req.user.updatedAt = nowIso();
    saveDb();
  }

  const session = {
    mode: "subscription",
    customer: customerId,
    client_reference_id: req.user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: STRIPE_SUCCESS_URL,
    cancel_url: STRIPE_CANCEL_URL,
    metadata,
    subscription_data: { metadata }
  };

  if (req.user.referredByUserId && STRIPE_COUPON_WELCOME_30) {
    session.discounts = [{ coupon: STRIPE_COUPON_WELCOME_30 }];
  } else {
    session.allow_promotion_codes = true;
  }

  const checkout = await stripe.checkout.sessions.create(session);

  res.json({
    url: checkout.url,
    sessionId: checkout.id
  });
});

app.get("/api/admin/referral-summary", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  res.json({
    users: db.users.map(publicUser),
    referrals: db.referrals,
    rewards: db.referralRewards,
    credits: db.referralCreditLedger
  });
});

async function checkoutCompleted(session) {
  const userId = session.client_reference_id || session.metadata?.userId;
  const user = findUserById(userId);

  if (!user) return;

  user.stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id || user.stripeCustomerId;

  user.subscriptionStatus = "active";
  user.updatedAt = nowIso();

  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id || "";

  if (subscriptionId) {
    upsertSubscription(user, user.stripeCustomerId, subscriptionId, session.metadata?.plan || "", "active");
  }
}

async function invoicePaid(invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;

  const user = db.users.find((item) => item.stripeCustomerId === customerId);
  if (!user) return;

  const subscriptionId =
    typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id || "";

  user.subscriptionStatus = "active";
  user.updatedAt = nowIso();

  if (subscriptionId) {
    upsertSubscription(user, customerId, subscriptionId, "", "active");
  }

  await activateReferral(user, invoice, subscriptionId);
}

async function invoiceFailed(invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;

  const user = db.users.find((item) => item.stripeCustomerId === customerId);
  if (!user) return;

  user.subscriptionStatus = "past_due";
  user.updatedAt = nowIso();
}

async function subscriptionUpdated(subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  if (!customerId) return;

  const user = db.users.find((item) => item.stripeCustomerId === customerId);
  if (!user) return;

  const status = subscription.status || "unknown";
  user.subscriptionStatus = status;
  user.updatedAt = nowIso();

  upsertSubscription(user, customerId, subscription.id, "", status);
}

async function subscriptionDeleted(subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  if (!customerId) return;

  const user = db.users.find((item) => item.stripeCustomerId === customerId);
  if (!user) return;

  user.subscriptionStatus = "canceled";
  user.updatedAt = nowIso();

  db.referrals.forEach((referral) => {
    if (referral.referredUserId === user.id) {
      referral.status = "cancelled";
      referral.cancelledAt = nowIso();
    }
  });

  db.referralRewards.forEach((reward) => {
    if (reward.referredUserId === user.id && reward.status === "active") {
      reward.status = "ended";
      reward.endedAt = nowIso();
      reward.updatedAt = nowIso();
    }
  });
}

function upsertSubscription(user, customerId, subscriptionId, plan, status) {
  let sub = db.subscriptions.find((item) => item.stripeSubscriptionId === subscriptionId);

  if (!sub) {
    sub = {
      id: id("sub"),
      userId: user.id,
      stripeCustomerId: customerId || "",
      stripeSubscriptionId: subscriptionId || "",
      plan: plan || "",
      status: status || "",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    db.subscriptions.push(sub);
    return;
  }

  sub.status = status || sub.status;
  sub.updatedAt = nowIso();
}

async function activateReferral(referredUser, invoice, subscriptionId) {
  if (!referredUser.referredByUserId) return;

  const referrer = findUserById(referredUser.referredByUserId);
  if (!referrer) return;

  const referral = db.referrals.find((item) => item.referredUserId === referredUser.id);

  if (referral) {
    referral.status = "active";
    referral.activatedAt = referral.activatedAt || nowIso();
  }

  let reward = db.referralRewards.find(
    (item) => item.referrerUserId === referrer.id && item.referredUserId === referredUser.id
  );

  if (!reward) {
    reward = {
      id: id("reward"),
      referrerUserId: referrer.id,
      referredUserId: referredUser.id,
      stripeSubscriptionId: subscriptionId || "",
      amountMonthlyCents: REFERRAL_REWARD_CENTS,
      status: "active",
      startedAt: nowIso(),
      endedAt: "",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    db.referralRewards.push(reward);
  } else {
    reward.status = "active";
    reward.updatedAt = nowIso();
  }

  await creditReferrer(referrer, referredUser, invoice);
}

async function creditReferrer(referrer, referredUser, invoice) {
  if (!invoice.id) return;

  if (db.referralCreditLedger.some((item) => item.invoiceId === invoice.id)) return;

  const date = invoice.period_start ? new Date(invoice.period_start * 1000) : new Date();
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const alreadyCredited = db.referralCreditLedger
    .filter((item) => item.referrerUserId === referrer.id && item.monthKey === monthKey)
    .reduce((sum, item) => sum + Number(item.amountCents || 0), 0);

  const remaining = Math.max(0, REFERRAL_MONTHLY_CAP_CENTS - alreadyCredited);
  const amount = Math.min(REFERRAL_REWARD_CENTS, remaining);

  if (amount <= 0) return;

  let status = "pending";

  if (APPLY_CREDITS && stripe && referrer.stripeCustomerId) {
    await stripe.customers.createBalanceTransaction(referrer.stripeCustomerId, {
      amount: -amount,
      currency: "eur",
      description: `Réduction parrainage Axis Lumen — filleul ${referredUser.clientNumber}`,
      metadata: {
        referrerUserId: referrer.id,
        referredUserId: referredUser.id,
        invoiceId: invoice.id
      }
    });

    status = "applied";
  }

  db.referralCreditLedger.push({
    id: id("credit"),
    referrerUserId: referrer.id,
    referredUserId: referredUser.id,
    invoiceId: invoice.id,
    monthKey,
    amountCents: amount,
    status,
    createdAt: nowIso()
  });
}

app.listen(PORT, () => {
  console.log("");
  console.log("AXIS LUMEN BACKEND prêt");
  console.log(`URL : http://localhost:${PORT}`);
  console.log(`Base : ${dbPath}`);
  console.log(`Stripe configuré : ${stripe ? "oui" : "non"}`);
  console.log("");
});
'''

readme = r'''AXIS LUMEN BACKEND — VERSION SANS COMPILATION NATIVE

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
'''

start_backend = r'''cd "$PSScriptRoot"
npm run dev
'''

BACKUP.mkdir(parents=True, exist_ok=True)

write(BACKEND / "package.json", package_json)
write(BACKEND / "server.js", server_js)
write(BACKEND / "README.txt", readme)
write(BACKEND / "start-backend.ps1", start_backend)

print("")
print("Backend corrigé : dépendance native better-sqlite3 supprimée.")
print("Base locale remplacée par axis_lumen_db.json.")
print("Fichiers modifiés :")
print("- package.json")
print("- server.js")
print("- README.txt")
print("- start-backend.ps1")
print("")
print("Maintenant lance :")
print("npm install")
print("npm run dev")
