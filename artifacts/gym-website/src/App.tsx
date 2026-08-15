import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import IntroAnimation from '@/components/IntroAnimation';
import AudioPlayer from '@/components/AudioPlayer';
import MarqueeBanner from '@/components/MarqueeBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import HomePage from '@/pages/HomePage';

// ── Lazy-loaded pages (code-split per route) ──────────────────────────────
// Inner pages are loaded only when the user navigates to them. The home page
// stays eager so the first route is already mounted behind the intro.
const SucursalesPage     = lazy(() => import('@/pages/SucursalesPage'));
const SucursalDetailPage = lazy(() => import('@/pages/SucursalDetailPage'));
const PreciosPage        = lazy(() => import('@/pages/PreciosPage'));
const BuzonPage          = lazy(() => import('@/pages/BuzonPage'));
const RedesPage          = lazy(() => import('@/pages/RedesPage'));
const ZonaFitnessPage    = lazy(() => import('@/pages/ZonaFitnessPage'));
const RegalosPage        = lazy(() => import('@/pages/RegalosPage'));
const InscripcionPage    = lazy(() => import('@/pages/InscripcionPage'));
const NotFound           = lazy(() => import('@/pages/not-found'));

// Canonical origin — update to your production domain when deploying
const CANONICAL_ORIGIN = 'https://boliviafitness.com';

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────
const pageMeta: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': {
    title: 'Bolivia Fitness | Suplementos Americanos en Bolivia',
    description: 'Bolivia Fitness — suplementos y productos deportivos americanos importados directamente de EE.UU. Las mejores marcas al mejor precio en Bolivia.',
    keywords: 'suplementos Bolivia, proteína Santa Cruz, creatina Bolivia, suplementos americanos, Bolivia Fitness',
  },
  '/sucursales': {
    title: 'Tiendas Bolivia Fitness | Puntos de venta en Santa Cruz',
    description: 'Encuentra tu punto de venta Bolivia Fitness en Santa Cruz. Suplementos americanos disponibles en múltiples ubicaciones. Horarios y contacto.',
    keywords: 'tiendas Bolivia Fitness, suplementos Santa Cruz, dónde comprar suplementos Bolivia',
  },
  '/precios': {
    title: 'Precios Bolivia Fitness — Suplementos Americanos',
    description: 'Precios de suplementos y productos deportivos americanos en Bolivia Fitness. Proteínas, creatinas, aminoácidos y más. Compara y elige el mejor.',
    keywords: 'precios gym Bolivia, membresía gimnasio Santa Cruz, planes gym Bolivia',
  },
  '/inscripcion': {
    title: 'Contacto Bolivia Fitness — Pide tus Suplementos',
    description: 'Contáctanos por WhatsApp y pide tus suplementos americanos. Entrega rápida en Santa Cruz de la Sierra, Bolivia.',
    keywords: 'pedir suplementos Bolivia, comprar proteína Santa Cruz, Bolivia Fitness contacto',
  },
  '/suplementos': {
    title: 'Suplementos Deportivos Americanos | Bolivia Fitness',
    description: 'Proteínas, creatina, aminoácidos y suplementos deportivos americanos importados. Las mejores marcas de EE.UU. disponibles en Bolivia.',
    keywords: 'suplementos deportivos Bolivia, proteína Santa Cruz, creatina Bolivia, suplementos americanos',
  },
  '/regalos': {
    title: 'Regalos Gratis | Bolivia Fitness',
    description: 'Con cada compra en Bolivia Fitness llevás un regalo gratis. Poleras, shakers, gorras y más. ¡Aprovecha nuestras promociones!',
    keywords: 'regalo gratis suplementos Bolivia, promo Bolivia Fitness, shaker gratis Santa Cruz',
  },
  '/redes': {
    title: 'Redes Sociales Bolivia Fitness | Instagram y TikTok',
    description: 'Sigue a Bolivia Fitness en Instagram, TikTok y Facebook. Nuevos productos, promociones y novedades de suplementos americanos.',
    keywords: 'Bolivia Fitness instagram, Bolivia Fitness tiktok, redes sociales suplementos Bolivia',
  },
  '/buzon': {
    title: 'Buzón de Sugerencias | Bolivia Fitness',
    description: 'Comparte tu opinión y ayúdanos a mejorar tu experiencia en Bolivia Fitness. Tu feedback es importante para nosotros.',
  },
};

