const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = Number(process.env.PORT || 8787);
const DB_PATH = path.join(__dirname, "axis_lumen_db.json");

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "AXIS_ADMIN_LOCAL";
const COMMISSION_RATE = Number(process.env.COMMISSION_RATE || 0.20);
const DEFAULT_CURRENCY = "EUR";

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({
  limit: "2mb"
}));

function nowIso() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

function cleanEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function cleanCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 24);
}

function money(cents) {
  return Math.round(Number(cents || 0));
}

function emptyDb() {
  return {
    users: [],
    commissions: [],
    events: [],
    settings: {
      commissionRate: COMMISSION_RATE,
      currency: DEFAULT_CURRENCY
    }
  };
}

function normalizeDb(db) {
  if (!db || typeof db !== "object") db = emptyDb();

  if (!Array.isArray(db.users)) db.users = [];
  if (!Array.isArray(db.commissions)) db.commissions = [];
  if (!Array.isArray(db.events)) db.events = [];

  if (!db.settings || typeof db.settings !== "object") {
    db.settings = {};
  }

  if (typeof db.settings.commissionRate !== "number") {
    db.settings.commissionRate = COMMISSION_RATE;
  }

  if (!db.settings.currency) {
    db.settings.currency = DEFAULT_CURRENCY;
  }

  return db;
}

function loadDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const db = emptyDb();
      saveDb(db);
      return db;
    }

    const raw = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(raw || "{}");

    return normalizeDb(parsed);
  } catch (error) {
    console.error("Erreur lecture DB:", error);
    return emptyDb();
  }
}

function saveDb(db) {
  const normalized = normalizeDb(db);
  fs.writeFileSync(DB_PATH, JSON.stringify(normalized, null, 2), "utf8");
}

function addEvent(db, type, payload) {
  db.events.push({
    id: id("evt"),
    type,
    createdAt: nowIso(),
    payload: payload || {}
  });
}

