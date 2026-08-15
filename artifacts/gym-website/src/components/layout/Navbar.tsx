import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { prefetch } from '@/lib/prefetch';
import { assetUrl } from '@/lib/asset-url';

type NavItem =
  | { label: string; kind: 'page'; href: string }
  | { label: string; kind: 'section'; sectionId: string };

const navLinks: NavItem[] = [
  { label: "Inicio",               kind: 'page',    href: '/'              },
  { label: "Sucursales",           kind: 'page',    href: '/sucursales'    },
  { label: "Tienda",               kind: 'page',    href: '/suplementos'   },
  { label: "Regalos",              kind: 'page',    href: '/regalos'       },
  { label: "Promociones",          kind: 'section', sectionId: 'promociones'   },
  { label: "¿Quiénes somos?",     kind: 'section', sectionId: 'quienes-somos' },
  { label: "Redes Sociales",       kind: 'page',    href: '/redes'             },
  { label: "Buzón de Sugerencias", kind: 'page',    href: '/buzon'             },
];

const desktopPrimaryLinks: NavItem[] = navLinks.filter((item) =>
  ['Inicio', 'Sucursales', 'Tienda', 'Regalos', 'Promociones'].includes(item.label),
);

const desktopMoreLinks = navLinks.filter((item) =>
  ['¿Quiénes somos?', 'Redes Sociales', 'Buzón de Sugerencias'].includes(item.label),
);

