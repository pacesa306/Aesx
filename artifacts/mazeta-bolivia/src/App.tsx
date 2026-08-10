import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, ChevronRight, House, Instagram, MapPin, Menu, MessageCircle, ShoppingBag, UserRoundPlus, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type SectionId = 'inicio' | 'sucursales' | 'tienda' | 'regalos' | 'promociones' | 'quienes-somos' | 'redes' | 'buzon' | 'inscribete';

const primaryNavigation: Array<{ id: SectionId; label: string }> = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'sucursales', label: 'SUCURSALES' },
  { id: 'tienda', label: 'TIENDA' },
  { id: 'regalos', label: '🎁 REGALOS' },
  { id: 'promociones', label: 'PROMOCIONES' },
  { id: 'quienes-somos', label: '¿QUIÉNES SOMOS?' },
  { id: 'redes', label: 'REDES SOCIALES' },
  { id: 'buzon', label: 'BUZÓN DE SUGERENCIAS' },
  { id: 'inscribete', label: 'INSCRÍBETE' },
];

const bottomNavigation: Array<{ id: SectionId; label: string }> = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'sucursales', label: 'SUCURSALES' },
  { id: 'tienda', label: 'TIENDA' },
  { id: 'inscribete', label: 'INSCRÍBETE' },
];

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function NavIcon({ id }: { id: SectionId }) {
  if (id === 'inicio') return <House strokeWidth={1.7} />;
  if (id === 'sucursales') return <MapPin strokeWidth={1.7} />;
  if (id === 'tienda') return <ShoppingBag strokeWidth={1.7} />;
  return <UserRoundPlus strokeWidth={1.7} />;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    const sectionIds = primaryNavigation.map(({ id }) => id);
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-22% 0px -65% 0px', threshold: 0 },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const goTo = (id: SectionId) => {
    setActiveSection(id);
    setMenuOpen(false);
    scrollToSection(id);
  };

  const handleSuggestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuggestionSent(true);
    event.currentTarget.reset();
  };

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="mazeta-shell">
      <header className="site-header">
        <button className="wordmark" data-testid="link-wordmark" onClick={() => goTo('inicio')} aria-label="Volver al inicio">
          MAZETA <span>BOLIVIA</span>
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {primaryNavigation.slice(0, 6).map((item) => (
            <button
              className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              data-testid={`link-nav-${item.id}`}
              key={item.id}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="menu-trigger"
          data-testid="button-toggle-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={25} strokeWidth={1.5} /> : <Menu size={25} strokeWidth={1.5} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Menú móvil">
          <ul className="mobile-menu-list">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <button
                  className={activeSection === item.id ? 'is-active' : ''}
                  data-testid={`link-mobile-${item.id}`}
                  onClick={() => goTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="main-content">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow reveal">La forma de lo cotidiano</span>
            <h1 className="hero-title reveal reveal-delay">
              Hecho para <em>mirar</em>
              <br />
              otra vez.
            </h1>
            <p className="hero-note reveal reveal-delay">
              Una selección de objetos, prendas y gestos para vivir a tu manera. Desde Bolivia, con intención.
            </p>
          </div>
          <span className="hero-mark">MDZ / 2025 — BOLIVIA</span>
          <span className="hero-stamp">HECHO<br />PARA<br />QUEDARSE</span>
        </section>

        <section className="section" id="sucursales">
          <div className="section-header">
            <span className="section-number">01 — PRESENCIA</span>
            <div>
              <h2 className="section-title">Ven a <span className="quiet">conocernos.</span></h2>
              <p className="section-intro">Pasa por una de nuestras tiendas. Espacios pensados para descubrir sin apuro y encontrar algo que se sienta propio.</p>
            </div>
          </div>
          <div className="locations-grid">
            <article className="location-card" data-testid="card-location-la-paz">
              <span className="location-index">001</span>
              <strong className="location-city">La Paz</strong>
              <span className="location-meta">Zona Sur<br />Av. Montenegro 1190<br />Lun — Sáb / 10:00 — 20:00</span>
            </article>
            <article className="location-card" data-testid="card-location-santa-cruz">
              <span className="location-index">002</span>
              <strong className="location-city">Santa Cruz</strong>
              <span className="location-meta">Equipetrol<br />Calle 9 Oeste<br />Lun — Sáb / 10:00 — 20:00</span>
            </article>
            <article className="location-card" data-testid="card-location-cochabamba">
              <span className="location-index">003</span>
              <strong className="location-city">Cochabamba</strong>
              <span className="location-meta">Queru Queru<br />Av. Melchor Urquidi<br />Lun — Sáb / 10:00 — 20:00</span>
            </article>
          </div>
        </section>

        <section className="section" id="tienda">
          <div className="section-header">
            <span className="section-number">02 — SELECCIÓN</span>
            <div>
              <h2 className="section-title">Una tienda <span className="quiet">sin ruido.</span></h2>
              <p className="section-intro">Líneas limpias, materiales honestos y piezas que encuentran su lugar en tu día. Explora nuestras categorías.</p>
            </div>
          </div>
          <div className="storefront">
            <aside className="storefront-aside">
              <p>Selección actual<br />/ 04 categorías</p>
              <button className="button-outline" data-testid="button-explore-store" onClick={() => scrollToSection('regalos')} style={{ marginTop: 28 }}>
                Ver selección <ChevronRight size={14} />
              </button>
            </aside>
            <div className="collection-grid">
              <article className="collection-card" data-testid="card-collection-vestir">
                <span className="collection-label">01 / Para vestir</span>
                <h3 className="collection-name">Vestir<br />despacio.</h3>
              </article>
              <article className="collection-card" data-testid="card-collection-habitar">
                <span className="collection-label">02 / Para habitar</span>
                <h3 className="collection-name">Tu espacio,<br />tu ritmo.</h3>
              </article>
              <article className="collection-card" data-testid="card-collection-regalar">
                <span className="collection-label">03 / Para regalar</span>
                <h3 className="collection-name">Algo para<br />recordar.</h3>
              </article>
              <article className="collection-card" data-testid="card-collection-diario">
                <span className="collection-label">04 / Para el día</span>
                <h3 className="collection-name">Lo esencial<br />también importa.</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="regalos">
          <div className="gift-banner">
            <p>🎁 Regalos que dicen algo.</p>
            <span>Ver opciones para compartir <ArrowUpRight size={14} /></span>
          </div>
        </section>

        <section className="section" id="promociones">
          <div className="section-header">
            <span className="section-number">03 — MOMENTO</span>
            <div>
              <h2 className="section-title">Lo que está <span className="quiet">pasando.</span></h2>
              <p className="section-intro">Novedades, encuentros y pequeñas razones para volver. Sin temporadas: solo cosas que nos entusiasman ahora.</p>
            </div>
          </div>
          <div className="split-section">
            <p className="manifesto">Este mes, <span>elige quedarte</span> con lo que sí.</p>
            <div className="text-stack">
              <p>Una selección especial de piezas para regalar —o regalarte— durante este mes. Disponible en nuestras tiendas de La Paz, Santa Cruz y Cochabamba.</p>
              <button className="button-solid" data-testid="button-see-promotions" onClick={() => scrollToSection('tienda')}>Explorar la selección <ArrowUpRight size={14} /></button>
            </div>
          </div>
        </section>

        <section className="section" id="quienes-somos">
          <div className="section-header">
            <span className="section-number">04 — ORIGEN</span>
            <div>
              <h2 className="section-title">Somos <span className="quiet">Mazeta.</span></h2>
              <p className="section-intro">Una marca boliviana para quienes encuentran belleza en las cosas bien hechas.</p>
            </div>
          </div>
          <div className="split-section">
            <p className="manifesto">Menos, pero <span>mejor pensado.</span></p>
            <div className="text-stack">
              <p>Mazeta nace de una mirada: lo cotidiano puede ser extraordinario cuando está hecho con cuidado. Reunimos diseño, textura y utilidad en una selección que habla bajito, pero permanece.</p>
              <p>Nos inspira Bolivia —sus formas, su movimiento y su gente—. Estamos aquí para hacer espacio a lo que importa.</p>
            </div>
          </div>
        </section>

        <section className="section" id="redes">
          <div className="section-header">
            <span className="section-number">05 — EN LÍNEA</span>
            <div>
              <h2 className="section-title">Sigue la <span className="quiet">señal.</span></h2>
              <p className="section-intro">Ideas, novedades y escenas del día a día. Encuéntranos donde pasan las cosas.</p>
            </div>
          </div>
          <div className="social-grid">
            <a className="social-link" data-testid="link-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <span><Instagram size={23} strokeWidth={1.4} /></span><strong>Instagram</strong><small>@mazetabolivia</small>
            </a>
            <a className="social-link" data-testid="link-facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <span><MessageCircle size={23} strokeWidth={1.4} /></span><strong>Facebook</strong><small>/mazetabolivia</small>
            </a>
            <a className="social-link" data-testid="link-tiktok" href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              <span>◌</span><strong>TikTok</strong><small>@mazetabolivia</small>
            </a>
          </div>
        </section>

        <section className="section" id="buzon">
          <div className="section-header">
            <span className="section-number">06 — CONVERSACIÓN</span>
            <div>
              <h2 className="section-title">Te <span className="quiet">escuchamos.</span></h2>
              <p className="section-intro">Una idea, una pregunta o algo que quieras ver en Mazeta. Este buzón está abierto.</p>
            </div>
          </div>
          <div className="feedback-grid">
            <div className="form-block">
              <h3>Buzón de sugerencias</h3>
              <form className="form" onSubmit={handleSuggestion}>
                <label className="form-label">Tu nombre<input className="form-input" data-testid="input-suggestion-name" name="name" required /></label>
                <label className="form-label">Tu mensaje<textarea className="form-textarea" data-testid="input-suggestion-message" name="message" required /></label>
                <button className="button-solid" data-testid="button-submit-suggestion" type="submit">Enviar sugerencia <ArrowUpRight size={14} /></button>
                {suggestionSent && <span className="form-message" data-testid="status-suggestion">Gracias por escribirnos. Lo vamos a leer con atención.</span>}
              </form>
            </div>
            <div className="form-block" id="inscribete">
              <h3>Quédate cerca</h3>
              <form className="form" onSubmit={handleNewsletter}>
                <label className="form-label">Tu correo electrónico<input className="form-input" data-testid="input-newsletter-email" name="email" required type="email" /></label>
                <p className="section-intro" style={{ margin: 0 }}>Novedades puntuales. Nada de ruido. Solo lo que vale la pena saber.</p>
                <button className="button-solid" data-testid="button-submit-newsletter" type="submit">Inscribirme <ArrowUpRight size={14} /></button>
                {newsletterSent && <span className="form-message" data-testid="status-newsletter">Listo. Te esperamos por aquí.</span>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>MAZETA BOLIVIA — HECHO EN BOLIVIA</p>
        <p>© 2025 / Todos los derechos reservados</p>
      </footer>

      <nav className="bottom-nav" aria-label="Navegación rápida">
        {bottomNavigation.map((item) => (
          <button
            className={`bottom-link ${activeSection === item.id ? 'is-active' : ''}`}
            data-testid={`link-bottom-${item.id}`}
            key={item.id}
            onClick={() => goTo(item.id)}
          >
            <NavIcon id={item.id} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;