// SYNCED FROM ../../lead-audit-tool/src/i18n.mjs — do not edit here.
// Re-sync with: node lead-audit-tool/scripts/sync-shared.mjs

// IC Business Systems audit — localization for runtime result strings.
//
// SINGLE SOURCE OF TRUTH for every user-facing string the engine produces.
// audit-engine.mjs imports RESULT_STRINGS.en to populate its English output,
// so the engine result IS the English locale by construction (no duplication).
// localizeResult(result, locale) swaps strings to another locale by ID.
//
// Engine result fields that get localized:
//   - summary (via summaryBandId)
//   - contactPriorityLabel (NEW field — added by localizeResult)
//   - findings[].label / issue / fix / impact
//   - topLeak (same object as one of findings — swapped consistently)
// English-only fields (intentional — Irving's email pipe + CRM internal):
//   - outreachMessage (built from English templates in audit-engine.mjs)
//   - outreachHook on each finding

export const SUPPORTED_LOCALES = Object.freeze(["en", "es"]);
const DEFAULT_LOCALE = "en";

export const SUMMARY_BAND_IDS = Object.freeze([
  { id: "strong", min: 90 },
  { id: "mostly_solid", min: 75 },
  { id: "momentum", min: 40 },
  { id: "leaking", min: 0 }
]);

