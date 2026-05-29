/* IC Business Systems — interaction layer
   - Sticky topbar shadow on scroll
   - Mobile hamburger menu (open/close/ESC/outside/link-click)
   - Bilingual EN/ES dictionary + toggle + browser-language detect
   - IntersectionObserver for reveal animations + active-nav state
   - FAQ accordion (auto-close siblings)
*/

const topbar = document.querySelector(".topbar");
const autoResponseField = document.querySelector('input[name="_autoresponse"]');
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll("a")) : [];

const onScroll = () => {
  if (!topbar) return;
  topbar.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ============ Translations ============ */
const translations = {
  en: {
    "brand.name": "IC Business Systems",
    "brand.tag": "Built for real small businesses",
    "nav.work": "Work",
    "nav.services": "Services",
    "nav.systems": "Systems",
    "nav.process": "Process",
    "nav.founder": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "cta.audit": "Request audit",
    "cta.letstalk": "Get quote",
    "hero.eyebrow": "For contractors, crews, and local service businesses",
    "hero.title": "Make the business look current, answer faster, and stop losing good jobs to messy follow-up.",
    "hero.text": "I build phone-first websites, cleaner quote flow, and practical automations for service businesses that are doing real work all day, not sitting behind a desk waiting for leads.",
    "hero.primaryCta": "Request the free audit",
    "hero.secondaryCta": "See recent work",
    "hero.point1": "Phone-first pages that make it easy to call or request a quote",
    "hero.point2": "Follow-up that replies fast while you are on a job",
    "hero.point3": "Bilingual support when your customers need both English and Spanish",
    "signal.one": "Built by a plumber who also writes code",
    "signal.two": "Bilingual EN / ES",
    "signal.three": "Lawrence & Framingham, MA",
    "form.kicker": "Request the audit",
    "form.title": "Tell me what feels messy.",
    "form.text": "I'll look at where leads are leaking, where the admin is piling up, and where the biggest upgrade is. No charge for the look.",
    "form.name": "Name",
    "form.business": "Business name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.need": "What do you need help with?",
    "form.select": "Select one",
    "form.option1": "Website cleanup or rebuild",
    "form.option2": "Lead capture & follow-up",
    "form.option3": "Workflow automation",
    "form.option4": "Not sure: start with the audit",
    "form.message": "What feels messy right now?",
    "form.placeholder": "Missed calls, weak website, slow follow-up, too much admin...",
    "form.submit": "Send request",
    "form.note": "Leave your phone and email once. I review the mess, then I reach out with the best next move.",
    "form.autoresponse": "Thanks for reaching out to IC Business Systems. I got your request and will review it soon.",
    "proof.kicker": "What changes first",
    "proof.title": "Most businesses do not need a giant rebuild. They need the front door cleaned up properly.",
    "proof.text": "The biggest wins usually come from trust, hierarchy, response speed, and a simpler path to contact.",
    "proof.before.tag": "Before",
    "proof.before.title": "The business is solid. The page does not show it yet.",
    "proof.before.item1": "Outdated website that loads slow and looks like 2014",
    "proof.before.item2": "No clear next step, so visitors leave without calling",
    "proof.before.item3": "Phone number buried in a footer no one scrolls to",
    "proof.before.item4": "Quote requests die in a personal inbox",
    "proof.after.tag": "After",
    "proof.after.title": "The first screen feels current, clear, and ready to act on.",
    "proof.after.item1": "Fast site that reads like a real business",
    "proof.after.item2": "One clear next step on every screen",
    "proof.after.item3": "Phone number above the fold, click-to-call on mobile",
    "proof.after.item4": "Quote requests routed instantly with an autoresponse",
    "work.kicker": "Recent work",
    "work.title": "Real businesses, live on phones right now.",
    "work.text": "These are not mockups. They are live projects, built for the way real customers browse, call, and decide.",
    "work.card1.kicker": "Slow-smoked food truck & catering",
    "work.card1.title": "Sig's Kitchen BBQ",
    "work.card1.text": "Mobile-first menu and booking page the owner can hand out in person. Fremont, NH & Methuen, MA.",
    "work.card1.fact1": "Menu-first",
    "work.card1.fact2": "Booking CTA",
    "work.card1.fact3": "Built for phone traffic",
    "work.card1.cta": "Open the site",
    "work.card2.kicker": "Plumbing & heating",
    "work.card2.title": "S. Meredith Plumbing",
    "work.card2.text": "Trust-first site that gets the phone ringing, with licensing, service-area clarity, and one obvious call path. Saugus, MA.",
    "work.card2.fact1": "License up front",
    "work.card2.fact2": "Tap to call",
    "work.card2.fact3": "Trust-first layout",
    "work.card2.cta": "Open the site",
    "work.card3.kicker": "Dominican hair salon",
    "work.card3.title": "Mía Beauty Boutique",
    "work.card3.text": "Bilingual ES/EN, walk-ins welcome, 40+ years in the chair. Lawrence, MA.",
    "work.card3.fact1": "Bilingual ES/EN",
    "work.card3.fact2": "Walk-ins welcome",
    "work.card3.fact3": "Service menu clarity",
    "work.card3.cta": "Open the site",
    "services.kicker": "What I usually fix first",
    "services.title": "The first three upgrades that move a service business.",
    "services.text": "The goal is a cleaner first impression, a simpler path to contact, and less work falling back on the owner.",
    "services.card1.title": "Website clarity",
    "services.card1.text": "Phone-first pages with stronger hierarchy, clearer trust proof, and a cleaner quote path.",
    "services.card2.title": "Lead follow-up",
    "services.card2.text": "Forms, routing, autoresponses, and the first reply after a missed call.",
    "services.card3.title": "Small systems",
    "services.card3.text": "Text-backs, reminders, review asks, and the small automations that keep the owner from carrying everything.",
    "systems.kicker": "What that looks like in practice",
    "systems.title": "A few small systems usually do most of the work.",
    "systems.text": "The point is not to automate everything. The point is to stop the obvious leaks first.",
    "systems.card1.label": "Missed-call text-back",
    "systems.card1.trigger": "Missed call",
    "systems.card1.action": "Text back sent in seconds",
    "systems.card1.outcome": "Lead stays warm",
    "systems.card2.label": "Instant lead routing",
    "systems.card2.trigger": "Website form submitted",
    "systems.card2.action": "Routed straight to your phone",
    "systems.card2.outcome": "Faster response",
    "systems.card3.label": "Quote follow-up",
    "systems.card3.trigger": "Quote requested",
    "systems.card3.action": "Follow-up scheduled automatically",
    "systems.card3.outcome": "Fewer lost opportunities",
    "systems.card4.label": "Review ask",
    "systems.card4.trigger": "Job completed",
    "systems.card4.action": "Review request sent",
    "systems.card4.outcome": "Stronger reputation",
    "systems.card5.label": "Lead tracking",
    "systems.card5.trigger": "New inquiry comes in",
    "systems.card5.action": "Organized in one tracker",
    "systems.card5.outcome": "Nothing slips",
    "systems.card6.label": "Admin cleanup",
    "systems.card6.trigger": "Repeating admin task",
    "systems.card6.action": "Handled in the background",
    "systems.card6.outcome": "Owner does owner work",
    "process.kicker": "How I usually run it",
    "process.title": "Four weeks, one cleaner front door for the business.",
    "process.week1.step": "Week 1",
    "process.week2.step": "Week 2",
    "process.week3.step": "Week 3",
    "process.week4.step": "Week 4",
    "process.card1.title": "I audit the leak points",
    "process.card1.text": "I review the site, the contact path, and the places where leads go quiet.",
    "process.card2.title": "I rebuild the highest-friction part",
    "process.card2.text": "That might be the homepage, the quote path, or the first follow-up sequence.",
    "process.card3.title": "We launch it and test the path",
    "process.card3.text": "The page goes live, the replies get tested, and the lead path gets checked on a real phone.",
    "process.card4.title": "I tighten what people actually use",
    "process.card4.text": "After real traffic and real calls, I tighten the pieces carrying the most weight.",
    "founder.kicker": "Who you're working with",
    "founder.title": "I spend my days on job sites and my nights building the tools I wish small businesses already had.",
    "founder.p1": "I'm a third-year plumbing apprentice working around Lawrence and Framingham. I also build websites and workflow systems for small businesses that need cleaner operations, not a pile of software.",
    "founder.p2": "That mix matters. I know what it looks like when the owner is in the truck, on a ladder, or under a sink while the phone keeps ringing. The fixes I build are meant for that reality.",
    "founder.p3": "Everything is explained plainly, built to work on a phone, and set up so it still makes sense a month later.",
    "founder.meta1": "Lawrence & Framingham, MA",
    "founder.meta2": "Bilingual EN / ES",
    "founder.meta3": "Available evenings & weekends",
    "founder.portrait.caption": "Irving Carrion, Lawrence, MA",
    "fit.kicker": "Best fit",
    "fit.title": "Best for owner-led service businesses that already do good work and need the front end to catch up.",
    "fit.text": "This works best when the business is real, the operator is busy, and the goal is clarity, trust, and follow-up that actually gets used.",
    "fit.good": "Good fit",
    "fit.good1": "Contractors, trades, and local service businesses",
    "fit.good2": "Teams that want a stronger site and a faster path to contact",
    "fit.good3": "Bilingual businesses serving English and Spanish customers",
    "fit.not": "Probably not a fit",
    "fit.not1": "Founders looking for a flashy startup landing page",
    "fit.not2": "Teams that want endless software instead of a cleaner process",
    "fit.not3": "Projects with no real offer, no proof, and no one ready to follow up",
    "fit.item1": "Local service businesses",
    "fit.item2": "Contractors and trades",
    "fit.item3": "Owner-led teams with outdated websites",
    "fit.item4": "Bilingual EN / ES businesses",
    "fit.item5": "Family-run shops growing past one person's memory",
    "fit.item6": "Service businesses that want clarity without more software",
    "faq.kicker": "Common questions",
    "faq.title": "The questions most owners ask before they reach out.",
    "faq.text": "If you're not a tech person, that's fine. This should still make sense.",
    "faq.q1": "What kind of businesses do you work with?",
    "faq.a1": "Any small business, but this is especially strong for local service businesses, trades, owner-operators, and bilingual businesses that need better follow-up and a stronger online presence.",
    "faq.q2": "Do I need a brand-new website?",
    "faq.a2": "Not always. Sometimes the best move is a cleaner website. Sometimes it's fixing contact flow, follow-up, or how leads are handled. The point is solving the real problem, not forcing a rebuild.",
    "faq.q3": "What does business automation actually mean?",
    "faq.a3": "Simple systems that save time and stop missed opportunities. Missed-call text-backs, lead routing, follow-up reminders, review requests, and basic admin cleanup. The stuff that quietly costs you money every day.",
    "faq.q4": "Do I need to understand any of the tech?",
    "faq.a4": "No. The whole point is to make this easier to use, not harder to understand. The work shows up clear on your side and useful in the real business.",
    "faq.q5": "Can you help bilingual businesses?",
    "faq.a5": "Yes. I work in English and Spanish. If your customers move between both, the website and customer flow get built to support that naturally, not as a translation tacked on at the end.",
    "faq.q6": "How much does this usually cost?",
    "faq.a6": "It depends on what actually needs fixing. The free workflow audit comes first so I can quote the real scope instead of guessing. Most small-business builds land between $600 and $2,500.",
    "faq.q7": "How long does this usually take?",
    "faq.a7": "Most builds are live in 2 to 4 weeks. Smaller fixes can move in days. The first step is figuring out whether you need one clean fix or a fuller system build.",
    "faq.q8": "How do we get started?",
    "faq.a8": "Fill out the form at the top, leave your phone and email, and tell me what feels messy. The free workflow audit comes back within 48 hours with the biggest win and the next move.",
    "contact.kicker": "Contact",
    "contact.title": "If the site feels behind or the follow-up feels messy, start here.",
    "contact.text": "Tell me what is breaking first. I'll point to the cleanest next move and tell you whether it needs a rebuild, a fix, or a smaller system behind it.",
    "contact.audit": "Request audit",
    "contact.call": "Email me",
    "contact.email": "Email me",
    "contact.emailLabel": "Email",
    "contact.areaLabel": "Service area",
    "contact.areaValue": "Lawrence & Framingham, MA, remote available",
    "contact.hoursLabel": "Hours",
    "contact.hoursValue": "Evenings & weekends, responses within 48 hours",
    "footer.name": "IC Business Systems",
    "footer.text": "Phone-first sites. Cleaner lead follow-up. Small-business systems that hold up after launch.",
    "footer.location": "Lawrence, MA",
    "audit.navlink": "Audit",
    "audit.eyebrow": "For local service businesses",
    "audit.title": "Guided 5-check audit",
    "audit.subhead": "Answer 5 yes/no questions about your site. Get a score and the first thing we'd fix. About 90 seconds.",
    "audit.tip": "Tip: open your site on your phone in another tab. That's where most of your leads land.",
    "audit.aboutHeading": "About the site",
    "audit.businessName": "Business name",
    "audit.businessNamePlaceholder": "e.g. Fast Fix Plumbing",
    "audit.websiteUrl": "Website URL",
    "audit.niche": "Niche",
    "audit.nichePlaceholder": "Select one",
    "audit.nichePlumbing": "Plumbing",
    "audit.nicheHvac": "HVAC",
    "audit.nicheElectrical": "Electrical",
    "audit.nicheLandscaping": "Landscaping",
    "audit.nicheRoofing": "Roofing",
    "audit.nicheOther": "Other / not listed",
    "audit.checksHeading": "5 quick checks: answer yes or no for what you see",
    "audit.checkPhone": "Phone number is easy to find on mobile",
    "audit.checkPhoneHelp": "What counts: a tap-to-call phone number visible on the first screen without scrolling. Click-to-text counts too.",
    "audit.checkCta": "Page has one obvious next step",
    "audit.checkCtaHelp": "What counts: one primary button or CTA (\"Get a quote,\" \"Book now\") that stands out above the fold. If 4 CTAs compete equally, mark this no.",
    "audit.checkTrust": "Reviews or real work visible near the top",
    "audit.checkTrustHelp": "What counts: real reviews (Google, Yelp), photos of completed jobs, or a service-area map within the first scroll. Stock photos don't count.",
    "audit.checkFriction": "Form length",
    "audit.checkFrictionHelp": "low = 3 or fewer fields (name + phone + service). medium = 4–6 fields. high = 7+ fields or multi-step.",
    "audit.frictionLow": "Low",
    "audit.frictionMedium": "Medium",
    "audit.frictionHigh": "High",
    "audit.checkMobile": "Reads cleanly on a phone",
    "audit.checkMobileHelp": "What counts: open it on your phone. Text readable without zoom. Buttons tappable. No weird gaps or broken images.",
    "audit.submit": "Run the audit",
    "audit.scoreOf": "/ 100",
    "audit.topLeakHeading": "Here's what we'd fix first",
    "audit.findingsHeading": "All 5 findings",
    "audit.ctaHeading": "Want the full breakdown?",
    "audit.ctaText": "I'll record a short video walking through what I'd actually fix on your site, then send a one-page action plan. No pitch.",
    "audit.ctaPrimary": "Get the full video audit",
    "audit.ctaSecondary": "DM AUDIT on Instagram",
    "thanks.eyebrow": "Request received",
    "thanks.title": "Thanks. Got your request.",
    "thanks.text": "I review every request personally and reply within 1 business day. If it is urgent, reply to the confirmation email and say that clearly.",
    "thanks.back": "Back to home"
  },
  es: {
    "brand.name": "IC Business Systems",
    "brand.tag": "Hecho para negocios pequeños de verdad",
    "nav.work": "Trabajos",
    "nav.services": "Servicios",
    "nav.systems": "Sistemas",
    "nav.process": "Proceso",
    "nav.founder": "Quién soy",
    "nav.faq": "Preguntas",
    "nav.contact": "Contacto",
    "cta.audit": "Pedir auditoría",
    "cta.letstalk": "Cotiza",
    "hero.eyebrow": "Para contratistas, cuadrillas, y negocios locales de servicio",
    "hero.title": "Haz que el negocio se vea al día, responda más rápido, y deje de perder buenos trabajos por un seguimiento desordenado.",
    "hero.text": "Construyo sitios pensados para el teléfono, una ruta de cotización más limpia, y automatizaciones prácticas para negocios de servicio que pasan el día trabajando de verdad, no sentados detrás de un escritorio esperando leads.",
    "hero.primaryCta": "Pide la auditoría gratis",
    "hero.secondaryCta": "Ver trabajos recientes",
    "hero.point1": "Páginas pensadas para teléfono que facilitan llamar o pedir cotización",
    "hero.point2": "Seguimiento que responde rápido mientras estás en un trabajo",
    "hero.point3": "Soporte bilingüe cuando tus clientes necesitan inglés y español",
    "signal.one": "Hecho por un plomero que también escribe código",
    "signal.two": "Bilingüe EN / ES",
    "signal.three": "Lawrence y Framingham, MA",
    "form.kicker": "Pide la auditoría",
    "form.title": "Cuéntame qué se siente desordenado.",
    "form.text": "Miro dónde se están escapando los leads, dónde se está acumulando la administración, y dónde está la mejora más grande. La revisada no cuesta nada.",
    "form.name": "Nombre",
    "form.business": "Nombre del negocio",
    "form.email": "Correo",
    "form.phone": "Teléfono",
    "form.need": "¿Con qué necesitas ayuda?",
    "form.select": "Escoge uno",
    "form.option1": "Limpieza o reconstrucción del sitio",
    "form.option2": "Captación y seguimiento de leads",
    "form.option3": "Automatización del flujo de trabajo",
    "form.option4": "No estoy seguro: empieza con la auditoría",
    "form.message": "¿Qué se siente desordenado ahora mismo?",
    "form.placeholder": "Llamadas perdidas, sitio flojo, seguimiento lento, mucha administración...",
    "form.submit": "Enviar solicitud",
    "form.note": "Dejas tu teléfono y tu correo una vez. Yo reviso el reguero y después te escribo con el mejor próximo movimiento.",
    "form.autoresponse": "Gracias por escribirle a IC Business Systems. Recibí tu solicitud y la voy a revisar pronto.",
    "proof.kicker": "Qué cambia primero",
    "proof.title": "La mayoría de los negocios no necesita una reconstrucción gigante. Necesita arreglar bien la puerta de entrada.",
    "proof.text": "Las ganancias más grandes suelen venir de la confianza, la jerarquía, la velocidad de respuesta, y una ruta de contacto más simple.",
    "proof.before.tag": "Antes",
    "proof.before.title": "El negocio es sólido. La página todavía no lo muestra.",
    "proof.before.item1": "Sitio web atrasado que carga lento y se ve como del 2014",
    "proof.before.item2": "No hay un próximo paso claro, así que los visitantes se van sin llamar",
    "proof.before.item3": "Número de teléfono enterrado en un footer que nadie ve",
    "proof.before.item4": "Las cotizaciones mueren en un correo personal",
    "proof.after.tag": "Después",
    "proof.after.title": "La primera pantalla se siente actual, clara, y lista para actuar.",
    "proof.after.item1": "Sitio rápido que se lee como un negocio real",
    "proof.after.item2": "Un próximo paso claro en cada pantalla",
    "proof.after.item3": "Teléfono arriba del fold, click-to-call en móvil",
    "proof.after.item4": "Cotizaciones ruteadas al instante con autorespuesta",
    "work.kicker": "Trabajos recientes",
    "work.title": "Negocios reales, viéndose en teléfonos ahora mismo.",
    "work.text": "No son mockups. Son proyectos en vivo, hechos para como la gente de verdad navega, llama, y decide.",
    "work.card1.kicker": "Food truck y catering de carnes ahumadas",
    "work.card1.title": "Sig's Kitchen BBQ",
    "work.card1.text": "Página de menú y reservas pensada para móvil que el dueño puede compartir en persona. Fremont, NH y Methuen, MA.",
    "work.card1.fact1": "Menú primero",
    "work.card1.fact2": "CTA para reservar",
    "work.card1.fact3": "Hecho para tráfico móvil",
    "work.card1.cta": "Abrir el sitio",
    "work.card2.kicker": "Plomería y calefacción",
    "work.card2.title": "S. Meredith Plumbing",
    "work.card2.text": "Sitio de confianza que hace sonar el teléfono, con licencias, área de servicio clara, y un camino obvio para llamar. Saugus, MA.",
    "work.card2.fact1": "Licencia al frente",
    "work.card2.fact2": "Toca para llamar",
    "work.card2.fact3": "Layout de confianza",
    "work.card2.cta": "Abrir el sitio",
    "work.card3.kicker": "Salón dominicano",
    "work.card3.title": "Mía Beauty Boutique",
    "work.card3.text": "Bilingüe ES/EN, walk-ins bienvenidos, 40+ años en la silla. Lawrence, MA.",
    "work.card3.fact1": "Bilingüe ES/EN",
    "work.card3.fact2": "Walk-ins bienvenidos",
    "work.card3.fact3": "Menú de servicios claro",
    "work.card3.cta": "Abrir el sitio",
    "services.kicker": "Lo que suelo arreglar primero",
    "services.title": "Las primeras tres mejoras que mueven un negocio de servicio.",
    "services.text": "La meta es una primera impresión más limpia, una ruta de contacto más simple, y menos trabajo cayendo de nuevo sobre el dueño.",
    "services.card1.title": "Claridad del sitio",
    "services.card1.text": "Páginas pensadas para teléfono con mejor jerarquía, más prueba de confianza, y una ruta de cotización más limpia.",
    "services.card2.title": "Seguimiento de leads",
    "services.card2.text": "Formularios, ruteo, autorespuestas, y la primera respuesta después de una llamada perdida.",
    "services.card3.title": "Sistemas pequeños",
    "services.card3.text": "Textos de vuelta, recordatorios, pedidos de reseña, y las automatizaciones pequeñas que evitan que el dueño cargue con todo.",
    "systems.kicker": "Cómo se ve eso en la práctica",
    "systems.title": "Unos pocos sistemas pequeños suelen hacer casi todo el trabajo.",
    "systems.text": "La idea no es automatizarlo todo. La idea es tapar primero las fugas obvias.",
    "systems.card1.label": "Texto a llamada perdida",
    "systems.card1.trigger": "Llamada perdida",
    "systems.card1.action": "Texto enviado en segundos",
    "systems.card1.outcome": "El lead se queda tibio",
    "systems.card2.label": "Ruteo instantáneo de leads",
    "systems.card2.trigger": "Formulario del sitio enviado",
    "systems.card2.action": "Ruteado directo a tu teléfono",
    "systems.card2.outcome": "Respuesta más rápida",
    "systems.card3.label": "Seguimiento de cotización",
    "systems.card3.trigger": "Cotización pedida",
    "systems.card3.action": "Seguimiento agendado automáticamente",
    "systems.card3.outcome": "Menos oportunidades perdidas",
    "systems.card4.label": "Pedido de reseña",
    "systems.card4.trigger": "Trabajo terminado",
    "systems.card4.action": "Solicitud de reseña enviada",
    "systems.card4.outcome": "Mejor reputación",
    "systems.card5.label": "Tracking de leads",
    "systems.card5.trigger": "Nueva consulta entra",
    "systems.card5.action": "Organizada en un solo tracker",
    "systems.card5.outcome": "Nada se escapa",
    "systems.card6.label": "Limpieza administrativa",
    "systems.card6.trigger": "Tarea repetitiva del día",
    "systems.card6.action": "Manejada en el fondo",
    "systems.card6.outcome": "El dueño hace trabajo de dueño",
    "process.kicker": "Cómo suelo correrlo",
    "process.title": "Cuatro semanas, una puerta de entrada más limpia para el negocio.",
    "process.week1.step": "Semana 1",
    "process.week2.step": "Semana 2",
    "process.week3.step": "Semana 3",
    "process.week4.step": "Semana 4",
    "process.card1.title": "Audito los puntos de fuga",
    "process.card1.text": "Reviso el sitio, la ruta de contacto, y los lugares donde los leads se quedan callados.",
    "process.card2.title": "Reconstruyo la parte con más fricción",
    "process.card2.text": "Puede ser la homepage, la ruta de cotización, o la primera secuencia de seguimiento.",
    "process.card3.title": "Lo lanzamos y probamos la ruta",
    "process.card3.text": "La página se publica, las respuestas se prueban, y la ruta del lead se revisa en un teléfono real.",
    "process.card4.title": "Aprieto lo que la gente sí usa",
    "process.card4.text": "Después de tráfico real y llamadas reales, aprieto las piezas que están cargando más peso.",
    "founder.kicker": "Con quién estás trabajando",
    "founder.title": "Paso mis días en trabajos de plomería y mis noches construyendo las herramientas que quisiera que los negocios pequeños ya tuvieran.",
    "founder.p1": "Soy aprendiz de plomería de tercer año trabajando alrededor de Lawrence y Framingham. También construyo sitios web y sistemas de flujo para negocios pequeños que necesitan operaciones más limpias, no una pila de software.",
    "founder.p2": "Esa mezcla importa. Sé cómo se ve cuando el dueño está en la troca, en una escalera, o debajo de un fregadero mientras el teléfono sigue sonando. Lo que construyo está pensado para esa realidad.",
    "founder.p3": "Todo se explica claro, se construye para funcionar en teléfono, y se deja armado para que todavía tenga sentido un mes después.",
    "founder.meta1": "Lawrence y Framingham, MA",
    "founder.meta2": "Bilingüe EN / ES",
    "founder.meta3": "Disponible noches y fines de semana",
    "founder.portrait.caption": "Irving Carrión, Lawrence, MA",
    "fit.kicker": "Mejor encaje",
    "fit.title": "Ideal para negocios de servicio llevados por el dueño, que ya hacen buen trabajo y necesitan que la parte de frente se ponga al día.",
    "fit.text": "Esto funciona mejor cuando el negocio es real, el operador está ocupado, y la meta es claridad, confianza, y seguimiento que de verdad se use.",
    "fit.good": "Buen encaje",
    "fit.good1": "Contratistas, trades, y negocios locales de servicio",
    "fit.good2": "Equipos que quieren un sitio más fuerte y una ruta más rápida al contacto",
    "fit.good3": "Negocios bilingües que atienden en inglés y español",
    "fit.not": "Probablemente no",
    "fit.not1": "Founders buscando una landing page llamativa de startup",
    "fit.not2": "Equipos que quieren software infinito en vez de un proceso más limpio",
    "fit.not3": "Proyectos sin oferta real, sin prueba, y sin nadie listo para dar seguimiento",
    "fit.item1": "Negocios locales de servicio",
    "fit.item2": "Contratistas y trades",
    "fit.item3": "Equipos manejados por el dueño con sitios atrasados",
    "fit.item4": "Negocios bilingües EN / ES",
    "fit.item5": "Negocios familiares creciendo más allá de la memoria de una sola persona",
    "fit.item6": "Negocios de servicio que quieren claridad sin más software",
    "faq.kicker": "Preguntas frecuentes",
    "faq.title": "Las preguntas que la mayoría de los dueños hacen antes de escribir.",
    "faq.text": "Si no eres una persona técnica, está bien. Esto debe hacer sentido igual.",
    "faq.q1": "¿Con qué tipo de negocios trabajas?",
    "faq.a1": "Con cualquier negocio pequeño, pero esto pega especialmente fuerte con negocios locales de servicio, trades, owner-operators, y negocios bilingües que necesitan mejor seguimiento y una presencia online más fuerte.",
    "faq.q2": "¿Necesito un sitio web completamente nuevo?",
    "faq.a2": "No siempre. A veces el mejor movimiento es un sitio más limpio. A veces es arreglar el flujo de contacto, el seguimiento, o cómo se están manejando los leads. La idea es resolver el problema real, no forzar una reconstrucción.",
    "faq.q3": "¿Qué significa automatización del negocio de verdad?",
    "faq.a3": "Sistemas simples que ahorran tiempo y paran oportunidades perdidas. Texto a llamada perdida, ruteo de leads, recordatorios de seguimiento, pedidos de reseña, y limpieza administrativa básica. Lo que silenciosamente te cuesta dinero todos los días.",
    "faq.q4": "¿Tengo que entender la tecnología?",
    "faq.a4": "No. El punto entero es hacer esto más fácil de usar, no más difícil de entender. El trabajo se ve claro de tu lado y útil en el negocio real.",
    "faq.q5": "¿Puedes ayudar a negocios bilingües?",
    "faq.a5": "Sí. Trabajo en inglés y español. Si tus clientes se mueven entre los dos, el sitio y el flujo con el cliente se construyen para apoyar eso naturalmente, no como una traducción pegada al final.",
    "faq.q6": "¿Cuánto suele costar esto?",
    "faq.a6": "Depende de lo que de verdad haya que arreglar. La auditoría gratis va primero para que pueda cotizar el alcance real sin adivinar. La mayoría de las construcciones para negocios pequeños cae entre $600 y $2,500.",
    "faq.q7": "¿Cuánto tiempo suele tomar?",
    "faq.a7": "La mayoría se publica en 2 a 4 semanas. Los arreglos pequeños pueden moverse en días. El primer paso es ver si necesitas un arreglo limpio o una construcción más completa.",
    "faq.q8": "¿Cómo empezamos?",
    "faq.a8": "Llena el formulario arriba, deja tu teléfono y correo, y cuéntame qué se siente desordenado. La auditoría gratis vuelve en 48 horas con la ganancia más grande y el próximo movimiento.",
    "contact.kicker": "Contacto",
    "contact.title": "Si el sitio se siente atrasado o el seguimiento se siente desordenado, empieza aquí.",
    "contact.text": "Dime qué se está rompiendo primero. Te diré cuál es el próximo movimiento más limpio y si necesita una reconstrucción, un arreglo, o un sistema pequeño detrás.",
    "contact.audit": "Pedir auditoría",
    "contact.call": "Escríbeme",
    "contact.email": "Escríbeme",
    "contact.emailLabel": "Correo",
    "contact.areaLabel": "Área de servicio",
    "contact.areaValue": "Lawrence y Framingham, MA, disponible remoto",
    "contact.hoursLabel": "Horario",
    "contact.hoursValue": "Noches y fines de semana, respuestas en 48 horas",
    "footer.name": "IC Business Systems",
    "footer.text": "Sitios pensados para teléfono. Seguimiento más limpio. Sistemas para negocios pequeños que aguantan después del lanzamiento.",
    "footer.location": "Lawrence, MA",
    "audit.navlink": "Auditoría",
    "audit.eyebrow": "Para negocios de servicios locales",
    "audit.title": "Auditoría guiada de 5 puntos",
    "audit.subhead": "Responde 5 preguntas de sí o no sobre tu sitio. Recibe una puntuación y la primera cosa que arreglaríamos. Unos 90 segundos.",
    "audit.tip": "Tip: abre tu sitio en tu teléfono en otra pestaña. Ahí es donde cae la mayoría de tus leads.",
    "audit.aboutHeading": "Sobre el sitio",
    "audit.businessName": "Nombre del negocio",
    "audit.businessNamePlaceholder": "ej. Fast Fix Plumbing",
    "audit.websiteUrl": "URL del sitio",
    "audit.niche": "Rubro",
    "audit.nichePlaceholder": "Elige uno",
    "audit.nichePlumbing": "Plomería",
    "audit.nicheHvac": "HVAC",
    "audit.nicheElectrical": "Electricidad",
    "audit.nicheLandscaping": "Jardinería",
    "audit.nicheRoofing": "Techado",
    "audit.nicheOther": "Otro / no listado",
    "audit.checksHeading": "5 chequeos rápidos: responde sí o no según lo que ves",
    "audit.checkPhone": "El teléfono se encuentra fácil en el móvil",
    "audit.checkPhoneHelp": "Qué cuenta: un teléfono con clic-para-llamar visible en la primera pantalla sin scroll. Clic-para-mensaje también cuenta.",
    "audit.checkCta": "La página tiene un próximo paso obvio",
    "audit.checkCtaHelp": "Qué cuenta: un botón principal o CTA (\"Obtén una cotización,\" \"Reserva ahora\") que destaca arriba del pliegue. Si hay 4 CTAs compitiendo, marca no.",
    "audit.checkTrust": "Reseñas o trabajo real visibles cerca del inicio",
    "audit.checkTrustHelp": "Qué cuenta: reseñas reales (Google, Yelp), fotos de trabajos terminados, o un mapa de área de servicio dentro del primer scroll. Las fotos de stock no cuentan.",
    "audit.checkFriction": "Largo del formulario",
    "audit.checkFrictionHelp": "bajo = 3 o menos campos (nombre + teléfono + servicio). medio = 4–6 campos. alto = 7+ campos o multi-paso.",
    "audit.frictionLow": "Bajo",
    "audit.frictionMedium": "Medio",
    "audit.frictionHigh": "Alto",
    "audit.checkMobile": "Se lee bien en el teléfono",
    "audit.checkMobileHelp": "Qué cuenta: ábrelo en tu teléfono. Texto legible sin zoom. Botones presionables. Sin espacios raros o imágenes rotas.",
    "audit.submit": "Hacer la auditoría",
    "audit.scoreOf": "/ 100",
    "audit.topLeakHeading": "Esto es lo que arreglaríamos primero",
    "audit.findingsHeading": "Los 5 hallazgos",
    "audit.ctaHeading": "¿Quieres el desglose completo?",
    "audit.ctaText": "Grabaré un video corto explicando lo que arreglaría en tu sitio, y te mando un plan de acción de una página. Sin presión.",
    "audit.ctaPrimary": "Recibe la auditoría en video",
    "audit.ctaSecondary": "DM AUDIT por Instagram",
    "thanks.eyebrow": "Solicitud recibida",
    "thanks.title": "Gracias. Recibí tu solicitud.",
    "thanks.text": "Reviso cada solicitud personalmente y respondo dentro de 1 día hábil. Si es urgente, responde al correo de confirmación y dilo claramente.",
    "thanks.back": "Volver al inicio"
  }
};

/* ============ Reveal on scroll ============ */
const revealSelector = [
  ".hero-copy",
  ".hero-form-shell",
  ".proof-card",
  ".work-card",
  ".service-row",
  ".flow-card",
  ".process-node",
  ".founder-portrait",
  ".founder-copy",
  ".fit-copy",
  ".fit-list",
  ".faq-intro",
  ".faq-item",
  ".contact-copy",
  ".contact-card"
].join(",");

const revealTargets = document.querySelectorAll(revealSelector);
revealTargets.forEach((node) => node.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
);

revealTargets.forEach((node) => observer.observe(node));

/* ============ Active nav state ============ */
// Only consider bare in-page anchors (`#section`). Cross-page hrefs like
// `/#proof` (used by audit.html nav to jump back to home + scroll) are valid
// HTML links but NOT valid CSS selectors — guard against the SyntaxError.
const sectionTargets = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    if (!href || href[0] !== "#" || href.length < 2) return null;
    try { return document.querySelector(href); } catch { return null; }
  })
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
    if (isMatch) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