// ── SEO Manager: updates <head> on every route change ────────────────────
function SeoManager() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = pageMeta[location] ?? {
      title: 'Bolivia Fitness | Suplementos Americanos',
      description: 'Bolivia Fitness — Suplementos y productos deportivos americanos en Santa Cruz de la Sierra, Bolivia.',
    };

    // Title
    document.title = meta.title;

    // Helper: set or create a <meta> tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper: set or create a <link> tag
    const setLink = (rel: string, value: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = value;
    };

    const canonicalUrl = `${CANONICAL_ORIGIN}${location === '/' ? '/' : location}`;

    setMeta('meta[name="description"]',          'content', meta.description);
    setMeta('meta[property="og:title"]',         'content', meta.title);
    setMeta('meta[property="og:description"]',   'content', meta.description);
    setMeta('meta[property="og:url"]',           'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]',        'content', meta.title);
    setMeta('meta[name="twitter:description"]',  'content', meta.description);

    if (meta.keywords) {
      setMeta('meta[name="keywords"]', 'content', meta.keywords);
    }

    // Canonical link
    setLink('canonical', canonicalUrl);

    // Per-page JSON-LD breadcrumb (inner pages only)
    const existingLd = document.getElementById('page-jsonld');
    if (existingLd) existingLd.remove();

    if (location !== '/') {
      const breadcrumb = buildBreadcrumb(location);
      if (breadcrumb) {
        const script = document.createElement('script');
        script.id = 'page-jsonld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumb);
        document.head.appendChild(script);
      }
    }
  }, [location]);

  return null;
}

// ── Breadcrumb JSON-LD per route ─────────────────────────────────────────
function buildBreadcrumb(location: string) {
  const base = CANONICAL_ORIGIN;
  const crumbs: { name: string; href: string }[] = [{ name: 'Inicio', href: '/' }];

  if (location.startsWith('/sucursales/')) {
    const id = location.replace('/sucursales/', '');
    const names: Record<string, string> = {
      banzer: 'Banzer 24 Horas', melchor: 'Melchor Pinto 24 Horas',
      utepsa: 'UTEPSA', centro: 'Centro Bolivar',
      pirai: 'Piraí', radial17: 'Radial 17/2', satelite: 'Satélite Norte',
    };
    crumbs.push({ name: 'Sucursales', href: '/sucursales' });
    if (names[id]) crumbs.push({ name: `Bolivia Fitness — ${names[id]}`, href: location });
  } else {
    const labels: Record<string, string> = {
      '/sucursales': 'Sucursales', '/precios': 'Precios y Planes',
      '/inscripcion': 'Inscríbete',
      '/suplementos': 'Bolivia Fitness', '/redes': 'Redes Sociales', '/buzon': 'Buzón',
    };
    if (labels[location]) crumbs.push({ name: labels[location], href: location });
  }

  if (crumbs.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${base}${c.href}`,
    })),
  };
}

// ── Minimal loading fallback (invisible — just prevents layout shift) ─────
function PageFallback() {
  return <div className="min-h-screen bg-[#050505]" aria-hidden="true" />;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <Suspense fallback={<PageFallback />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/sucursales" component={SucursalesPage} />
          <Route path="/sucursales/:id" component={SucursalDetailPage} />
          <Route path="/precios" component={PreciosPage} />
          <Route path="/buzon" component={BuzonPage} />
          <Route path="/redes" component={RedesPage} />
          <Route path="/suplementos" component={ZonaFitnessPage} />
          <Route path="/regalos" component={RegalosPage} />
          <Route path="/inscripcion" component={InscripcionPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  const [navigationReady, setNavigationReady] = useState(() => {
    const noIntro = new URLSearchParams(window.location.search).has('no-intro');
    const introWasCompleted = sessionStorage.getItem('gym-intro-complete');
    return noIntro || Boolean(introWasCompleted);
  });

  useEffect(() => {
    const noIntro = new URLSearchParams(window.location.search).has('no-intro');
    let navigationTimer: number | undefined;

    const showNavigationAfterIntro = () => {
      navigationTimer = window.setTimeout(() => {
        setNavigationReady(true);
      }, 300);
    };

    if (noIntro || sessionStorage.getItem('gym-intro-complete')) {
      setNavigationReady(true);
    }
    window.addEventListener('gym:intro-complete', showNavigationAfterIntro);

    return () => {
      window.removeEventListener('gym:intro-complete', showNavigationAfterIntro);
      if (navigationTimer !== undefined) window.clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="bg-background min-h-[100dvh] text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
        <IntroAnimation />
        <MarqueeBanner />
        {navigationReady && <Navbar />}
        {/* pt = MarqueeBanner(2rem) + Navbar(3.5rem) = 5.5rem; pb-16 mobile = bottom bar */}
        <main className="pt-[5.5rem] pb-16 md:pb-0">
          <Router />
        </main>
        <Footer />
        {navigationReady && <MobileBottomBar />}
        <AudioPlayer />
      </div>
    </WouterRouter>
  );
}

export default App;
