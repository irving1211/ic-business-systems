// SYNCED FROM ../../lead-audit-tool/src/audit-engine.mjs — do not edit here.
// Re-sync with: node lead-audit-tool/scripts/sync-shared.mjs

// IC Business Systems audit — scoring engine.
//
// Engine emits English strings by default (single source of truth in i18n.mjs).
// Use localizeResult(result, locale) from i18n.mjs to swap to ES at the
// render layer. The engine itself stays locale-neutral in shape: structural
// IDs + the English labels/issues/fixes for backwards compatibility with
// the formatScorecard / formatCrmExport consumers.

import { RESULT_STRINGS, summaryBandIdFromScore } from "./i18n.mjs";

const EN = RESULT_STRINGS.en;

// Pure helper: build a finding outcome from check ID + status.
function outcome(id, status, points) {
  const s = EN.checks[id].statuses[status];
  return {
    points,
    status,
    issue: s.issue,
    impact: s.impact,
    fix: s.fix,
    outreachHook: s.outreachHook
  };
}

const CHECK_DEFS = [
  {
    id: "phoneVisible",
    weight: 25,
    evaluate(value) {
      return value ? outcome("phoneVisible", "good", 25) : outcome("phoneVisible", "critical", 0);
    }
  },
  {
    id: "ctaClear",
    weight: 20,
    evaluate(value) {
      return value ? outcome("ctaClear", "good", 20) : outcome("ctaClear", "critical", 0);
    }
  },
  {
    id: "trustProof",
    weight: 20,
    evaluate(value) {
      return value ? outcome("trustProof", "good", 20) : outcome("trustProof", "critical", 0);
    }
  },
  {
    id: "formFriction",
    weight: 20,
    evaluate(value) {
      if (value === "low") return outcome("formFriction", "good", 20);
      if (value === "medium") return outcome("formFriction", "warning", 10);
      return outcome("formFriction", "critical", 0);
    }
  },
  {
    id: "mobileReadable",
    weight: 15,
    evaluate(value) {
      return value ? outcome("mobileReadable", "good", 15) : outcome("mobileReadable", "critical", 0);
    }
  }
];

function toPriority(score) {
  if (score <= 39) return "high";
  if (score <= 74) return "medium";
  return "low";
}

function buildOutreachMessage({ businessName, websiteUrl, niche, topLeak, summary }) {
  const nicheTag = niche && niche !== "other" ? ` (${niche})` : "";

  if (!topLeak) {
    return `Quick pass on ${businessName}${nicheTag} at ${websiteUrl}: the core lead path looks strong. ${summary} If you want, I can still send over a tighter operator-style audit with the next few improvements I'd test.`;
  }

  return `Quick pass on ${businessName}${nicheTag} at ${websiteUrl}: the biggest leak looks like ${topLeak.outreachHook}. ${topLeak.fix} If you want, I can send a short scorecard with the first fixes I'd make and how I'd frame it for more calls.`;
}

export function evaluateAudit(input) {
  const findings = CHECK_DEFS.map((check) => {
    const result = check.evaluate(input.checks[check.id]);
    return {
      id: check.id,
      label: EN.checks[check.id].label,
      weight: check.weight,
      ...result
    };
  });

  const score = findings.reduce((total, finding) => total + finding.points, 0);
  const topLeak =
    findings
      .filter((finding) => finding.points < finding.weight)
      .sort((left, right) => (right.weight - right.points) - (left.weight - left.points))[0] ?? null;

  const summaryBandId = summaryBandIdFromScore(score);
  const summary = EN.summary[summaryBandId];

  return {
    businessName: input.businessName,
    websiteUrl: input.websiteUrl,
    niche: input.niche ?? null,
    notes: input.notes ?? null,
    score,
    summary,
    summaryBandId,
    contactPriority: toPriority(score),
    findings,
    topLeak,
    outreachMessage: buildOutreachMessage({
      businessName: input.businessName,
      websiteUrl: input.websiteUrl,
      niche: input.niche ?? null,
      topLeak,
      summary
    })
  };
}
