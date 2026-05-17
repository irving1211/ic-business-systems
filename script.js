const topbar = document.querySelector(".topbar");
const autoResponseField = document.querySelector('input[name="_autoresponse"]');
const navLinks = Array.from(document.querySelectorAll(".nav a"));

const onScroll = () => {
  if (!topbar) return;
  topbar.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const translations = {
  en: {
    "brand.name": "IC Business Systems",
    "brand.tag": "Built for real small businesses",
    "brand.motto": "Automate | Optimize | Grow",
    "nav.services": "Services",
    "nav.fit": "Best Fit",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "cta.letstalk": "Get Quote",
    "hero.eyebrow": "Websites, customer leads, and business automation",
    "hero.title": "Get more leads, save time, and stay on top of customers.",
    "hero.text": "Websites, customer follow-up, and business automation for small businesses that want to grow without the chaos.",
    "hero.primaryCta": "Get a quote",
    "hero.secondaryCta": "See before and after",
    "hero.point1": "Look more professional online",
    "hero.point2": "Stop losing leads in the shuffle",
    "hero.point3": "Keep customer follow-up moving",
    "signal.one": "Built for owner-operators",
    "signal.two": "Blue-collar aware",
    "signal.three": "Plain-English systems",
    "hero.proof1.label": "What owners usually want",
    "hero.proof1.value": "More calls, better follow-up, less chaos",
    "hero.proof2.label": "What this is built for",
    "hero.proof2.value": "Small businesses that need cleaner systems",
    "form.kicker": "Get a quote",
    "form.title": "Tell me what your business needs.",
    "form.text": "Fill this out and I can look at what is messy, what is costing you time, and where the biggest upgrade is.",
    "form.name": "Name",
    "form.business": "Business Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.need": "What do you need help with?",
    "form.select": "Select one",
    "form.option1": "Website",
    "form.option2": "Lead follow-up",
    "form.option3": "Business automation",
    "form.option4": "Not sure yet",
    "form.message": "What feels messy right now?",
    "form.placeholder": "Missed calls, weak website, bad follow-up, too much admin...",
    "form.submit": "Send request",
    "form.note": "You leave your phone and email once. I review the mess, then I reach out with the best next move.",
    "trust.kicker": "Why this is different",
    "trust.title": "Built for real small businesses.",
    "trust.lede": "Built by someone who understands blue-collar businesses and the mess that shows up when the work is good but the system behind it is not.",
    "trust.old.label": "What owners usually deal with",
    "trust.old.item1": "Outdated website",
    "trust.old.item2": "Slow follow-up",
    "trust.old.item3": "Leads slipping through",
    "trust.new.label": "What this is built to fix",
    "trust.new.item1": "Cleaner digital presence",
    "trust.new.item2": "Faster customer response",
    "trust.new.item3": "More organized lead flow",
    "diagnostic.kicker": "What this usually fixes",
    "diagnostic.title": "Most owners do not need more software. They need fewer leaks.",
    "diagnostic.text": "These are the problems that usually cost small businesses money before they ever realize it.",
    "diagnostic.card1.title": "Leads disappear after the first call or message",
    "diagnostic.card1.text": "The site looks fine, but there is no clean follow-up system behind it, so people cool off and disappear.",
    "diagnostic.card2.title": "The business does good work but looks behind online",
    "diagnostic.card2.text": "Weak websites and messy contact flow make a legit business feel smaller and less trustworthy than it really is.",
    "diagnostic.card3.title": "Too much admin keeps landing on the owner",
    "diagnostic.card3.text": "When everything depends on memory, manual texting, and back-and-forth, the business starts dragging on the operator.",
    "services.kicker": "Services",
    "services.title": "Three practical upgrades that usually move the business fastest.",
    "services.text": "Less theory, less tech talk, more clean fixes that make the business look better and run better.",
    "services.card1.title": "Websites",
    "services.card1.text": "Cleaner sites that make the business feel more legit the second someone lands on it.",
    "services.card2.title": "Lead Follow-Up",
    "services.card2.text": "Better quote capture, faster response, and less dead time between inquiry and booked job.",
    "services.card3.title": "Business Automation",
    "services.card3.text": "Time-saving systems that cut repeat admin and keep the owner from being the whole system.",
    "showcase.kicker": "Before and after",
    "showcase.title": "The difference should be obvious in five seconds.",
    "showcase.text": "The upgrade is not just prettier design. It is clearer trust, cleaner quote capture, and less friction for the next step.",
    "showcase.point1.value": "Before",
    "showcase.point1.label": "Outdated, generic, easy to ignore",
    "showcase.point2.value": "After",
    "showcase.point2.label": "Sharper trust and a clear next step",
    "showcase.frameBefore.label": "Before",
    "showcase.frameBefore.item1": "Weak first impression",
    "showcase.frameBefore.item2": "No clear next step",
    "showcase.frameBefore.item3": "Leads cool off",
    "showcase.frameAfter.label": "After",
    "showcase.mockup.kicker": "Premium business presence",
    "showcase.mockup.title": "Get seen. Get trusted. Get more inquiries.",
    "showcase.mockup.subline": "A sharper offer, stronger tone, and a quote path people actually follow.",
    "showcase.mockup.badge1": "Clear offer",
    "showcase.mockup.badge2": "Brand voice",
    "showcase.mockup.badge3": "Bilingual ready",
    "showcase.mockup.stageTitle": "A business page with real presence",
    "showcase.mockup.stageText": "The message gets tighter, the hierarchy gets cleaner, and the next step stops feeling random.",
    "showcase.mockup.card1.title": "Quote capture",
    "showcase.mockup.card1.text": "Clear form with the right questions",
    "showcase.mockup.card2.title": "Fast follow-up",
    "showcase.mockup.card2.text": "Cleaner response path for new leads",
    "showcase.mockup.card3.title": "Better trust",
    "showcase.mockup.card3.text": "Stronger tone, sharper first impression",
    "fit.kicker": "Who it's for",
    "fit.title": "Broad enough for any small business. Strongest for operators who wear a lot of hats.",
    "fit.item1": "Local service businesses",
    "fit.item2": "Contractors and trades",
    "fit.item3": "Owner-operators",
    "fit.item4": "Small businesses with outdated websites",
    "fit.item5": "Teams that need better lead handling and follow-up",
    "fit.item6": "Businesses that want to look sharper without getting buried in tech",
    "fit.visual.kicker": "What a better system looks like",
    "fit.visual.title": "Cleaner site. Faster follow-up. More confidence.",
    "fit.visual.text": "A business should feel organized before someone even makes the first call.",
    "fit.visual.metric1.value": "Captured even when you are busy",
    "fit.visual.metric1.label": "Quote requests",
    "fit.visual.metric2.value": "Feels sharper in under five seconds",
    "fit.visual.metric2.label": "First impression",
    "fit.visual.metric3.value": "Less chasing and back-and-forth",
    "fit.visual.metric3.label": "Owner workload",
    "process.kicker": "How it works",
    "process.title": "Three moves, then the business feels sharper.",
    "process.card1.title": "We look at where customers are slipping through",
    "process.card1.text": "Website, follow-up, contact flow, and where things are getting missed.",
    "process.card2.title": "We build a cleaner system",
    "process.card2.text": "A better site, stronger lead flow, or a simpler process that saves time.",
    "process.card3.title": "You get a business that looks better and runs smoother",
    "process.card3.text": "More trust, better organization, and fewer customer opportunities getting lost.",
    "faq.kicker": "Frequently asked questions",
    "faq.title": "The questions most owners ask before they reach out.",
    "faq.text": "If you are not a technical person, that is fine. This should still make sense.",
    "faq.q1": "What kind of businesses do you work with?",
    "faq.a1": "Any small business, but this is especially strong for local service businesses, trades, owner-operators, and businesses that need better follow-up and a stronger online presence.",
    "faq.q2": "Do I need a brand new website?",
    "faq.a2": "Not always. Sometimes the best move is a cleaner website. Sometimes it is fixing contact flow, follow-up, or how leads are being handled. The point is solving the real problem, not forcing a rebuild.",
    "faq.q3": "What does business automation actually mean?",
    "faq.a3": "It means setting up simple systems that save time and reduce missed opportunities. That could be lead follow-up, inquiry routing, reminders, intake, or repetitive admin work that keeps slowing the business down.",
    "faq.q4": "Do I need to understand any of the tech?",
    "faq.a4": "No. The whole point is to make this easier to use, not harder to understand. The work should feel clear on your side and useful in the real business.",
    "faq.q5": "Can you help bilingual businesses too?",
    "faq.a5": "Yes. If your customers move between English and Spanish, the website and customer flow can be built to support that more naturally.",
    "faq.q6": "How much does this usually cost?",
    "faq.a6": "It depends on what actually needs to be fixed. Some businesses need a cleaner website. Some need follow-up and intake fixed first. The quote form helps me see the real problem so I can recommend the right scope instead of guessing.",
    "faq.q7": "How long does this usually take?",
    "faq.a7": "Smaller fixes can move fast. Bigger builds take longer. The first step is figuring out whether you need one clean fix or a fuller system build.",
    "faq.q8": "How do we get started?",
    "faq.a8": "Fill out the quote form, leave your phone and email, and explain what feels messy right now. From there, I can look at what the biggest win is and what the next move should be.",
    "contact.kicker": "Contact",
    "contact.title": "Need a better website, better follow-up, or a system that saves time?",
    "contact.text": "Start with the quote form above, or reach out directly if you already know what you need.",
    "contact.call": "Call or text",
    "contact.email": "Send an email",
    "contact.phoneLabel": "Phone",
    "contact.emailLabel": "Email",
    "contact.websiteLabel": "Website",
    "contact.websiteValue": "Domain coming next",
    "contact.igLabel": "Instagram",
    "contact.igValue": "Brand page coming next",
    "footer.name": "IC Business Systems",
    "footer.text": "Built for small businesses that want to grow without the chaos.",
    "form.autoresponse": "Thanks for reaching out to IC Business Systems. I got your request and will review it soon."
  },
  es: {
    "brand.name": "IC Business Systems",
    "brand.tag": "Hecho para negocios pequenos de verdad",
    "brand.motto": "Automatiza | Optimiza | Crece",
    "nav.services": "Servicios",
    "nav.fit": "Ideal para",
    "nav.faq": "Preguntas",
    "nav.contact": "Contacto",
    "cta.letstalk": "Cotiza",
    "hero.eyebrow": "Sitios web, mas clientes y automatizacion de negocios",
    "hero.title": "Consigue mas clientes, ahorra tiempo, y mantente al dia con tus clientes.",
    "hero.text": "Sitios web, seguimiento a clientes, y automatizacion de negocios para negocios pequenos que quieren crecer sin tanto reguero.",
    "hero.primaryCta": "Pide tu cotizacion",
    "hero.secondaryCta": "Ver antes y despues",
    "hero.point1": "Verte mas profesional online",
    "hero.point2": "Dejar de perder clientes por falta de seguimiento",
    "hero.point3": "Mantener el seguimiento en movimiento",
    "signal.one": "Hecho para owner-operators",
    "signal.two": "Entiende negocios blue-collar",
    "signal.three": "Sistemas en lenguaje claro",
    "hero.proof1.label": "Lo que casi siempre quieren",
    "hero.proof1.value": "Mas llamadas, mejor seguimiento, menos reguero",
    "hero.proof2.label": "Para quien esta hecho",
    "hero.proof2.value": "Negocios pequenos que necesitan sistemas mas limpios",
    "form.kicker": "Pide tu cotizacion",
    "form.title": "Dime que necesita tu negocio.",
    "form.text": "Llena esto y puedo ver que esta desorganizado, que te esta quitando tiempo, y donde esta la mejor mejora.",
    "form.name": "Nombre",
    "form.business": "Nombre del negocio",
    "form.email": "Correo",
    "form.phone": "Telefono",
    "form.need": "Con que necesitas ayuda?",
    "form.select": "Escoge uno",
    "form.option1": "Sitio web",
    "form.option2": "Seguimiento a clientes",
    "form.option3": "Automatizacion de negocios",
    "form.option4": "Todavia no estoy seguro",
    "form.message": "Que se siente desorganizado ahora mismo?",
    "form.placeholder": "Llamadas perdidas, sitio flojo, mal seguimiento, mucha administracion...",
    "form.submit": "Enviar solicitud",
    "form.note": "Dejas tu telefono y tu correo una vez. Yo reviso el reguero y despues te escribo con el mejor proximo movimiento.",
    "trust.kicker": "Por que esto es diferente",
    "trust.title": "Hecho para negocios pequenos de verdad.",
    "trust.lede": "Hecho por alguien que entiende negocios blue-collar y el reguero que aparece cuando el trabajo es bueno pero el sistema detras no lo es.",
    "trust.old.label": "Con lo que muchos duenos bregan",
    "trust.old.item1": "Sitio atrasado",
    "trust.old.item2": "Seguimiento lento",
    "trust.old.item3": "Leads que se pierden",
    "trust.new.label": "Lo que esto esta hecho para arreglar",
    "trust.new.item1": "Presencia digital mas limpia",
    "trust.new.item2": "Respuesta mas rapida al cliente",
    "trust.new.item3": "Flujo de leads mas organizado",
    "diagnostic.kicker": "Lo que esto suele arreglar",
    "diagnostic.title": "La mayoria no necesita mas software. Necesita menos fugas.",
    "diagnostic.text": "Estos son los problemas que normalmente le cuestan dinero a un negocio antes de que el dueno se de cuenta.",
    "diagnostic.card1.title": "Los leads se pierden despues de la primera llamada o mensaje",
    "diagnostic.card1.text": "El sitio se ve bien, pero no hay un sistema limpio de seguimiento detras, entonces la gente se enfria y desaparece.",
    "diagnostic.card2.title": "El negocio trabaja bien pero se ve atrasado online",
    "diagnostic.card2.text": "Un sitio flojo y un contacto desorganizado hacen que un negocio legitimo se vea mas pequeno y menos confiable de lo que es.",
    "diagnostic.card3.title": "Demasiada administracion termina cayendole arriba al dueno",
    "diagnostic.card3.text": "Cuando todo depende de memoria, texto manual, y mucho va y ven, el negocio empieza a pesarle al operador.",
    "services.kicker": "Servicios",
    "services.title": "Tres upgrades practicos que suelen mover el negocio mas rapido.",
    "services.text": "Menos teoria, menos palabreo tecnico, mas arreglos limpios que hacen que el negocio se vea y corra mejor.",
    "services.card1.title": "Sitios web",
    "services.card1.text": "Sitios mas limpios que hacen que el negocio se sienta mas legitimo desde que alguien cae ahi.",
    "services.card2.title": "Seguimiento de leads",
    "services.card2.text": "Mejor captacion, respuesta mas rapida, y menos tiempo muerto entre consulta y trabajo cuadrado.",
    "services.card3.title": "Automatizacion de negocios",
    "services.card3.text": "Sistemas para ahorrar tiempo y cortar admin repetitiva sin que todo dependa del dueno.",
    "showcase.kicker": "Antes y despues",
    "showcase.title": "La diferencia debe sentirse en cinco segundos.",
    "showcase.text": "El upgrade no es solo que se vea mas bonito. Es mas confianza, mejor captacion, y menos friccion para el proximo paso.",
    "showcase.point1.value": "Antes",
    "showcase.point1.label": "Atrasado, generico, facil de ignorar",
    "showcase.point2.value": "Despues",
    "showcase.point2.label": "Mas confianza y un proximo paso claro",
    "showcase.frameBefore.label": "Antes",
    "showcase.frameBefore.item1": "Primera impresion floja",
    "showcase.frameBefore.item2": "No hay paso claro",
    "showcase.frameBefore.item3": "Los leads se enfrian",
    "showcase.frameAfter.label": "Despues",
    "showcase.mockup.kicker": "Presencia premium de negocio",
    "showcase.mockup.title": "Dejate ver. Gana confianza. Consigue mas consultas.",
    "showcase.mockup.subline": "Una oferta mas clara, mejor tono, y una ruta de cotizacion que la gente si sigue.",
    "showcase.mockup.badge1": "Oferta clara",
    "showcase.mockup.badge2": "Voz de marca",
    "showcase.mockup.badge3": "Listo para bilingue",
    "showcase.mockup.stageTitle": "Una pagina de negocio con presencia de verdad",
    "showcase.mockup.stageText": "El mensaje se aprieta, la jerarquia se limpia, y el proximo paso deja de sentirse random.",
    "showcase.mockup.card1.title": "Captacion",
    "showcase.mockup.card1.text": "Formulario claro con las preguntas correctas",
    "showcase.mockup.card2.title": "Seguimiento rapido",
    "showcase.mockup.card2.text": "Ruta de respuesta mas limpia para leads nuevos",
    "showcase.mockup.card3.title": "Mas confianza",
    "showcase.mockup.card3.text": "Mejor tono y primera impresion mas dura",
    "fit.kicker": "Para quien es",
    "fit.title": "Lo suficientemente amplio para cualquier negocio pequeno. Pero pega mas fuerte con operadores que tienen mil sombreros puestos.",
    "fit.item1": "Negocios locales de servicio",
    "fit.item2": "Contratistas y trades",
    "fit.item3": "Owner-operators",
    "fit.item4": "Negocios pequenos con sitios atrasados",
    "fit.item5": "Equipos que necesitan mejor manejo de leads y seguimiento",
    "fit.item6": "Negocios que quieren verse mejor sin enterrarse en tecnologia",
    "fit.visual.kicker": "Como se ve un mejor sistema",
    "fit.visual.title": "Sitio mas limpio. Mejor seguimiento. Mas confianza.",
    "fit.visual.text": "Un negocio debe sentirse organizado antes de que alguien haga la primera llamada.",
    "fit.visual.metric1.value": "Se capturan aunque estes joseando",
    "fit.visual.metric1.label": "Solicitudes de cotizacion",
    "fit.visual.metric2.value": "Se ve mas duro en menos de cinco segundos",
    "fit.visual.metric2.label": "Primera impresion",
    "fit.visual.metric3.value": "Menos corre-corre y menos va y ven",
    "fit.visual.metric3.label": "Carga del dueno",
    "process.kicker": "Como funciona",
    "process.title": "Tres movimientos y el negocio se siente mas duro.",
    "process.card1.title": "Vemos por donde se estan escapando los clientes",
    "process.card1.text": "Sitio web, seguimiento, flujo de contacto, y donde se estan perdiendo cosas.",
    "process.card2.title": "Construimos un sistema mas limpio",
    "process.card2.text": "Un mejor sitio, mejor flujo de leads, o un proceso mas simple que te ahorre tiempo.",
    "process.card3.title": "Te queda un negocio que se ve mejor y corre mas suave",
    "process.card3.text": "Mas confianza, mejor organizacion, y menos oportunidades perdidas.",
    "faq.kicker": "Preguntas frecuentes",
    "faq.title": "Las preguntas que la mayoria hace antes de escribir.",
    "faq.text": "Si no eres una persona tecnica, esta bien. Como quiera esto debe hacer sentido.",
    "faq.q1": "Con que tipo de negocios trabajas?",
    "faq.a1": "Con cualquier negocio pequeno, pero esto funciona especialmente bien para negocios locales de servicio, trades, owner-operators, y negocios que necesitan mejor seguimiento y una presencia online mas fuerte.",
    "faq.q2": "Necesito un sitio web nuevo completo?",
    "faq.a2": "No siempre. A veces el mejor movimiento es un sitio mas limpio. A veces es arreglar el flujo de contacto, el seguimiento, o como se estan manejando los leads. La idea es resolver el problema real, no forzar una reconstruccion.",
    "faq.q3": "Que significa automatizacion de negocios de verdad?",
    "faq.a3": "Significa poner sistemas simples que te ahorren tiempo y reduzcan oportunidades perdidas. Puede ser seguimiento de leads, rutas de consultas, recordatorios, intake, o trabajo administrativo repetitivo que te esta frenando.",
    "faq.q4": "Yo tengo que entender la tecnologia?",
    "faq.a4": "No. El punto entero es hacer esto mas facil de usar, no mas dificil de entender. El trabajo debe sentirse claro de tu lado y util en el negocio real.",
    "faq.q5": "Puedes ayudar negocios bilingues tambien?",
    "faq.a5": "Si. Si tus clientes se mueven entre ingles y espanol, el sitio y el flujo con clientes se puede montar para apoyar eso de una forma mas natural.",
    "faq.q6": "Cuanto suele costar esto?",
    "faq.a6": "Depende de lo que de verdad haya que arreglar. Algunos negocios necesitan un sitio mas limpio. Otros necesitan arreglar seguimiento e intake primero. El formulario me ayuda a ver el problema real para recomendar el alcance correcto sin adivinar.",
    "faq.q7": "Cuanto tiempo suele tomar?",
    "faq.a7": "Los arreglos pequenos pueden moverse rapido. Las construcciones mas grandes toman mas tiempo. El primer paso es ver si necesitas un arreglo limpio o un sistema mas completo.",
    "faq.q8": "Como empezamos?",
    "faq.a8": "Llena el formulario, deja tu telefono y correo, y explica que se siente desorganizado ahora mismo. De ahi puedo ver cual es la mejora mas grande y cual debe ser el proximo movimiento.",
    "contact.kicker": "Contacto",
    "contact.title": "Necesitas un mejor sitio, mejor seguimiento, o un sistema que te ahorre tiempo?",
    "contact.text": "Empieza con el formulario de arriba, o escribeme directo si ya sabes lo que necesitas.",
    "contact.call": "Llama o textea",
    "contact.email": "Escribeme por email",
    "contact.phoneLabel": "Telefono",
    "contact.emailLabel": "Correo",
    "contact.websiteLabel": "Sitio web",
    "contact.websiteValue": "Dominio viene pronto",
    "contact.igLabel": "Instagram",
    "contact.igValue": "La pagina viene pronto",
    "footer.name": "IC Business Systems",
    "footer.text": "Hecho para negocios pequenos que quieren crecer sin tanto reguero.",
    "form.autoresponse": "Gracias por escribirle a IC Business Systems. Recibi tu solicitud y la voy a revisar pronto."
  }
};

const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-form-shell, .trust-intro, .trust-copy, .diag-card, .service-row, .showcase-copy, .showcase-frame, .fit-grid > *, .fit-panel, .process-node, .faq-intro, .faq-item, .contact-copy, .contact-card"
);

