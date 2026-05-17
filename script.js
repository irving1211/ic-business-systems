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
    "cta.audit": "Free audit",
    "cta.letstalk": "Get quote",
    "hero.eyebrow": "For local service businesses & owner-operators",
    "hero.title": "We stop the leaks in your leads, your follow-up, and your day-to-day.",
    "hero.text": "Sharper websites, cleaner lead capture, and simple systems that handle the work piling up around the operator. Built for the businesses that grew faster than the tools behind them.",
    "hero.primaryCta": "Get a free workflow audit",
    "hero.secondaryCta": "Or email hello@icbusinesssystems.com",
    "hero.point1": "Look the part online so people stop scrolling past",
    "hero.point2": "Catch the calls and quotes you're losing to dead air",
    "hero.point3": "Take the admin off the owner's plate",
    "signal.one": "Bilingual EN / ES",
    "signal.two": "Built by a working tradesman",
    "signal.three": "Lawrence & Framingham, MA",
    "form.kicker": "Free workflow audit",
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
    "form.option4": "Not sure — start with the audit",
    "form.message": "What feels messy right now?",
    "form.placeholder": "Missed calls, weak website, slow follow-up, too much admin...",
    "form.submit": "Send request",
    "form.note": "Leave your phone and email once. I review the mess, then I reach out with the best next move.",
    "form.autoresponse": "Thanks for reaching out to IC Business Systems. I got your request and will review it soon.",
    "proof.kicker": "What changes",
    "proof.title": "From feeling behind to feeling current.",
    "proof.text": "Same business. Sharper face. Cleaner systems behind it. The difference shows up in the first five seconds.",
    "proof.before.tag": "Before",
    "proof.before.title": "Looks behind. Feels ignored.",
    "proof.before.item1": "Outdated website that loads slow and looks like 2014",
    "proof.before.item2": "No clear next step — visitors leave without calling",
    "proof.before.item3": "Phone number buried in a footer no one scrolls to",
    "proof.before.item4": "Quote requests die in a personal inbox",
    "proof.before.item5": "Missed calls never come back",
    "proof.before.item6": "No follow-up — leads cool off in 48 hours",
    "proof.after.tag": "After",
    "proof.after.title": "Looks current. Feels handled.",
    "proof.after.item1": "Sharper site that loads fast and reads like a real business",
    "proof.after.item2": "One clear next step on every screen",
    "proof.after.item3": "Phone number above the fold, click-to-call on mobile",
    "proof.after.item4": "Quote requests routed instantly with an autoresponse",
    "proof.after.item5": "Missed calls get a text-back the moment they hang up",
    "proof.after.item6": "Leads stay warm with a simple follow-up sequence",
    "work.kicker": "Recent work",
    "work.title": "Real businesses, just shipped.",
    "work.text": "Three sites from the last two weeks. Open them on your phone — that's where their customers will see them first.",
    "work.card1.kicker": "Slow-smoked food truck & catering",
    "work.card1.title": "Sig's Kitchen BBQ",
    "work.card1.text": "Mobile-first menu and booking page the owner can hand out in person. Fremont, NH & Methuen, MA.",
    "work.card1.cta": "Open the site →",
    "work.card2.kicker": "Plumbing & heating",
    "work.card2.title": "S. Meredith Plumbing",
    "work.card2.text": "Trust-first site that gets the phone ringing — service area, licensing, and one giant call button. Saugus, MA.",
    "work.card2.cta": "Open the site →",
    "work.card3.kicker": "Dominican hair salon",
    "work.card3.title": "Mía Beauty Boutique",
    "work.card3.text": "Bilingual ES/EN, walk-ins welcome, 40+ years in the chair. Lawrence, MA.",
    "work.card3.cta": "Open the site →",
    "services.kicker": "What I build",
    "services.title": "Three upgrades that usually move the business fastest.",
    "services.text": "Less theory. Less tech talk. Clean fixes that make the business look better and run better.",
    "services.card1.title": "Websites",
    "services.card1.text": "Sharper sites that load fast, read clearly, and make the business feel legit the second someone lands on it. Bilingual ready.",
    "services.card2.title": "Lead follow-up",
    "services.card2.text": "Better quote capture, instant routing, faster response, and a simple follow-up sequence so warm leads stop going cold.",
    "services.card3.title": "Business automation",
    "services.card3.text": "Small systems that catch missed calls, send reminders, ask for reviews, and keep the owner from being the whole system.",
    "systems.kicker": "What gets cleaner behind the scenes",
    "systems.title": "Small systems that catch the work you're losing.",
    "systems.text": "Plain-English automations that handle the parts of the day where leads slip and admin piles up. Trigger → action → outcome.",
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
    "process.kicker": "How this works in 30 days",
    "process.title": "Four steps. Four weeks. A business that feels sharper.",
    "process.week1.step": "Week 1",
    "process.week2.step": "Week 2",
    "process.week3.step": "Week 3",
    "process.week4.step": "Week 4",
    "process.card1.title": "We find the leaks",
    "process.card1.text": "Free workflow audit. Website, follow-up, contact flow, and where things are getting missed. You see the map.",
    "process.card2.title": "I build the cleaner version",
    "process.card2.text": "A better site, a sharper lead flow, or a simpler process — whichever moves the most weight first.",
    "process.card3.title": "We launch and put it in front of customers",
    "process.card3.text": "Site goes live, automations come online, phone routing tested with real calls. You start collecting wins.",
    "process.card4.title": "We tune what gets used most",
    "process.card4.text": "Real-world adjustments based on the first two weeks of leads. The business stops dragging on the operator.",
    "founder.kicker": "Who you're working with",
    "founder.title": "Irving — I build systems with my hands and on screens.",
    "founder.p1": "I'm a third-year plumbing apprentice working out of Lawrence and Framingham, MA. I've also spent the last few years building the kind of automation systems large tech companies pay six figures for.",
    "founder.p2": "That mix is the whole point. I know what it feels like to drive between job sites with the phone ringing — and I know how to build the system that catches every one of those calls.",
    "founder.p3": "The work shows up on time and reads like English. No jargon, no agency theater. Bilingual EN/ES, blue-collar aware, and built to last past launch week.",
    "founder.meta1": "Lawrence & Framingham, MA",
    "founder.meta2": "Bilingual EN / ES",
    "founder.meta3": "Available evenings & weekends",
    "founder.portrait.caption": "Irving Carrion · Lawrence, MA",
    "fit.kicker": "Best fit",
    "fit.title": "If the business runs on the owner, this is for you.",
    "fit.text": "I work best with operators who do the work, answer the phone, and know exactly where the day is leaking.",
    "fit.item1": "Local service businesses (plumbing, HVAC, electrical, grooming, cleaning, landscaping)",
    "fit.item2": "Contractors & trades",
    "fit.item3": "Owner-operators with outdated websites",
    "fit.item4": "Bilingual EN / ES businesses serving Spanish-speaking customers",
    "fit.item5": "Family-run shops growing past one person's memory",
    "fit.item6": "Service businesses that want to look sharper without getting buried in tech",
    "faq.kicker": "Common questions",
    "faq.title": "The questions most owners ask before they reach out.",
    "faq.text": "If you're not a tech person, that's fine. This should still make sense.",
    "faq.q1": "What kind of businesses do you work with?",
    "faq.a1": "Any small business, but this is especially strong for local service businesses, trades, owner-operators, and bilingual businesses that need better follow-up and a stronger online presence.",
    "faq.q2": "Do I need a brand-new website?",
    "faq.a2": "Not always. Sometimes the best move is a cleaner website. Sometimes it's fixing contact flow, follow-up, or how leads are handled. The point is solving the real problem, not forcing a rebuild.",
    "faq.q3": "What does business automation actually mean?",
    "faq.a3": "Simple systems that save time and stop missed opportunities. Missed-call text-backs, lead routing, follow-up reminders, review requests, basic admin cleanup — the stuff that quietly costs you money every day.",
    "faq.q4": "Do I need to understand any of the tech?",
    "faq.a4": "No. The whole point is to make this easier to use, not harder to understand. The work shows up clear on your side and useful in the real business.",
    "faq.q5": "Can you help bilingual businesses?",
    "faq.a5": "Yes. I work in English and Spanish. If your customers move between both, the website and the customer flow get built to support that naturally — not as a translation tacked on at the end.",
    "faq.q6": "How much does this usually cost?",
    "faq.a6": "It depends on what actually needs fixing. The free workflow audit comes first so I can quote the real scope instead of guessing. Most small-business builds land between $600 and $2,500.",
    "faq.q7": "How long does this usually take?",
    "faq.a7": "Most builds are live in 2 to 4 weeks. Smaller fixes can move in days. The first step is figuring out whether you need one clean fix or a fuller system build.",
    "faq.q8": "How do we get started?",
    "faq.a8": "Fill out the form at the top, leave your phone and email, and tell me what feels messy. Free workflow audit comes back within 48 hours with the biggest win and what the next move should be.",
    "contact.kicker": "Contact",
    "contact.title": "Need a sharper site, better follow-up, or a system that saves time?",
    "contact.text": "Start with the free workflow audit at the top of the page, or reach out directly if you already know what you need.",
    "contact.audit": "Free workflow audit",
    "contact.call": "Email",
    "contact.email": "Email me",
    "contact.emailLabel": "Email",
    "contact.areaLabel": "Service area",
    "contact.areaValue": "Lawrence & Framingham, MA · remote available",
    "contact.hoursLabel": "Hours",
    "contact.hoursValue": "Evenings & weekends · responses within 48 hours",
    "footer.name": "IC Business Systems",
    "footer.text": "Sharper sites. Cleaner lead follow-up. Small-business systems that hold up after launch.",
    "footer.location": "Lawrence, MA"
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
    "cta.audit": "Auditoría gratis",
    "cta.letstalk": "Cotiza",
    "hero.eyebrow": "Para negocios locales de servicio y owner-operators",
    "hero.title": "Cerramos las fugas en tus leads, tu seguimiento y tu día a día.",
    "hero.text": "Sitios más nítidos, captación de leads más limpia, y sistemas sencillos que se ocupan del trabajo que se le va acumulando al dueño. Hecho para negocios que crecieron más rápido que las herramientas detrás.",
    "hero.primaryCta": "Pide tu auditoría gratis",
    "hero.secondaryCta": "O escribe a hello@icbusinesssystems.com",
    "hero.point1": "Verte más profesional para que la gente deje de pasar de largo",
    "hero.point2": "Capturar las llamadas y cotizaciones que estás perdiendo",
    "hero.point3": "Quitarle la administración de encima al dueño",
    "signal.one": "Bilingüe EN / ES",
    "signal.two": "Hecho por un tradesman activo",
    "signal.three": "Lawrence y Framingham, MA",
    "form.kicker": "Auditoría gratis de tu negocio",
    "form.title": "Cuéntame qué se siente desorganizado.",
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
    "form.option4": "No estoy seguro — empieza con la auditoría",
    "form.message": "¿Qué se siente desorganizado ahora mismo?",
    "form.placeholder": "Llamadas perdidas, sitio flojo, seguimiento lento, mucha administración...",
    "form.submit": "Enviar solicitud",
    "form.note": "Dejas tu teléfono y tu correo una vez. Yo reviso el reguero y después te escribo con el mejor próximo movimiento.",
    "form.autoresponse": "Gracias por escribirle a IC Business Systems. Recibí tu solicitud y la voy a revisar pronto.",
    "proof.kicker": "Lo que cambia",
    "proof.title": "De sentirse atrás a sentirse al día.",
    "proof.text": "El mismo negocio. Cara más nítida. Sistemas más limpios detrás. La diferencia se nota en los primeros cinco segundos.",
    "proof.before.tag": "Antes",
    "proof.before.title": "Se ve atrás. Se siente ignorado.",
    "proof.before.item1": "Sitio web atrasado que carga lento y se ve como del 2014",
    "proof.before.item2": "Sin un próximo paso claro — los visitantes se van sin llamar",
    "proof.before.item3": "Número de teléfono enterrado en un footer que nadie ve",
    "proof.before.item4": "Las cotizaciones mueren en un correo personal",
    "proof.before.item5": "Las llamadas perdidas no se devuelven",
    "proof.before.item6": "Sin seguimiento — los leads se enfrían en 48 horas",
    "proof.after.tag": "Después",
    "proof.after.title": "Se ve al día. Se siente atendido.",
    "proof.after.item1": "Sitio más nítido que carga rápido y se lee como un negocio real",
    "proof.after.item2": "Un próximo paso claro en cada pantalla",
    "proof.after.item3": "Teléfono arriba del fold, click-to-call en móvil",
    "proof.after.item4": "Cotizaciones ruteadas al instante con autorespuesta",
    "proof.after.item5": "Las llamadas perdidas reciben un texto al momento que cuelgan",
    "proof.after.item6": "Los leads se mantienen tibios con una secuencia simple de seguimiento",
    "work.kicker": "Trabajos recientes",
    "work.title": "Negocios reales, recién entregados.",
    "work.text": "Tres sitios de las últimas dos semanas. Ábrelos en tu teléfono — ahí es donde sus clientes los van a ver primero.",
    "work.card1.kicker": "Food truck y catering de carnes ahumadas",
    "work.card1.title": "Sig's Kitchen BBQ",
    "work.card1.text": "Página de menú y reservas mobile-first que el dueño puede entregar en persona. Fremont, NH y Methuen, MA.",
    "work.card1.cta": "Abrir el sitio →",
    "work.card2.kicker": "Plomería y calefacción",
    "work.card2.title": "S. Meredith Plumbing",
    "work.card2.text": "Sitio de confianza que hace sonar el teléfono — área de servicio, licencias y un botón gigante para llamar. Saugus, MA.",
    "work.card2.cta": "Abrir el sitio →",
    "work.card3.kicker": "Salón dominicano",
    "work.card3.title": "Mía Beauty Boutique",
    "work.card3.text": "Bilingüe ES/EN, walk-ins bienvenidos, 40+ años en la silla. Lawrence, MA.",
    "work.card3.cta": "Abrir el sitio →",
    "services.kicker": "Lo que construyo",
    "services.title": "Tres upgrades que suelen mover el negocio más rápido.",
    "services.text": "Menos teoría. Menos palabreo técnico. Arreglos limpios que hacen que el negocio se vea mejor y corra mejor.",
    "services.card1.title": "Sitios web",
    "services.card1.text": "Sitios más nítidos que cargan rápido, leen claro y hacen que el negocio se sienta legítimo desde que alguien cae ahí. Listos para bilingüe.",
    "services.card2.title": "Seguimiento de leads",
    "services.card2.text": "Mejor captación, ruteo instantáneo, respuesta más rápida, y una secuencia simple de seguimiento para que los leads tibios no se enfríen.",
    "services.card3.title": "Automatización del negocio",
    "services.card3.text": "Sistemas pequeños que capturan llamadas perdidas, envían recordatorios, piden reseñas, y evitan que el dueño sea el sistema completo.",
    "systems.kicker": "Lo que se limpia detrás del telón",
    "systems.title": "Sistemas pequeños que atrapan el trabajo que estás perdiendo.",
    "systems.text": "Automatizaciones en lenguaje claro que se hacen cargo de las partes del día donde los leads se escapan y la administración se acumula. Disparador → acción → resultado.",
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
    "systems.card3.action": "Seguimiento agendado solo",
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
    "process.kicker": "Cómo funciona esto en 30 días",
    "process.title": "Cuatro pasos. Cuatro semanas. Un negocio que se siente más nítido.",
    "process.week1.step": "Semana 1",
    "process.week2.step": "Semana 2",
    "process.week3.step": "Semana 3",
    "process.week4.step": "Semana 4",
    "process.card1.title": "Encontramos las fugas",
    "process.card1.text": "Auditoría gratis del flujo. Sitio, seguimiento, flujo de contacto, y dónde se están perdiendo cosas. Ves el mapa.",
    "process.card2.title": "Construyo la versión más limpia",
    "process.card2.text": "Un mejor sitio, un flujo de leads más nítido, o un proceso más simple — el que mueva más peso primero.",
    "process.card3.title": "Lanzamos y lo ponemos frente al cliente",
    "process.card3.text": "El sitio se publica, las automatizaciones se prenden, el ruteo del teléfono se prueba con llamadas reales. Empiezas a coleccionar wins.",
    "process.card4.title": "Afinamos lo que más se usa",
    "process.card4.text": "Ajustes reales basados en las primeras dos semanas de leads. El negocio deja de arrastrar al operador.",
    "founder.kicker": "Con quién estás trabajando",
    "founder.title": "Irving — construyo sistemas con las manos y en pantalla.",
    "founder.p1": "Soy plomero de tercer año en Lawrence y Framingham, MA. También he pasado los últimos años construyendo el tipo de sistemas de automatización por los que las grandes empresas tecnológicas pagan seis cifras.",
    "founder.p2": "Esa mezcla es el punto entero. Sé lo que se siente manejar entre trabajos con el teléfono sonando — y sé cómo construir el sistema que atrapa cada una de esas llamadas.",
    "founder.p3": "El trabajo llega a tiempo y se lee como español de verdad. Sin jerga, sin teatro de agencia. Bilingüe EN/ES, blue-collar aware, hecho para durar después de la semana del lanzamiento.",
    "founder.meta1": "Lawrence y Framingham, MA",
    "founder.meta2": "Bilingüe EN / ES",
    "founder.meta3": "Disponible noches y fines de semana",
    "founder.portrait.caption": "Irving Carrión · Lawrence, MA",
    "fit.kicker": "Mejor encaje",
    "fit.title": "Si el negocio corre sobre el dueño, esto es para ti.",
    "fit.text": "Trabajo mejor con operadores que hacen el trabajo, contestan el teléfono, y saben exactamente por dónde se está fugando el día.",
    "fit.item1": "Negocios locales de servicio (plomería, HVAC, eléctrica, grooming, limpieza, jardinería)",
    "fit.item2": "Contratistas y trades",
    "fit.item3": "Owner-operators con sitios atrasados",
    "fit.item4": "Negocios bilingües EN / ES sirviendo a clientes hispanohablantes",
    "fit.item5": "Negocios familiares creciendo más allá de la memoria de una sola persona",
    "fit.item6": "Negocios de servicio que quieren verse más nítidos sin enterrarse en tecnología",
    "faq.kicker": "Preguntas frecuentes",
    "faq.title": "Las preguntas que la mayoría de los dueños hacen antes de escribir.",
    "faq.text": "Si no eres una persona técnica, está bien. Esto debe hacer sentido igual.",
    "faq.q1": "¿Con qué tipo de negocios trabajas?",
    "faq.a1": "Con cualquier negocio pequeño, pero esto pega especialmente fuerte con negocios locales de servicio, trades, owner-operators, y negocios bilingües que necesitan mejor seguimiento y una presencia online más fuerte.",
    "faq.q2": "¿Necesito un sitio web completamente nuevo?",
    "faq.a2": "No siempre. A veces el mejor movimiento es un sitio más limpio. A veces es arreglar el flujo de contacto, el seguimiento, o cómo se están manejando los leads. La idea es resolver el problema real, no forzar una reconstrucción.",
    "faq.q3": "¿Qué significa automatización del negocio de verdad?",
    "faq.a3": "Sistemas simples que ahorran tiempo y paran oportunidades perdidas. Texto a llamada perdida, ruteo de leads, recordatorios de seguimiento, pedidos de reseña, limpieza administrativa básica — lo que silenciosamente te cuesta dinero todos los días.",
    "faq.q4": "¿Tengo que entender la tecnología?",
    "faq.a4": "No. El punto entero es hacer esto más fácil de usar, no más difícil de entender. El trabajo se ve claro de tu lado y útil en el negocio real.",
    "faq.q5": "¿Puedes ayudar a negocios bilingües?",
    "faq.a5": "Sí. Trabajo en inglés y español. Si tus clientes se mueven entre los dos, el sitio y el flujo con el cliente se construyen para apoyar eso naturalmente — no como una traducción pegada al final.",
    "faq.q6": "¿Cuánto suele costar esto?",
    "faq.a6": "Depende de lo que de verdad haya que arreglar. La auditoría gratis va primero para que pueda cotizar el alcance real sin adivinar. La mayoría de las construcciones para negocios pequeños caen entre $600 y $2,500.",
    "faq.q7": "¿Cuánto tiempo suele tomar?",
    "faq.a7": "La mayoría se publica en 2 a 4 semanas. Los arreglos pequeños pueden moverse en días. El primer paso es ver si necesitas un arreglo limpio o una construcción más completa.",
    "faq.q8": "¿Cómo empezamos?",
    "faq.a8": "Llena el formulario arriba, deja tu teléfono y correo, y cuéntame qué se siente desorganizado. La auditoría gratis vuelve en 48 horas con la ganancia más grande y cuál debe ser el próximo movimiento.",
    "contact.kicker": "Contacto",
    "contact.title": "¿Necesitas un sitio más nítido, mejor seguimiento, o un sistema que te ahorre tiempo?",
    "contact.text": "Empieza con la auditoría gratis arriba en la página, o escríbeme directo si ya sabes lo que necesitas.",
    "contact.audit": "Auditoría gratis del flujo",
    "contact.call": "Escribe",
    "contact.email": "Escríbeme",
    "contact.emailLabel": "Correo",
    "contact.areaLabel": "Área de servicio",
    "contact.areaValue": "Lawrence y Framingham, MA · disponible remoto",
    "contact.hoursLabel": "Horario",
    "contact.hoursValue": "Noches y fines de semana · respuestas en 48 horas",
    "footer.name": "IC Business Systems",
    "footer.text": "Sitios más nítidos. Seguimiento más limpio. Sistemas que aguantan después del lanzamiento.",
    "footer.location": "Lawrence, MA"
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
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
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