if (sectionTargets.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveNav(visible.target.id);
    },
    { rootMargin: "-28% 0px -52% 0px", threshold: [0.2, 0.45, 0.7] }
  );
  sectionTargets.forEach((section) => navObserver.observe(section));
}

/* ============ FAQ accordion (auto-close others) ============ */
const faqItems = Array.from(document.querySelectorAll(".faq-item"));
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

/* ============ Language switching ============ */
const setLanguage = (lang) => {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dict[key]) node.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-lang-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langTarget === lang);
  });

  if (autoResponseField && dict["form.autoresponse"]) {
    autoResponseField.value = dict["form.autoresponse"];
  }

  try { window.localStorage.setItem("icbs-language", lang); } catch {}

  // Notify dynamic-content modules (audit.js) to re-localize after we've
  // already swapped static [data-i18n] copy. Fired AFTER documentElement.lang
  // is updated so listeners can read the new locale immediately.
  try {
    window.dispatchEvent(new CustomEvent("icbs:languagechange", { detail: { lang } }));
  } catch (e) { /* CustomEvent unsupported in ancient browsers — ignore */ }
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
    try { return window.localStorage.getItem("icbs-language"); } catch { return null; }
  })();
  if (!saved) setLanguage(detectLanguage());
});

setLanguage(detectLanguage());

/* ============ Mobile menu ============ */
const setMenuOpen = (open) => {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.toggle("is-open", open);
  hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  const openLabel = hamburger.dataset.labelOpen || "Open menu";
  const closeLabel = hamburger.dataset.labelClose || "Close menu";
  hamburger.setAttribute("aria-label", open ? closeLabel : openLabel);
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.classList.toggle("menu-open", open);
};

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.contains("is-open");
    setMenuOpen(!isOpen);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      setMenuOpen(false);
      hamburger.focus();
    }
  });
}
