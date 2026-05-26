// audit.js — DOM wiring for the public guided 5-check audit.
// Pure orchestrator: validates with validate.mjs, runs evaluateAudit, then
// localizeResult before rendering. Re-renders on language change so EN/ES
// toggle swaps the entire results pane (not just static [data-i18n] copy).

import { evaluateAudit } from "./audit-engine.mjs?v=1";
import { validateAuditInput } from "./validate.mjs?v=1";
import { localizeResult, getActiveLocale } from "./i18n.mjs?v=1";

const STORAGE_KEY = "icbs.pendingAudit";
const PAYLOAD_SCHEMA_VERSION = 1;

// Module-level cache of the most recent successful result. Re-render reads
// from this when the user flips language after submitting.
let lastResult = null;

const track = (event) => {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    try { window.plausible(event); } catch (e) { /* never throw on telemetry */ }
  }
};

function readInputs(form) {
  const fd = new FormData(form);
  const friction = fd.get("formFriction");
  return {
    business_name: fd.get("business_name") || "",
    website_url: fd.get("website_url") || "",
    niche: fd.get("niche") || "",
    checks: {
      phoneVisible: form.elements["phoneVisible"]?.checked === true,
      ctaClear: form.elements["ctaClear"]?.checked === true,
      trustProof: form.elements["trustProof"]?.checked === true,
      mobileReadable: form.elements["mobileReadable"]?.checked === true,
      formFriction: typeof friction === "string" ? friction : ""
    }
  };
}

function showErrors(errors) {
  const list = document.getElementById("audit-errors");
  if (!list) return;
  list.innerHTML = "";
  for (const err of errors) {
    const li = document.createElement("li");
    li.textContent = err;
    list.appendChild(li);
  }
  list.hidden = false;
}

function clearErrors() {
  const list = document.getElementById("audit-errors");
  if (!list) return;
  list.hidden = true;
  list.innerHTML = "";
}

// Pure renderer: takes an ALREADY-LOCALIZED result. Called on first submit
// AND every time the language toggles (with the cached lastResult).
function paintLocalized(localized) {
  document.getElementById("result-score").textContent = String(localized.score);

  const priorityEl = document.getElementById("result-priority");
  priorityEl.textContent = localized.priorityPrefix + localized.contactPriorityLabel;
  priorityEl.className = "score-priority priority-" + localized.contactPriority;

  document.getElementById("result-summary").textContent = localized.summary;

  const issueEl = document.getElementById("result-top-leak-issue");
  const fixEl = document.getElementById("result-top-leak-fix");
  if (localized.topLeak) {
    issueEl.textContent = localized.topLeak.issue;
    fixEl.textContent = localized.topLeak.fix;
  } else {
    issueEl.textContent = localized.noTopLeak.issue;
    fixEl.textContent = localized.noTopLeak.fix;
  }

  const findingsList = document.getElementById("result-findings");
  findingsList.innerHTML = "";
  for (const f of localized.findings) {
    const li = document.createElement("li");
    li.className = "status-" + f.status;
    const labelEl = document.createElement("span");
    labelEl.className = "finding-label";
    labelEl.textContent = f.label;
    const issueEl2 = document.createElement("span");
    issueEl2.className = "finding-issue";
    issueEl2.textContent = f.issue;
    li.appendChild(labelEl);
    li.appendChild(issueEl2);
    findingsList.appendChild(li);
  }
}

function renderFresh(result) {
  lastResult = result;
  const localized = localizeResult(result, getActiveLocale());
  paintLocalized(localized);

  const resultsSection = document.getElementById("audit-results");
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function rerenderIfShowing() {
  if (!lastResult) return;
  const resultsSection = document.getElementById("audit-results");
  if (!resultsSection || resultsSection.hidden) return;
  const localized = localizeResult(lastResult, getActiveLocale());
  paintLocalized(localized);
}

function stashPendingAudit(input, result) {
  const payload = {
    v: PAYLOAD_SCHEMA_VERSION,
    ts: Date.now(),
    businessName: input.businessName,
    websiteUrl: input.websiteUrl,
    niche: input.niche,
    score: result.score,
    topLeakIssue: result.topLeak ? result.topLeak.issue : null,
    topLeakFix: result.topLeak ? result.topLeak.fix : null
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // Storage may be disabled (private mode, quota). Failure is non-fatal —
    // the CTA navigation still works; the contact form just won't prefill.
  }
}

function wireSubmit(form) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    clearErrors();

    const raw = readInputs(form);
    const validated = validateAuditInput(raw);
    if (!validated.ok) {
      showErrors(validated.errors);
      track("Audit Validation Failed");
      return;
    }

    const result = evaluateAudit({
      businessName: validated.input.businessName,
      websiteUrl: validated.input.websiteUrl,
      niche: validated.input.niche,
      checks: validated.input.checks
    });

    renderFresh(result);
    track("Audit Completed");

    const cta = document.getElementById("cta-send");
    if (cta) {
      cta.onclick = () => {
        stashPendingAudit(validated.input, result);
        track("Audit Send Clicked");
        // Allow default navigation to /#quote-form
      };
    }
  });
}

function wireLanguageRerender() {
  // script.js dispatches "icbs:languagechange" inside setLanguage AFTER it
  // updates <html lang> + applies [data-i18n] swaps. We re-localize +
  // re-paint runtime result strings off the cached lastResult.
  window.addEventListener("icbs:languagechange", rerenderIfShowing);
}

function init() {
  const form = document.getElementById("audit-form");
  if (!form) return;
  wireSubmit(form);
  wireLanguageRerender();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
