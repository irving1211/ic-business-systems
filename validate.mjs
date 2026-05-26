// SYNCED FROM ../../lead-audit-tool/src/validate.mjs — do not edit here.
// Re-sync with: node lead-audit-tool/scripts/sync-shared.mjs

// IC Business Systems audit — input + handoff validation.
//
// Single normalization/validation surface for everything that crosses a trust
// boundary: raw form input on the audit page (validateAuditInput) and
// pendingAudit payload from sessionStorage on the contact page
// (validatePendingAudit). Both are pure functions, total, never throw.

export const NICHE_VALUES = Object.freeze([
  "plumbing",
  "hvac",
  "electrical",
  "landscaping",
  "roofing",
  "other"
]);

// Schema-version support range for sessionStorage payloads.
// MIGRATION POLICY: never break v-N in the same release that adds v-(N+1).
// Ship dual-support FIRST (e.g. range becomes {min:1, max:2}), soak >= 7d
// for cache turnover, THEN bump audit.js write-side to produce v=2. When
// dual-support window closes, drop v-1 by raising min.
export const PENDING_AUDIT_SUPPORTED_RANGE = Object.freeze({ min: 1, max: 1 });

const FRICTION_VALUES = Object.freeze(["low", "medium", "high"]);
const BOOL_CHECK_KEYS = Object.freeze([
  "phoneVisible",
  "ctaClear",
  "trustProof",
  "mobileReadable"
]);

const MAX_BUSINESS_NAME = 100;
const MAX_URL = 500;
const MAX_NOTES = 500;

function trimOrEmpty(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateAuditInput(raw) {
  const errors = [];
  const source = raw && typeof raw === "object" ? raw : {};

  const businessName = trimOrEmpty(source.business_name ?? source.businessName);
  if (!businessName) {
    errors.push("business_name: required");
  } else if (businessName.length > MAX_BUSINESS_NAME) {
    errors.push(`business_name: must be ${MAX_BUSINESS_NAME} characters or fewer`);
  }

  const websiteUrlRaw = trimOrEmpty(source.website_url ?? source.websiteUrl);
  let websiteUrl = "";
  if (!websiteUrlRaw) {
    errors.push("website_url: required");
  } else if (websiteUrlRaw.length > MAX_URL) {
    errors.push(`website_url: must be ${MAX_URL} characters or fewer`);
  } else {
    try {
      const parsed = new URL(websiteUrlRaw);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        errors.push("website_url: must use http:// or https://");
      } else {
        websiteUrl = parsed.toString();
      }
    } catch (e) {
      errors.push("website_url: not a valid URL");
    }
  }

  const nicheRaw = trimOrEmpty(source.niche).toLowerCase();
  if (!nicheRaw) {
    errors.push("niche: required");
  } else if (!NICHE_VALUES.includes(nicheRaw)) {
    errors.push(`niche: must be one of ${NICHE_VALUES.join(", ")}`);
  }

  const notesRaw = trimOrEmpty(source.notes);
  if (notesRaw.length > MAX_NOTES) {
    errors.push(`notes: must be ${MAX_NOTES} characters or fewer`);
  }

  const checksSource = source.checks && typeof source.checks === "object" ? source.checks : {};
  const checks = {};
  for (const key of BOOL_CHECK_KEYS) {
    const v = checksSource[key];
    if (v !== true && v !== false) {
      errors.push(`checks.${key}: must be true or false`);
    } else {
      checks[key] = v;
    }
  }
  const friction = checksSource.formFriction;
  if (!FRICTION_VALUES.includes(friction)) {
    errors.push(`checks.formFriction: must be one of ${FRICTION_VALUES.join(", ")}`);
  } else {
    checks.formFriction = friction;
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    input: {
      businessName,
      websiteUrl,
      niche: nicheRaw,
      notes: notesRaw,
      checks
    }
  };
}

// Relaxed-shape validator for sessionStorage handoff between audit.html and
// the contact form on index.html. Caller treats `null` as "no prefill" and
// no-ops. Never throws.
export function validatePendingAudit(raw) {
  if (!raw || typeof raw !== "object") return null;

  const v = raw.v;
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  if (v < PENDING_AUDIT_SUPPORTED_RANGE.min || v > PENDING_AUDIT_SUPPORTED_RANGE.max) {
    return null;
  }

  const ts = raw.ts;
  if (typeof ts !== "number" || !Number.isFinite(ts) || ts <= 0) return null;

  const score = raw.score;
  if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100) {
    return null;
  }

  const businessName = trimOrEmpty(raw.businessName).slice(0, MAX_BUSINESS_NAME);
  const websiteUrl = trimOrEmpty(raw.websiteUrl).slice(0, MAX_URL);
  const niche = trimOrEmpty(raw.niche).toLowerCase();
  const safeNiche = NICHE_VALUES.includes(niche) ? niche : "";

  const topLeakIssueRaw = raw.topLeakIssue;
  const topLeakFixRaw = raw.topLeakFix;
  const topLeakIssue = topLeakIssueRaw === null ? null : trimOrEmpty(topLeakIssueRaw).slice(0, 200);
  const topLeakFix = topLeakFixRaw === null ? null : trimOrEmpty(topLeakFixRaw).slice(0, 500);

  return {
    v,
    ts,
    score,
    businessName,
    websiteUrl,
    niche: safeNiche,
    topLeakIssue: topLeakIssue || null,
    topLeakFix: topLeakFix || null
  };
}