revealTargets.forEach((node) => node.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08,
  }
);

revealTargets.forEach((node) => observer.observe(node));

const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
    if (isMatch) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActiveNav(visible.target.id);
    }
  },
  {
    rootMargin: "-28% 0px -52% 0px",
    threshold: [0.2, 0.45, 0.7],
  }
);

sectionTargets.forEach((section) => navObserver.observe(section));

const faqItems = Array.from(document.querySelectorAll(".faq-item"));
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const setLanguage = (lang) => {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dict[key]) {
      node.setAttribute("placeholder", dict[key]);
    }
  });

  document.querySelectorAll("[data-lang-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langTarget === lang);
  });

  if (autoResponseField && dict["form.autoresponse"]) {
    autoResponseField.value = dict["form.autoresponse"];
  }

  try {
    window.localStorage.setItem("icbs-language", lang);
  } catch {}
};

const detectLanguage = () => {
  try {
    const stored = window.localStorage.getItem("icbs-language");
    if (stored && translations[stored]) return stored;
  } catch {}

  const preferred = [...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  const wantsSpanish = preferred.some((value) => value.startsWith("es"));
  return wantsSpanish ? "es" : "en";
};

document.querySelectorAll("[data-lang-target]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langTarget));
});

window.addEventListener("languagechange", () => {
  const saved = (() => {
    try {
      return window.localStorage.getItem("icbs-language");
    } catch {
      return null;
    }
  })();

  if (!saved) {
    setLanguage(detectLanguage());
  }
});

setLanguage(detectLanguage());