// Sección pendiente de scroll después de navegar a /
let pendingSectionId: string | null = null;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  // Cuando la ruta cambia a '/', ejecuta el scroll pendiente
  useEffect(() => {
    if (location === '/' && pendingSectionId) {
      const id = pendingSectionId;
      pendingSectionId = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }, [location]);

  const goToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    if (location === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      pendingSectionId = sectionId;
      navigate('/');
    }
  };

  const isActive = (item: NavItem) => {
    if (item.kind === 'page') return location === item.href;
    return false;
  };

  /* ── DESKTOP TOPBAR LINK ── */
  const renderTopbarLink = (item: NavItem, i: number) => {
    const active = isActive(item);
    const base =
      'relative flex items-center justify-center px-2 py-1 text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 ' +
      (active
        ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]'
        : 'text-white/90 hover:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.55)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]');

    const inner = (
      <>
        <span className="relative">{item.label}</span>
        {/* active underline */}
        {active && (
          <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(220,38,38,0.7)]" />
        )}
        {/* hover underline */}
        {!active && (
          <motion.span
            className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary/50 rounded-full"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </>
    );

    const vibrateProps = item.label === 'Sucursales' ? {
      animate: { rotate: [0, -25, 25, -20, 20, -12, 12, -5, 5, 0], scale: [1, 0.5, 0.5, 0.65, 0.65, 0.8, 0.8, 1, 1, 1] },
      transition: { repeat: Infinity, duration: 0.45, ease: 'easeInOut' as const, repeatDelay: 0.25 },
    } : {};

    if (item.kind === 'section') {
      return (
        <motion.button
          key={i}
          onClick={() => goToSection(item.sectionId)}
          className={base + ' border-none bg-transparent cursor-pointer'}
          {...vibrateProps}
        >
          {inner}
        </motion.button>
      );
    }
    return (
      <motion.div key={i} className="flex items-stretch shrink-0" {...vibrateProps}>
        <Link href={item.href} className={base} onMouseEnter={() => prefetch(item.href)}>
          {inner}
        </Link>
      </motion.div>
    );
  };

  const renderMoreLink = (item: NavItem) => {
    if (item.kind === 'section') {
      return (
        <button
          key={item.label}
          onClick={() => goToSection(item.sectionId)}
          className="block w-full px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {item.label}
        </button>
      );
    }
    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => setMoreMenuOpen(false)}
        onMouseEnter={() => prefetch(item.href)}
        className="block px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        {item.label}
      </Link>
    );
  };

  /* ── MOBILE LINK ── */
  const renderMobileLink = (item: NavItem, i: number) => {
    const active = isActive(item);
    const pillClass =
      'relative w-full flex items-center justify-center overflow-hidden ' +
      'py-2.5 px-3 rounded-xl font-heading font-black tracking-wide uppercase text-[11px] ' +
      'cursor-pointer transition-all duration-200 active:scale-[0.97] text-white';

    const pillBg = (
      <>
        <span className="absolute inset-0 rounded-xl bg-black" />
      </>
    );

    // Resalta ¿ y ? con rojo brillante + vibración
    const renderLabel = (text: string) => {
      return text.split(/(¿|\?)/).map((chunk, idx) =>
        chunk === '¿' || chunk === '?' ? (
          <motion.span
            key={idx}
            style={{ color: '#ef4444', filter: 'drop-shadow(0 0 6px #ef4444)', display: 'inline-block' }}
            animate={{ rotate: [0, -25, 25, -20, 20, -12, 12, -5, 5, 0], scale: [1, 1.5, 1.5, 1.35, 1.35, 1.2, 1.2, 1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut', repeatDelay: 0.25 }}
          >
            {chunk}
          </motion.span>
        ) : (
          <span key={idx}>{chunk}</span>
        )
      );
    };

    const inner = (
      <>
        {pillBg}
        <span
          className="relative z-10 text-white"
          style={{ WebkitTextStroke: '0.4px #7f1d1d' }}
        >
          {renderLabel(item.label)}
        </span>
      </>
    );

    if (item.kind === 'section') {
      return (
        <motion.button
          key={i}
          onClick={() => goToSection(item.sectionId)}
          className={pillClass + ' border-none bg-transparent'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03, ease: 'easeOut' }}
        >
          {inner}
        </motion.button>
      );
    }
    return (
      <motion.div
        key={i}
        className="w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.03, ease: 'easeOut' }}
      >
        <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className={pillClass + ' block text-center'}>
          {inner}
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      {/* ── DESKTOP TOPBAR ─────────────────────────────── */}
      {/* top-8 = debajo del MarqueeBanner (h-8) */}
      <header className="hidden md:flex fixed top-8 left-0 right-0 z-50 h-14 items-stretch bg-black/95 border-b border-white/8 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 font-heading font-black tracking-[0.18em] uppercase shrink-0 border-r border-white/8"
        >
          <img src={assetUrl('/logo-bf-small.webp')} alt="Bolivia Fitness" width={32} height={32} loading="eager" fetchPriority="high" className="w-8 h-8 object-contain" decoding="async" />
          <span className="text-white text-base leading-tight">BOLIVIA</span>
          <span className="gold-gradient-text text-base leading-tight">FITNESS</span>
        </Link>

        {/* Nav links — horizontal row, fill remaining width */}
        <nav className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {desktopPrimaryLinks.map((item, i) => renderTopbarLink(item, i))}
        </nav>
        <div className="relative flex shrink-0 items-center border-l border-white/10">
          <button
            type="button"
            onClick={() => setMoreMenuOpen((open) => !open)}
            aria-expanded={moreMenuOpen}
            className="flex h-full items-center gap-1 px-4 text-[11px] font-bold uppercase tracking-wider text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            Más
            <ChevronDown size={14} className={`transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {moreMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 top-full z-50 min-w-56 overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
              >
                {desktopMoreLinks.map(renderMoreLink)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link
          href="/inscripcion"
          className="flex shrink-0 items-center bg-primary px-5 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-red-500"
          onMouseEnter={() => prefetch('/inscripcion')}
        >
          Inscríbete
        </Link>
      </header>

      {/* ── MOBILE TOPBAR ───────────────────────────────── */}
      {/* top-8 = debajo del MarqueeBanner (h-8) */}
      <div className="md:hidden fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-5 h-14 bg-black/90 backdrop-blur-md border-b border-white/8">
        <Link href="/" className="flex items-center gap-2 font-heading font-black tracking-[0.2em] uppercase text-xl">
          <img src={assetUrl('/logo-bf-small.webp')} alt="Bolivia Fitness" width={30} height={30} loading="eager" fetchPriority="high" className="w-[30px] h-[30px] object-contain" decoding="async" />
          <span className="text-white">BOLIVIA</span>
          <span className="gold-gradient-text">FITNESS</span>
        </Link>
        <motion.button
          className="flex items-center justify-center w-11 h-11 rounded-full"
          style={{ color: '#ef4444', filter: 'drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #dc2626)' }}
          animate={{ rotate: [0, -18, 18, -14, 14, -8, 8, -3, 3, 0], scale: [1, 1.15, 1.15, 1.1, 1.1, 1.05, 1.05, 1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 0.55, ease: 'easeInOut', repeatDelay: 0.3 }}
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Abrir/cerrar menú"
        >
          <Menu size={28} />
        </motion.button>
      </div>

      {/* ── MOBILE DROPDOWN MENU ─────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop — click fuera cierra */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ top: '5.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel compacto */}
            <motion.div
              className="fixed left-0 right-0 z-50 md:hidden border-b border-red-900/60 shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
              style={{ top: '5.5rem', background: '#0a0a0a' }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >

              {/* Grid de links */}
              <div className="px-4 py-3 grid grid-cols-2 gap-2">
                {navLinks.map((item, i) => renderMobileLink(item, i))}
              </div>

              {/* CTA */}
              <div className="px-4 pb-3">
                <Link
                  href="/inscripcion"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="block w-full text-center bg-black text-white font-heading font-black tracking-widest uppercase py-3 px-6 rounded-sm text-sm border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:bg-white hover:text-black transition-colors"
                  >
                    INSCRÍBETE AHORA
                  </motion.span>
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