function passwordHash(password, salt) {
  const usedSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(String(password || ""), usedSalt, 120000, 32, "sha256").toString("hex");

  return `${usedSalt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored || !stored.includes(":")) return false;

  const [salt, expected] = stored.split(":");
  const actual = crypto.pbkdf2Sync(String(password || ""), salt, 120000, 32, "sha256").toString("hex");

  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

function signToken(payload) {
  const secret = process.env.AUTH_SECRET || "axis-lumen-local-secret";
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");

  return `${data}.${sig}`;
}

function readToken(token) {
  try {
    const secret = process.env.AUTH_SECRET || "axis-lumen-local-secret";
    const [data, sig] = String(token || "").split(".");

    if (!data || !sig) return null;

    const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");

    if (expected !== sig) return null;

    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));

    if (payload.exp && Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

function tokenFor(user) {
  return signToken({
    uid: user.id,
    email: user.email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30
  });
}

function publicUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    clientNumber: user.clientNumber,
    name: user.name,
    email: user.email,
    referralCode: user.referralCode,
    referredByCode: user.referredByCode || "",
    referredByUserId: user.referredByUserId || "",
    subscription: user.subscription || {
      status: "inactive"
    },
    createdAt: user.createdAt
  };
}

function uniqueClientNumber(db) {
  let value = "";

  do {
    value = "AX-" + String(Math.floor(100000 + Math.random() * 900000));
  } while (db.users.some(u => u.clientNumber === value));

  return value;
}

function uniqueReferralCode(db, name) {
  const base = cleanCode(String(name || "AXIS").slice(0, 6)) || "AXIS";
  let value = "";

  do {
    value = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
  } while (db.users.some(u => u.referralCode === value));

  return value;
}

function findUserByEmail(db, email) {
  const clean = cleanEmail(email);
  return db.users.find(u => cleanEmail(u.email) === clean) || null;
}

function findUserById(db, idValue) {
  return db.users.find(u => u.id === idValue) || null;
}

function findUserByReferralCode(db, code) {
  const clean = cleanCode(code);
  if (!clean) return null;

  return db.users.find(u => cleanCode(u.referralCode) === clean) || null;
}

function extractReferralCode(body) {
  return cleanCode(
    body.referralCode ||
    body.referral_code ||
    body.ref ||
    body.referral ||
    body.codeParrain ||
    body.parrainCode ||
    body.sponsorCode ||
    ""
  );
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  const payload = readToken(token);

  if (!payload || !payload.uid) {
    return res.status(401).json({
      ok: false,
      error: "AUTH_REQUIRED"
    });
  }

  const db = loadDb();
  const user = findUserById(db, payload.uid);

  if (!user) {
    return res.status(401).json({
      ok: false,
      error: "USER_NOT_FOUND"
    });
  }

  req.db = db;
  req.user = user;
  next();
}

function admin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace(/^Bearer\s+/i, "").trim() || req.headers["x-admin-token"];

  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({
      ok: false,
      error: "ADMIN_TOKEN_REQUIRED"
    });
  }

  req.db = loadDb();
  next();
}

function referralLink(code) {
  return `/login.html?ref=${encodeURIComponent(code || "")}`;
}

function commissionSummaryForUser(db, user) {
  const commissions = db.commissions.filter(c => c.referrerUserId === user.id);

  const pendingCents = commissions
    .filter(c => c.status === "pending")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  const payableCents = commissions
    .filter(c => c.status === "payable")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  const paidCents = commissions
    .filter(c => c.status === "paid")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  return {
    totalCommissions: commissions.length,
    pendingCents,
    payableCents,
    paidCents,
    currency: db.settings.currency || DEFAULT_CURRENCY
  };
}

function creditReferrer(db, referredUser, sale) {
  if (!referredUser || !referredUser.referredByUserId) return null;

  const referrer = findUserById(db, referredUser.referredByUserId);
  if (!referrer) return null;

  const sourcePaymentId = sale.sourcePaymentId || id("pay");

  const existing = db.commissions.find(c => c.sourcePaymentId === sourcePaymentId);
  if (existing) return existing;

  const saleAmountCents = money(sale.amountCents);
  const rate = Number(db.settings.commissionRate || COMMISSION_RATE);
  const amountCents = money(saleAmountCents * rate);

  const commission = {
    id: id("com"),
    referrerUserId: referrer.id,
    referrerEmail: referrer.email,
    referredUserId: referredUser.id,
    referredEmail: referredUser.email,
    referralCode: referrer.referralCode,
    saleAmountCents,
    amountCents,
    commissionRate: rate,
    currency: sale.currency || db.settings.currency || DEFAULT_CURRENCY,
    plan: sale.plan || "unknown",
    sourcePaymentId,
    status: "payable",
    createdAt: nowIso(),
    paidAt: "",
    payoutReference: "",
    note: ""
  };

  db.commissions.push(commission);

  addEvent(db, "commission_created", {
    commissionId: commission.id,
    referrerUserId: referrer.id,
    referredUserId: referredUser.id,
    amountCents: commission.amountCents
  });

  return commission;
}

function activateReferral(db, user, sale) {
  user.subscription = {
    status: "active",
    plan: sale.plan || "unknown",
    amountCents: money(sale.amountCents),
    currency: sale.currency || DEFAULT_CURRENCY,
    activatedAt: nowIso(),
    sourcePaymentId: sale.sourcePaymentId || ""
  };

  addEvent(db, "subscription_activated", {
    userId: user.id,
    email: user.email,
    amountCents: money(sale.amountCents),
    plan: sale.plan || "unknown"
  });

  return creditReferrer(db, user, sale);
}

function globalSummary(db) {
  const commissions = db.commissions;

  const pendingCents = commissions
    .filter(c => c.status === "pending")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  const payableCents = commissions
    .filter(c => c.status === "payable")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  const paidCents = commissions
    .filter(c => c.status === "paid")
    .reduce((sum, c) => sum + money(c.amountCents), 0);

  return {
    users: db.users.length,
    referrals: db.users.filter(u => u.referredByUserId).length,
    commissions: commissions.length,
    pendingCents,
    payableCents,
    paidCents,
    currency: db.settings.currency || DEFAULT_CURRENCY,
    commissionRate: db.settings.commissionRate || COMMISSION_RATE
  };
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "axis-lumen-backend",
    time: nowIso(),
    port: PORT
  });
});

app.post("/api/auth/register", (req, res) => {
  const db = loadDb();
  const body = req.body || {};

  const email = cleanEmail(body.email);
  const password = String(body.password || "");
  const name = String(body.name || body.fullName || body.displayName || "").trim();

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      ok: false,
      error: "EMAIL_REQUIRED"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      ok: false,
      error: "PASSWORD_MIN_6"
    });
  }

  if (findUserByEmail(db, email)) {
    return res.status(409).json({
      ok: false,
      error: "EMAIL_ALREADY_EXISTS"
    });
  }

  const incomingCode = extractReferralCode(body);
  const referrer = incomingCode ? findUserByReferralCode(db, incomingCode) : null;

  const user = {
    id: id("usr"),
    clientNumber: uniqueClientNumber(db),
    name: name || email.split("@")[0],
    email,
    passwordHash: passwordHash(password),
    referralCode: uniqueReferralCode(db, name || email),
    referredByCode: referrer ? referrer.referralCode : incomingCode,
    referredByUserId: referrer ? referrer.id : "",
    role: "customer",
    subscription: {
      status: "inactive"
    },
    createdAt: nowIso(),
    updatedAt: nowIso()
  };

  db.users.push(user);

  addEvent(db, "user_registered", {
    userId: user.id,
    email: user.email,
    referredByUserId: user.referredByUserId,
    referredByCode: user.referredByCode
  });

  saveDb(db);

  res.status(201).json({
    ok: true,
    token: tokenFor(user),
    user: publicUser(user),
    referral: {
      code: user.referralCode,
      link: referralLink(user.referralCode)
    }
  });
});

app.post("/api/auth/login", (req, res) => {
  const db = loadDb();
  const email = cleanEmail(req.body && req.body.email);
  const password = String(req.body && req.body.password || "");

  const user = findUserByEmail(db, email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({
      ok: false,
      error: "INVALID_LOGIN"
    });
  }

  res.json({
    ok: true,
    token: tokenFor(user),
    user: publicUser(user),
    referral: {
      code: user.referralCode,
      link: referralLink(user.referralCode)
    }
  });
});

app.get("/api/profile/me", auth, (req, res) => {
  res.json({
    ok: true,
    user: publicUser(req.user)
  });
});

app.get("/api/referrals/me", auth, (req, res) => {
  const db = req.db;
  const user = req.user;

  const filleuls = db.users
    .filter(u => u.referredByUserId === user.id)
    .map(u => ({
      id: u.id,
      clientNumber: u.clientNumber,
      name: u.name,
      email: u.email,
      subscriptionStatus: u.subscription && u.subscription.status || "inactive",
      createdAt: u.createdAt
    }));

  const commissions = db.commissions
    .filter(c => c.referrerUserId === user.id)
    .map(c => ({
      id: c.id,
      referredEmail: c.referredEmail,
      saleAmountCents: c.saleAmountCents,
      amountCents: c.amountCents,
      commissionRate: c.commissionRate,
      currency: c.currency,
      plan: c.plan,
      status: c.status,
      createdAt: c.createdAt,
      paidAt: c.paidAt,
      payoutReference: c.payoutReference
    }));

  res.json({
    ok: true,
    user: publicUser(user),
    referral: {
      code: user.referralCode,
      link: referralLink(user.referralCode)
    },
    filleuls,
    commissions,
    summary: commissionSummaryForUser(db, user)
  });
});

app.get("/api/admin/referral-summary", admin, (req, res) => {
  const db = req.db;

  res.json({
    ok: true,
    summary: globalSummary(db),
    users: db.users.map(u => ({
      id: u.id,
      clientNumber: u.clientNumber,
      name: u.name,
      email: u.email,
      referralCode: u.referralCode,
      referredByCode: u.referredByCode,
      referredByUserId: u.referredByUserId,
      subscriptionStatus: u.subscription && u.subscription.status || "inactive",
      subscriptionPlan: u.subscription && u.subscription.plan || "",
      createdAt: u.createdAt
    })),
    commissions: db.commissions,
    events: db.events.slice(-100).reverse()
  });
});

app.post("/api/test/simulate-payment", admin, (req, res) => {
  const db = req.db;
  const body = req.body || {};

  const email = cleanEmail(body.email);
  const userId = body.userId || "";

  const user = userId ? findUserById(db, userId) : findUserByEmail(db, email);

  if (!user) {
    return res.status(404).json({
      ok: false,
      error: "USER_NOT_FOUND"
    });
  }

  const sale = {
    amountCents: money(body.amountCents || 1900),
    currency: body.currency || DEFAULT_CURRENCY,
    plan: body.plan || "monthly",
    sourcePaymentId: body.sourcePaymentId || id("testpay")
  };

  const commission = activateReferral(db, user, sale);

  saveDb(db);

  res.json({
    ok: true,
    user: publicUser(user),
    sale,
    commission,
    summary: globalSummary(db)
  });
});

app.patch("/api/admin/commissions/:id/pay", admin, (req, res) => {
  const db = req.db;
  const commission = db.commissions.find(c => c.id === req.params.id);

  if (!commission) {
    return res.status(404).json({
      ok: false,
      error: "COMMISSION_NOT_FOUND"
    });
  }

  commission.status = "paid";
  commission.paidAt = nowIso();
  commission.payoutReference = String(req.body && req.body.payoutReference || "");
  commission.note = String(req.body && req.body.note || "");

  addEvent(db, "commission_paid", {
    commissionId: commission.id,
    amountCents: commission.amountCents,
    payoutReference: commission.payoutReference
  });

  saveDb(db);

  res.json({
    ok: true,
    commission,
    summary: globalSummary(db)
  });
});

app.post("/api/stripe/create-checkout-session", auth, (req, res) => {
  res.json({
    ok: false,
    mode: "not_connected",
    message: "Stripe Checkout Session n'est pas encore relié. Utilise Payment Links côté front ou ajoute STRIPE_SECRET_KEY côté serveur.",
    user: publicUser(req.user)
  });
});

app.post("/api/stripe/webhook", (req, res) => {
  const db = loadDb();
  const event = req.body || {};

  addEvent(db, "stripe_webhook_received", {
    type: event.type || "unknown"
  });

  saveDb(db);

  res.json({
    ok: true,
    received: true,
    message: "Webhook reçu. La validation Stripe réelle sera activée avec STRIPE_SECRET_KEY et signature webhook."
  });
});

app.listen(PORT, () => {
  console.log(`Axis Lumen backend actif : http://127.0.0.1:${PORT}`);
  console.log(`Admin token local : ${ADMIN_TOKEN}`);
});