export const RESULT_STRINGS = Object.freeze({
  en: {
    priorityPrefix: "Priority: ",
    priority: { high: "high", medium: "medium", low: "low" },
    summary: {
      strong: "Strong first-pass website path.",
      mostly_solid: "Mostly solid, with a few leaks worth tightening.",
      momentum: "Usable site, but a few leaks are costing momentum.",
      leaking: "Several visible leaks are likely costing jobs."
    },
    noTopLeak: {
      issue: "Nothing critical jumped out.",
      fix: "The core lead path is doing its job. If you want, I can still walk through tighter ideas."
    },
    checks: {
      phoneVisible: {
        label: "Phone path",
        statuses: {
          good: {
            issue: "Phone is easy to find",
            impact: "Customers have an immediate next step.",
            fix: "Keep the call path visible on mobile and desktop.",
            outreachHook: "the phone path is already clear"
          },
          critical: {
            issue: "Phone path hidden",
            impact: "A ready-to-call lead can bounce before they reach you.",
            fix: "Move the phone number and tap-to-call action to the top of the page.",
            outreachHook: "your phone path is hidden when a ready-to-buy lead lands"
          }
        }
      },
      ctaClear: {
        label: "Next step clarity",
        statuses: {
          good: {
            issue: "Next step is obvious",
            impact: "Visitors know what to do next.",
            fix: "Keep one clear CTA above the fold.",
            outreachHook: "the next step is already obvious"
          },
          critical: {
            issue: "No obvious next step",
            impact: "Visitors hesitate instead of acting.",
            fix: "Add one primary CTA that tells the visitor exactly what to do.",
            outreachHook: "the page makes people guess what to do next"
          }
        }
      },
      trustProof: {
        label: "Trust proof",
        statuses: {
          good: {
            issue: "Trust proof is visible",
            impact: "The page feels credible fast.",
            fix: "Keep reviews, service-area proof, and real work visible.",
            outreachHook: "the trust layer is already doing its job"
          },
          critical: {
            issue: "Low-trust page",
            impact: "A new visitor has no fast reason to believe you.",
            fix: "Add reviews, real project proof, and local trust signals near the first scroll.",
            outreachHook: "the page asks for trust before it earns it"
          }
        }
      },
      formFriction: {
        label: "Form friction",
        statuses: {
          good: {
            issue: "Form friction is low",
            impact: "The lead path feels easy.",
            fix: "Keep the ask short and fast.",
            outreachHook: "the form path already feels light"
          },
          warning: {
            issue: "Form asks for a bit too much",
            impact: "Some leads will still complete it, but others will bail.",
            fix: "Cut fields down to the minimum needed to start the conversation.",
            outreachHook: "the form is asking for more effort than it needs"
          },
          critical: {
            issue: "High-friction form",
            impact: "The lead path feels like work before contact happens.",
            fix: "Shorten the form and give people a faster call or text option.",
            outreachHook: "the form is creating friction before the first conversation"
          }
        }
      },
      mobileReadable: {
        label: "Mobile readability",
        statuses: {
          good: {
            issue: "Mobile pass is clean",
            impact: "The page holds up where most local traffic happens.",
            fix: "Keep text, spacing, and CTA visibility strong on small screens.",
            outreachHook: "mobile readability is already solid"
          },
          critical: {
            issue: "Mobile readability breaks down",
            impact: "The page feels harder to use on the device that matters most.",
            fix: "Tighten spacing, raise contrast, and make the CTA obvious on mobile.",
            outreachHook: "the mobile version is making the page harder to trust and use"
          }
        }
      }
    }
  },

  es: {
    priorityPrefix: "Prioridad: ",
    priority: { high: "alta", medium: "media", low: "baja" },
    summary: {
      strong: "Camino sólido en el primer vistazo de tu sitio.",
      mostly_solid: "Mayormente sólido, con algunas fugas que vale la pena cerrar.",
      momentum: "Sitio usable, pero algunas fugas están costando impulso.",
      leaking: "Hay varias fugas visibles que probablemente están costando trabajos."
    },
    noTopLeak: {
      issue: "No saltó nada crítico.",
      fix: "El camino principal hacia el cliente está haciendo su trabajo. Si quieres, podemos repasar ideas más finas."
    },
    checks: {
      phoneVisible: {
        label: "Camino del teléfono",
        statuses: {
          good: {
            issue: "El teléfono se encuentra fácil",
            impact: "Los clientes tienen un próximo paso inmediato.",
            fix: "Mantén el camino para llamar visible en móvil y escritorio.",
            outreachHook: "el camino del teléfono ya está claro"
          },
          critical: {
            issue: "Teléfono escondido",
            impact: "Un cliente listo para llamar puede irse antes de encontrarte.",
            fix: "Mueve el número y la acción de tap-para-llamar al inicio de la página.",
            outreachHook: "el teléfono está escondido cuando llega un cliente listo para comprar"
          }
        }
      },
      ctaClear: {
        label: "Claridad del próximo paso",
        statuses: {
          good: {
            issue: "El próximo paso es obvio",
            impact: "Los visitantes saben qué hacer después.",
            fix: "Mantén un CTA claro arriba del pliegue.",
            outreachHook: "el próximo paso ya es obvio"
          },
          critical: {
            issue: "No hay próximo paso obvio",
            impact: "Los visitantes dudan en vez de actuar.",
            fix: "Agrega un CTA principal que le diga al visitante exactamente qué hacer.",
            outreachHook: "la página hace que la gente adivine qué hacer"
          }
        }
      },
      trustProof: {
        label: "Prueba de confianza",
        statuses: {
          good: {
            issue: "La prueba de confianza es visible",
            impact: "La página se siente creíble rápido.",
            fix: "Mantén reseñas, prueba del área de servicio y trabajo real visibles.",
            outreachHook: "la capa de confianza ya está haciendo su trabajo"
          },
          critical: {
            issue: "Página con poca confianza",
            impact: "Un visitante nuevo no tiene razón rápida para creerte.",
            fix: "Agrega reseñas, prueba de proyectos reales y señales locales cerca del primer scroll.",
            outreachHook: "la página pide confianza antes de ganársela"
          }
        }
      },
      formFriction: {
        label: "Fricción del formulario",
        statuses: {
          good: {
            issue: "La fricción del formulario es baja",
            impact: "El camino se siente fácil.",
            fix: "Mantén la solicitud corta y rápida.",
            outreachHook: "el camino del formulario ya se siente ligero"
          },
          warning: {
            issue: "El formulario pide un poco de más",
            impact: "Algunos clientes lo completarán, pero otros se irán.",
            fix: "Recorta los campos al mínimo necesario para empezar la conversación.",
            outreachHook: "el formulario pide más esfuerzo del necesario"
          },
          critical: {
            issue: "Formulario de alta fricción",
            impact: "El camino se siente como trabajo antes del contacto.",
            fix: "Acorta el formulario y da una opción más rápida de llamada o mensaje.",
            outreachHook: "el formulario crea fricción antes de la primera conversación"
          }
        }
      },
      mobileReadable: {
        label: "Legibilidad móvil",
        statuses: {
          good: {
            issue: "El chequeo móvil pasa limpio",
            impact: "La página aguanta donde llega la mayoría del tráfico local.",
            fix: "Mantén el texto, espaciado y visibilidad del CTA fuertes en pantallas pequeñas.",
            outreachHook: "la legibilidad móvil ya está sólida"
          },
          critical: {
            issue: "La legibilidad móvil falla",
            impact: "La página se siente más difícil de usar en el dispositivo que más importa.",
            fix: "Ajusta el espaciado, sube el contraste y haz el CTA obvio en móvil.",
            outreachHook: "la versión móvil hace la página más difícil de usar y confiar"
          }
        }
      }
    }
  }
});

