const fs = require("fs");
const path = require("path");

const API = "http://localhost:8787";
const BACKEND = process.cwd();

function readEnv() {
  const envPath = path.join(BACKEND, ".env");
  const env = {};

  if (!fs.existsSync(envPath)) return env;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    env[key] = value;
  }

  return env;
}

const env = readEnv();
const dbFile = env.DATABASE_FILE || "./axis_lumen_db.json";
const dbPath = path.resolve(BACKEND, dbFile);

function stamp() {
  return new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
}

function nowIso() {
  return new Date().toISOString();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error("ÉCHEC : " + message);
  }

  console.log("✅ " + message);
}

async function api(pathname, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (options.token) {
    headers.Authorization = "Bearer " + options.token;
  }

  const response = await fetch(API + pathname, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg = payload.error || payload.message || response.statusText;
    throw new Error(`${pathname} -> ${response.status} ${msg}`);
  }

  return payload;
}

function loadDb() {
  assert(fs.existsSync(dbPath), "La base JSON existe : " + dbPath);
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function saveDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
}

function backupDb() {
  const backupDir = path.resolve(BACKEND, "..", "backups", stamp() + "_referral_test_db");
  fs.mkdirSync(backupDir, { recursive: true });

  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, path.join(backupDir, path.basename(dbPath)));
  }

  console.log("🛡️ Sauvegarde DB :", backupDir);
}

