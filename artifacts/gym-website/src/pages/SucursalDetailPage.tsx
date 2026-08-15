import React, { useRef, useState } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Phone, Navigation, ChevronLeft, ChevronRight,
  ShoppingBag, Check, Gift, Star,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { ciudades } from '@/data/branches';
import { assetUrl } from '@/lib/asset-url';
import { PRODUCTOS_DESTACADOS, type ProductoDestacado } from '@/data/productos-destacados';

/* ── helpers ─────────────────────────────────────────────────── */
function mapsEmbedUrl(url: string, query?: string): string {
  try {
    const u = new URL(url);
    const q = query ?? u.searchParams.get('q') ?? '';
    if (!q) return '';
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed&hl=es&z=16`;
  } catch { return ''; }
}

const CATS = ['Todos', 'Proteína', 'Creatina', 'Aminoácidos', 'Quema Grasa', 'Ganador de Masa', 'Ropa', 'Accesorio'];

/* ── mini product card ───────────────────────────────────────── */
function ProductCard({ p, onAdd }: { p: ProductoDestacado; onAdd: (p: ProductoDestacado) => void }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    setTimeout(() => onAdd(p), 480);
  };

  return (
    <div className="flex flex-col rounded-xl border border-white/8 bg-zinc-900/70 overflow-hidden group hover:border-white/18 transition-colors duration-200">
      {/* Imagen */}
      <div className="relative bg-zinc-900 overflow-hidden" style={{ aspectRatio: '1' }}>
        <img
          src={assetUrl(p.img)}
          alt={p.nombre}
                  width={320}
                  height={320}
          loading="lazy"
                  decoding="async"
          className="w-full h-full object-contain p-3 transition-transform duration-400 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).src = assetUrl('/logo-bf.webp'); }}
        />
        {p.badge && (
          <span className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
            p.badge === 'Más vendido' ? 'bg-primary text-black' : 'bg-white/15 text-white/80'
          }`}>
            {p.badge === 'Más vendido' ? <span className="flex items-center gap-0.5"><Star size={7} className="inline" /> TOP</span> : 'NUEVO'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex-1">
          <p className="text-white font-bold text-xs leading-snug line-clamp-2">{p.nombre}</p>
          <p className="text-white/35 text-[10px] mt-0.5 leading-snug">{p.detalle}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-heading font-black text-sm text-primary drop-shadow-[0_0_6px_var(--color-primary)]">
            {p.precio}
          </span>
        </div>
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-[0.97] ${
            added
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-primary/15 border border-primary/30 text-primary hover:bg-primary hover:text-black'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                <Check size={11} /> Elegir regalo
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                <ShoppingBag size={11} /> Añadir
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────── */
export default function SucursalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [catActiva, setCatActiva] = useState('Todos');
  const [fotoActiva, setFotoActiva] = useState(0);
  const galeriaRef = useRef<HTMLDivElement>(null);

  // Find branch + parent city
  let branch = null;
  let ciudad = null;
  for (const c of ciudades) {
    const found = c.sucursales.find(s => s.id === id);
    if (found) { branch = found; ciudad = c; break; }
  }

  const productosFiltrados = catActiva === 'Todos'
    ? PRODUCTOS_DESTACADOS
    : PRODUCTOS_DESTACADOS.filter(p => p.categoria === catActiva);

  const handleAdd = (_p: ProductoDestacado) => {
    navigate('/regalos');
  };

  if (!branch || !ciudad) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-white/40 text-sm uppercase tracking-widest">Sucursal no encontrada</p>
        <Link href="/sucursales" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-bold tracking-wider uppercase">
          <ArrowLeft size={15} /> Volver a tiendas
        </Link>
      </div>
    );
  }

  const imagenes = branch.imagenes?.length
    ? branch.imagenes
    : branch.imagen
      ? [branch.imagen]
      : [];
  const embedUrl = mapsEmbedUrl(branch.mapsUrl, branch.mapsQuery);
  const cambiarFoto = (index: number) => {
    const siguiente = (index + imagenes.length) % imagenes.length;
    const carrusel = galeriaRef.current;
    if (carrusel) {
      carrusel.scrollTo({ left: siguiente * carrusel.clientWidth, behavior: 'smooth' });
    }
    setFotoActiva(siguiente);
  };

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ── BREADCRUMB ─────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-5 md:px-10 pt-6 pb-0">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <Link href="/sucursales" className="hover:text-white transition-colors">Tiendas</Link>
          <ChevronRight size={10} className="text-white/20" />
          <span className="text-white/55">{ciudad.nombre}</span>
          <ChevronRight size={10} className="text-white/20" />
          <span className="text-primary">{branch.nombre}</span>
        </div>
      </motion.div>

      {/* ── GALERÍA DE LA TIENDA ───────────────────── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="relative mt-4 mx-auto max-w-2xl px-4 md:px-10">
        <div
          className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
          style={{ height: 'clamp(280px, 65vw, 520px)' }}
        >
          <div
            ref={galeriaRef}
            onScroll={event => {
              const width = event.currentTarget.clientWidth;
              if (width) setFotoActiva(Math.round(event.currentTarget.scrollLeft / width));
            }}
            className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-hide"
            aria-label={`Fotos de ${branch.nombre}`}
          >
            {imagenes.length > 0 ? imagenes.map((imagen, index) => (
              <div key={imagen} className="relative min-w-full h-full snap-center shrink-0 flex items-center justify-center bg-zinc-950 px-1">
                <img
                  src={assetUrl(imagen)}
                  alt={`${branch.nombre}, foto ${index + 1}`}
                  width={720}
                  height={980}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block w-full h-full object-contain"
                  draggable={false}
                  onError={event => { (event.currentTarget as HTMLImageElement).src = assetUrl('/logo-bf.webp'); }}
                />
              </div>
            )) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <img src={assetUrl('/logo-bf-small.webp')} alt="Bolivia Fitness" width={96} height={96} loading="lazy" decoding="async" className="w-24 h-24 object-contain opacity-15" />
              </div>
            )}
          </div>
          {imagenes.length > 1 && (
            <>
              <button
                onClick={() => cambiarFoto(fotoActiva - 1)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <ChevronLeft size={21} />
              </button>
              <button
                onClick={() => cambiarFoto(fotoActiva + 1)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <ChevronRight size={21} />
              </button>
              <div className="absolute top-3 right-3 rounded-full bg-black/65 border border-white/15 px-3 py-1 text-[10px] font-black tracking-widest text-white">
                {fotoActiva + 1} / {imagenes.length}
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {imagenes.map((imagen, index) => (
                  <button
                    key={imagen}
                    onClick={() => cambiarFoto(index)}
                    aria-label={`Ver foto ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${index === fotoActiva ? 'w-7 bg-primary shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'w-1.5 bg-white/55 hover:bg-white'}`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-primary" />
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{ciudad.nombre}</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-3xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {branch.nombre}
            </h1>
          </div>
        </div>
        {imagenes.length > 1 && (
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.22em] text-white/35">
            Desliza para ver todas las fotos
          </p>
        )}
      </motion.div>

      {/* ── INFO + MAPA ────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-4 md:px-10 mt-4 flex flex-col gap-4">

        {/* Mapa */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]" style={{ height: 190 }}>
          {embedUrl ? (
            <iframe src={embedUrl} width="100%" height="190" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title={`Mapa ${branch.nombre}`}
              className="grayscale-[55%] brightness-75 hover:grayscale-0 hover:brightness-90 transition-all duration-500" />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <p className="text-white/30 text-xs">Mapa no disponible</p>
            </div>
          )}
        </motion.div>

        {/* Info card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/60 divide-y divide-white/8">
          <div className="flex items-start gap-3.5 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={15} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-0.5">Dirección</p>
              <p className="text-white/80 text-sm leading-snug">{branch.direccion}</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={15} className="text-white/40" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-0.5">Horario</p>
              <p className="text-white/70 text-sm leading-snug">{branch.horario}</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Phone size={15} className="text-[#25D366]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-0.5">Contacto</p>
              <p className="text-white/70 text-sm">+{branch.whatsapp}</p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3">
          <a href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa visitar su tienda en ${branch.nombre}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1aad52] text-black font-black py-3.5 rounded-xl tracking-wider text-sm transition-all active:scale-[0.97] shadow-[0_4px_20px_rgba(37,211,102,0.3)]">
            <FaWhatsapp size={17} /> WhatsApp
          </a>
          <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/35 text-white font-black py-3.5 rounded-xl tracking-wider text-sm transition-all active:scale-[0.97]">
            <Navigation size={15} /> Ver en Maps
          </a>
        </motion.div>

      </div>

      {/* ══ MINI TIENDA ════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-2xl px-4 md:px-10 mt-8 pb-28">

        {/* Header tienda */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary text-[10px] font-black tracking-[0.35em] uppercase mb-1 drop-shadow-[0_0_6px_var(--color-primary)]">
              Bolivia Fitness · Tienda
            </p>
            <h2 className="font-heading font-black text-xl text-white uppercase leading-none">
              PRODUCTOS <span className="text-primary">DISPONIBLES</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-white/25 uppercase tracking-widest">
            <Gift size={12} className="text-primary/60" />
            <span>+Regalo gratis</span>
          </div>
        </motion.div>

        {/* Aviso regalo */}
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 mb-5">
          <Gift size={16} className="text-primary shrink-0 drop-shadow-[0_0_8px_var(--color-primary)]" />
          <p className="text-white/75 text-xs leading-snug">
            <span className="text-primary font-black">Añadí cualquier producto</span> y elegí tu regalo gratis — polera, shaker, gorra o más.
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setCatActiva(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all duration-200 ${
                catActiva === cat
                  ? 'bg-primary border-primary text-black shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                  : 'border-white/12 text-white/45 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid productos */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {productosFiltrados.map((p, i) => (
              <motion.div
                key={`${p.nombre}-${p.detalle}`}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <ProductCard p={p} onAdd={handleAdd} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Ver tienda completa */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-6 text-center">
          <Link href="/suplementos"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
            <ShoppingBag size={12} /> Ver tienda completa <ChevronRight size={11} />
          </Link>
        </motion.div>

        {/* Volver */}
        <div className="mt-6 pt-4 border-t border-white/6">
          <Link href="/sucursales"
            className="inline-flex items-center gap-2 text-white/25 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
            <ArrowLeft size={13} /> Volver a tiendas
          </Link>
        </div>
      </section>
    </div>
  );
}