export function resolveLocale(input) {
  if (typeof input === "string" && SUPPORTED_LOCALES.includes(input)) return input;
  return DEFAULT_LOCALE;
}

// Browser-only locale read. Falls back to "en" outside the browser or when
// no preference is set. Reads document.documentElement.lang first (kept in
// sync by script.js setLanguage), then localStorage "icbs-language".
export function getActiveLocale() {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const htmlLang = document.documentElement?.lang;
  if (htmlLang && SUPPORTED_LOCALES.includes(htmlLang)) return htmlLang;
  try {
    const stored = window.localStorage?.getItem?.("icbs-language");
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  } catch (e) { /* localStorage may be disabled */ }
  return DEFAULT_LOCALE;
}

export function summaryBandIdFromScore(score) {
  for (const band of SUMMARY_BAND_IDS) {
    if (score >= band.min) return band.id;
  }
  return SUMMARY_BAND_IDS[SUMMARY_BAND_IDS.length - 1].id;
}

// Pure function. Returns a NEW result object with localized strings. Does
// NOT mutate the input. Outreach message and outreach hooks stay in their
// original English (internal/email-only — never rendered on the public page).
export function localizeResult(result, localeIn) {
  const locale = resolveLocale(localeIn);
  const strings = RESULT_STRINGS[locale];
  const bandId = result.summaryBandId ?? summaryBandIdFromScore(result.score);
  const summary = strings.summary[bandId] ?? result.summary;
  const priorityLabel = strings.priority[result.contactPriority] ?? result.contactPriority;
  const priorityPrefix = strings.priorityPrefix;

  const findings = (result.findings || []).map((f) => {
    const checkStrings = strings.checks[f.id];
    if (!checkStrings) return { ...f };
    const statusStrings = checkStrings.statuses?.[f.status];
    return {
      ...f,
      label: checkStrings.label ?? f.label,
      issue: statusStrings?.issue ?? f.issue,
      impact: statusStrings?.impact ?? f.impact,
      fix: statusStrings?.fix ?? f.fix
      // outreachHook intentionally not localized (English-only).
    };
  });

  // Re-bind topLeak to the matching localized finding so callers can render
  // either result.topLeak.* or findings.find(...) consistently.
  let topLeak = null;
  if (result.topLeak) {
    topLeak = findings.find((f) => f.id === result.topLeak.id) ?? { ...result.topLeak };
  }

  return {
    ...result,
    locale,
    summary,
    summaryBandId: bandId,
    contactPriorityLabel: priorityLabel,
    priorityPrefix,
    noTopLeak: { ...strings.noTopLeak },
    findings,
    topLeak
  };
}