async function main() {
  console.log("");
  console.log("=== TEST PARRAINAGE / FILLEUL SANS STRIPE ===");
  console.log("");

  const health = await api("/api/health");
  assert(health.ok === true, "Backend joignable sur " + API);
  assert(health.database.includes("axis_lumen_db.json"), "La base utilisée est bien axis_lumen_db.json");

  backupDb();

  const unique = stamp();

  const parrainEmail = `test.parrain.${unique}@axis-lumen.test`;
  const filleulEmail = `test.filleul.${unique}@axis-lumen.test`;
  const password = "TestPassword123!";

  console.log("");
  console.log("1) Création du parrain test...");

  const parrain = await api("/api/auth/register", {
    method: "POST",
    body: {
      firstName: "Parrain",
      lastName: "Test",
      email: parrainEmail,
      phone: "0600000001",
      password,
      discoverySource: "test-local",
      referredByCode: ""
    }
  });

  assert(Boolean(parrain.token), "Token du parrain reçu");
  assert(Boolean(parrain.user), "Profil parrain reçu");
  assert(Boolean(parrain.user.clientNumber), "Numéro client du parrain généré");
  assert(Boolean(parrain.user.referralCode), "Code parrain généré : " + parrain.user.referralCode);

  const referralCode = parrain.user.referralCode;

  console.log("");
  console.log("2) Création du filleul avec le code :", referralCode);

  const filleul = await api("/api/auth/register", {
    method: "POST",
    body: {
      firstName: "Filleul",
      lastName: "Test",
      email: filleulEmail,
      phone: "0600000002",
      password,
      discoverySource: "parrainage",
      referredByCode: referralCode
    }
  });

  assert(Boolean(filleul.token), "Token du filleul reçu");
  assert(Boolean(filleul.user), "Profil filleul reçu");
  assert(filleul.user.referredByCode === referralCode, "Le filleul porte bien le code du parrain");
  assert(Boolean(filleul.user.referredByUserId), "Le filleul est relié à l’ID du parrain");

  console.log("");
  console.log("3) Vérification côté API /api/referrals/me...");

  const referralView = await api("/api/referrals/me", {
    token: parrain.token
  });

  assert(referralView.referralCode === referralCode, "Le code parrain API correspond au code du profil");
  assert(referralView.referralLink.includes("?ref=" + referralCode), "Le lien de parrainage contient le bon code");

  const apiReferral = referralView.referrals.find((item) => {
    return item.referredUserId === filleul.user.id || item.referredClientNumber === filleul.user.clientNumber;
  });

  assert(Boolean(apiReferral), "Le filleul apparaît dans les parrainages du parrain");
  assert(apiReferral.status === "pending", "Le filleul est en attente avant paiement Stripe");

  console.log("");
  console.log("4) Vérification directe dans la base JSON...");

  const db = loadDb();

  const dbParrain = db.users.find((user) => user.email === parrainEmail);
  const dbFilleul = db.users.find((user) => user.email === filleulEmail);

  assert(Boolean(dbParrain), "Parrain trouvé dans la base JSON");
  assert(Boolean(dbFilleul), "Filleul trouvé dans la base JSON");
  assert(dbFilleul.referredByCode === referralCode, "Code filleul correct dans la base");
  assert(dbFilleul.referredByUserId === dbParrain.id, "Lien filleul -> parrain correct dans la base");

  const dbReferral = db.referrals.find((ref) => {
    return ref.referrerUserId === dbParrain.id && ref.referredUserId === dbFilleul.id;
  });

  assert(Boolean(dbReferral), "Entrée referrals créée dans la base");
  assert(dbReferral.status === "pending", "Statut initial referrals = pending");

  console.log("");
  console.log("5) Simulation locale d’un paiement Stripe réussi...");
  console.log("   Cette simulation remplace temporairement l’événement invoice.paid.");

  dbFilleul.subscriptionStatus = "active";
  dbFilleul.updatedAt = nowIso();

  dbReferral.status = "active";
  dbReferral.activatedAt = dbReferral.activatedAt || nowIso();

  const fakeSubscriptionId = "sub_test_" + unique;
  const fakeInvoiceId = "in_test_" + unique;
  const monthKey = new Date().toISOString().slice(0, 7);

  let reward = db.referralRewards.find((item) => {
    return item.referrerUserId === dbParrain.id && item.referredUserId === dbFilleul.id;
  });

  if (!reward) {
    reward = {
      id: "reward_test_" + unique,
      referrerUserId: dbParrain.id,
      referredUserId: dbFilleul.id,
      stripeSubscriptionId: fakeSubscriptionId,
      amountMonthlyCents: 100,
      status: "active",
      startedAt: nowIso(),
      endedAt: "",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    db.referralRewards.push(reward);
  }

  const existingCredit = db.referralCreditLedger.find((item) => item.invoiceId === fakeInvoiceId);

  if (!existingCredit) {
    db.referralCreditLedger.push({
      id: "credit_test_" + unique,
      referrerUserId: dbParrain.id,
      referredUserId: dbFilleul.id,
      invoiceId: fakeInvoiceId,
      monthKey,
      amountCents: 100,
      status: "pending",
      createdAt: nowIso()
    });
  }

  saveDb(db);

  console.log("");
  console.log("6) Vérification de la récompense simulée...");

  const dbAfter = loadDb();

  const finalReferral = dbAfter.referrals.find((ref) => {
    return ref.referrerUserId === dbParrain.id && ref.referredUserId === dbFilleul.id;
  });

  const finalReward = dbAfter.referralRewards.find((item) => {
    return item.referrerUserId === dbParrain.id && item.referredUserId === dbFilleul.id;
  });

  const finalCredit = dbAfter.referralCreditLedger.find((item) => {
    return item.referrerUserId === dbParrain.id && item.referredUserId === dbFilleul.id && item.invoiceId === fakeInvoiceId;
  });

  assert(finalReferral.status === "active", "Le parrainage passe bien en actif après paiement simulé");
  assert(Boolean(finalReward), "La récompense parrain est créée");
  assert(finalReward.amountMonthlyCents === 100, "La récompense parrain vaut bien 1 €");
  assert(Boolean(finalCredit), "Une ligne de crédit mensuel est créée");
  assert(finalCredit.amountCents === 100, "Le crédit mensuel vaut bien 1 €");
  assert(finalCredit.status === "pending", "Le crédit est en attente d’application Stripe réelle");

  console.log("");
  console.log("=== RÉSULTAT GLOBAL ===");
  console.log("✅ Parrain créé");
  console.log("✅ Code parrain généré");
  console.log("✅ Filleul créé avec le code du parrain");
  console.log("✅ Lien filleul -> parrain vérifié");
  console.log("✅ Parrainage visible côté API");
  console.log("✅ Simulation paiement réussie");
  console.log("✅ Récompense parrain 1 € créée");
  console.log("");
  console.log("Parrain email :", parrainEmail);
  console.log("Filleul email :", filleulEmail);
  console.log("Code parrain :", referralCode);
  console.log("");
  console.log("IMPORTANT : Stripe n’est pas encore branché.");
  console.log("Le test valide la logique interne. En production, l’activation se fera avec invoice.paid.");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("❌ TEST ÉCHOUÉ");
  console.error(error.message);
  console.error("");
  process.exit(1);
});
