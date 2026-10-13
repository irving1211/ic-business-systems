/* IC Business Systems — site behaviour (redesign 2026-10).
   Everything here is an enhancement: every page is complete and readable without it.
   - Mobile menu
   - Hero request-flow loop (pausable; skipped for reduced motion)
   - "Follow one request" step demo (tabs)
   - Review form: contact-method switch + accessible validation
   - Sticky CTA tucks away when the form is on screen
   - Plausible events (never form contents) */
(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const track = (event, props) => {
    try { if (typeof window.plausible === "function") window.plausible(event, props ? { props } : undefined); } catch (e) { /* telemetry never breaks the page */ }
  };

  /* ---------- analytics: declarative clicks ---------- */
  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-track]");
    if (!el) return;
    const props = {};
    if (el.dataset.position) props.position = el.dataset.position;
    if (el.dataset.project) props.project = el.dataset.project;
    if (el.dataset.track === "Language Switch") props.to = document.documentElement.lang === "en" ? "es" : "en";
    track(el.dataset.track, Object.keys(props).length ? props : undefined);
  });

  /* ---------- mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-button");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    const label = menuBtn.querySelector(".visually-hidden");
    const setOpen = (open) => {
      menuBtn.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      if (label) label.textContent = open ? menuBtn.dataset.labelClose : menuBtn.dataset.labelOpen;
    };
    menuBtn.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setOpen(false); menuBtn.focus(); } });
  }

  /* ---------- hero: one request travelling along the service line ---------- */
  const stage = document.querySelector("[data-stage]");
  if (stage && !reduceMotion.matches) {
    const toggle = document.querySelector(".stage-toggle");
    const steps = { 1: stage.querySelectorAll('[data-step="1"]'), 2: stage.querySelector('[data-step="2"]'), 3: stage.querySelector('[data-step="3"]') };
    const LOOP = 9000;        // ms for one full cycle
    const TRAVEL = 0.62;      // share of the loop spent travelling
    let paused = false, visible = true, start = performance.now(), pausedAt = 0, raf = 0;

    const activePipe = () => {
      const desk = stage.querySelector(".pipe-desk");
      return getComputedStyle(desk).display !== "none" ? desk : stage.querySelector(".pipe-mob");
    };
    const setActive = (n) => {
      steps[1].forEach((el) => el.classList.toggle("is-active", n === 1));
      steps[2].classList.toggle("is-active", n === 2);
      steps[3].classList.toggle("is-active", n === 3);
    };
    const frame = (now) => {
      raf = 0;
      if (paused || !visible) return;
      const svg = activePipe();
      const path = svg.querySelector(".pipe-run");
      const packet = svg.querySelector(".packet");
      const len = path.getTotalLength();
      // share of the run where the pipe enters the mail card (desktop 200/560, phone 148/420)
      const mailAt = 0.35;
      const t = ((now - start) % LOOP) / LOOP;
      if (t < 0.10) { setActive(1); packet.style.opacity = "0"; }
      else if (t < 0.10 + TRAVEL) {
        const p = (t - 0.10) / TRAVEL;
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const pt = path.getPointAtLength(eased * len);
        packet.setAttribute("cx", pt.x.toFixed(1));
        packet.setAttribute("cy", pt.y.toFixed(1));
        packet.style.opacity = "1";
        setActive(eased < mailAt ? 1 : eased < 0.97 ? 2 : 3);
      } else { setActive(3); packet.style.opacity = "0"; }
      raf = requestAnimationFrame(frame);
    };
    const run = () => { if (!raf && !paused && visible) raf = requestAnimationFrame(frame); };
    stage.classList.add("is-running");
    run();

    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener("click", () => {
        paused = !paused;
        toggle.setAttribute("aria-pressed", String(paused));
        toggle.textContent = paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause;
        if (paused) { pausedAt = performance.now(); }
        else { start += performance.now() - pausedAt; run(); }
      });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible) run();
      }).observe(stage);
    }
    reduceMotion.addEventListener?.("change", (e) => {
      if (e.matches) { paused = true; stage.classList.remove("is-running"); stage.querySelectorAll(".is-active").forEach((el) => el.classList.remove("is-active")); if (toggle) toggle.hidden = true; }
    });
  }

  /* ---------- "Follow one request" demo ---------- */
  const flow = document.querySelector("[data-flow]");
  if (flow) {
    const tabs = Array.from(flow.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const nav = flow.querySelector(".flow-nav");
    const prev = flow.querySelector("[data-flow-prev]");
    const next = flow.querySelector("[data-flow-next]");
    let current = 0;
    const show = (i, focus) => {
      current = Math.max(0, Math.min(tabs.length - 1, i));
      tabs.forEach((t, n) => {
        const on = n === current;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
      });
      prev.disabled = current === 0;
      next.disabled = current === tabs.length - 1;
      if (focus) tabs[current].focus();
      track("Demo Step", { step: String(current + 1) });
    };
    flow.classList.add("is-enhanced");
    nav.hidden = false;
    tabs.forEach((t, n) => {
      t.addEventListener("click", () => show(n));
      t.addEventListener("keydown", (e) => {
        const map = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 };
        if (e.key in map) { e.preventDefault(); show((map[e.key] + tabs.length) % tabs.length, true); }
      });
    });
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    let x0 = null;
    const panelsWrap = flow.querySelector(".flow-panels");
    panelsWrap.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    panelsWrap.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 48) show(current + (dx < 0 ? 1 : -1));
    });
    // initial state without counting it as a step view
    tabs.forEach((t, n) => { panels[n].hidden = n !== 0; });
    prev.disabled = true;
  }

  /* ---------- review form ---------- */
  const form = document.querySelector("[data-review-form]");
  if (form) {
    form.noValidate = true;
    const summary = form.querySelector(".error-summary");
    const summaryList = summary.querySelector("ul");
    const site = form.querySelector("#f-site");
    const name = form.querySelector("#f-name");
    const contact = form.querySelector("#f-contact");
    const contactLabel = form.querySelector('label[for="f-contact"]');
    const methods = form.querySelectorAll('[name="contact_method"]');
    const submitBtn = form.querySelector('[type="submit"]');
    let started = false;

    const setMethod = (m) => {
      const isEmail = m === "email";
      contact.type = isEmail ? "email" : "tel";
      contact.name = isEmail ? "email" : "phone";          // FormSubmit autoresponds only to a field named "email"
      contact.autocomplete = isEmail ? "email" : "tel";
      contact.inputMode = isEmail ? "email" : "tel";
      contactLabel.textContent = form.dataset["label" + (m === "email" ? "Email" : m === "text" ? "Text" : "Call")];
      clearError(contact);
    };
    methods.forEach((r) => r.addEventListener("change", () => setMethod(r.value)));

    const errEl = (input) => document.getElementById(input.id + "-err");
    const setError = (input, msg) => { input.setAttribute("aria-invalid", "true"); const e = errEl(input); e.textContent = msg; e.hidden = false; input.setAttribute("aria-describedby", [input.dataset.hint, e.id].filter(Boolean).join(" ")); };
    const clearError = (input) => { input.removeAttribute("aria-invalid"); const e = errEl(input); if (e) { e.hidden = true; e.textContent = ""; } input.setAttribute("aria-describedby", input.dataset.hint || ""); if (!input.getAttribute("aria-describedby")) input.removeAttribute("aria-describedby"); };
    site.dataset.hint = "f-site-hint";

    const validate = () => {
      const problems = [];
      if (site.value.trim().length < 4) problems.push([site, form.dataset.errSite]);
      if (name.value.trim().length < 2) problems.push([name, form.dataset.errName]);
      const v = contact.value.trim();
      if (contact.type === "email") { if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) problems.push([contact, form.dataset.errEmail]); }
      else if (v.replace(/\D/g, "").length < 10) problems.push([contact, form.dataset.errPhone]);
      return problems;
    };

    form.addEventListener("focusin", () => { if (!started) { started = true; track("Review Form Start"); } });
    [site, name, contact].forEach((input) => input.addEventListener("input", () => { if (input.getAttribute("aria-invalid")) clearError(input); }));

    form.addEventListener("submit", (ev) => {
      [site, name, contact].forEach(clearError);
      const problems = validate();
      if (problems.length) {
        ev.preventDefault();
        summaryList.innerHTML = "";
        problems.forEach(([input, msg]) => {
          setError(input, msg);
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#" + input.id; a.textContent = msg;
          a.addEventListener("click", (e) => { e.preventDefault(); input.focus(); });
          li.appendChild(a); summaryList.appendChild(li);
        });
        summary.hidden = false;
        summary.focus();
        track("Review Form Error", { fields: String(problems.length) });
        return;
      }
      summary.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = form.dataset.sending;
      track("Quote Submit Attempted");
    });
    // bfcache: re-enable the button if the visitor comes back
    const submitLabel = submitBtn.textContent;
    window.addEventListener("pageshow", () => { submitBtn.disabled = false; submitBtn.textContent = submitLabel; });
  }

  /* ---------- sticky CTA tucks away while the form is visible ---------- */
  const sticky = document.querySelector(".sticky-cta");
  const review = document.getElementById("review");
  if (sticky && review && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => sticky.classList.toggle("is-tucked", entries[0].isIntersecting), { threshold: 0.05 }).observe(review);
  }
})();
