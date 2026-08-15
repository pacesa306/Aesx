import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Check, X, ShoppingBag, Star } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Link } from 'wouter';
import { assetUrl } from '@/lib/asset-url';

const REGALOS = [
  {
    img: '/promos/crew-polera.webp',
    nombre: 'Polera Crew',
    detalle: 'Bolivia Fitness CREW — Edición limitada',
    valor: 'Bs 80',
    badge: 'Edición Limitada',
  },
  {
    img: '/promos/crew-shaker.webp',
    nombre: 'Shaker Crew',
    detalle: 'Bolivia Fitness CREW — Rojo o Negro',
    valor: 'Bs 45',
    badge: 'Nuevo',
  },
  {
    img: '/promos/crew-gorra.webp',
    nombre: 'Gorra Crew',
    detalle: 'Bolivia Fitness CREW — Snapback negra',
    valor: 'Bs 55',
    badge: 'Nuevo',
  },
  {
    img: '/promos/crew-croptop.webp',
    nombre: 'Crop Top Crew',
    detalle: 'Bolivia Fitness CREW — Edición femenina',
    valor: 'Bs 70',
    badge: 'Nuevo',
  },
  {
    img: '/promos/crew-medias.webp',
    nombre: 'Medias Crew',
    detalle: 'Bolivia Fitness CREW — Par negro',
    valor: 'Bs 25',
    badge: 'Nuevo',
  },
];

export default function RegalosPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const handleReclamar = () => {
    if (selected === null) return;
    const regalo = REGALOS[selected].nombre;
    const msg = `Hola. Quiero reclamar mi regalo por compra.\n\nProducto: (compra en tienda)\nRegalo elegido: ${regalo}`;
    window.open(`https://wa.me/59175666702?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/96 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 text-white hover:text-primary transition-colors" onClick={() => setLightbox(null)}>
              <X size={30} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              src={assetUrl(REGALOS[lightbox].img)}
              alt={REGALOS[lightbox].nombre}
              className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold tracking-wider">
              {REGALOS[lightbox].nombre}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-6 md:pt-24 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative container mx-auto px-6 md:px-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/40 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase text-primary shadow-[0_0_12px_rgba(220,38,38,0.2)]">
              <Gift size={12} /> Regalo Gratis
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase text-white/70">
              <ShoppingBag size={12} /> Con cada compra
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]">
              Bolivia Fitness
            </p>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-[0.9] mb-2">
              REGALO
            </h1>
            <h1 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] mb-5">
              <span className="text-primary drop-shadow-[0_0_24px_rgba(220,38,38,0.8)]">GRATIS</span>
            </h1>
            <p className="text-white/65 text-base leading-relaxed max-w-xl mb-6">
              Lleva cualquier producto de la tienda Bolivia Fitness y escoge uno de estos regalos gratis.
              Válido en las <span className="text-white font-bold">16 sucursales</span>.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="grid grid-cols-3 gap-3 mb-8 max-w-sm">
            {[
              { valor: '5', label: 'Regalos disponibles' },
              { valor: '16', label: 'Sucursales' },
              { valor: '100%', label: 'Gratis' },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center">
                <p className="text-primary font-heading font-black text-2xl drop-shadow-[0_0_10px_var(--color-primary)]">{s.valor}</p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────── */}
      <section className="pb-6 md:pb-16">
        <div className="container mx-auto px-6 md:px-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7 mb-10 md:mb-16 max-w-2xl">
            <h3 className="text-white font-heading font-black text-base tracking-widest uppercase mb-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
              ¿Cómo reclamar tu regalo?
            </h3>
            <ol className="flex flex-col gap-4">
              {[
                { n: '1', titulo: 'Compra un producto en Bolivia Fitness', desc: 'Cualquier suplemento, ropa o accesorio en cualquier sucursal Bolivia Fitness.' },
                { n: '2', titulo: 'Elige tu regalo gratis', desc: 'Selecciona uno de los 5 regalos disponibles de esta página.' },
                { n: '3', titulo: 'Recíbelo en recepción', desc: 'Muestra tu compra y menciona el plan "Regalo Gratis" al momento del pago.' },
              ].map(step => (
                <li key={step.n} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.5)] font-heading font-black text-black text-sm">{step.n}</div>
                  <div>
                    <p className="text-white font-bold text-sm leading-snug">{step.titulo}</p>
                    <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* ── ELIGE TU REGALO ───────────────────────────────── */}
      <section className="pb-16 md:pb-28">
        <div className="container mx-auto px-6 md:px-16">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 md:mb-12">
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]">
              Bolivia Fitness · Regalos Disponibles
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-none">
              ELIGE TU <span className="text-primary drop-shadow-[0_0_18px_var(--color-primary)]">REGALO</span>
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-lg">
              Toca el regalo que más te guste para seleccionarlo.
            </p>
          </motion.div>

          {/* Grid regalos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
            {REGALOS.map((r, i) => (
              <motion.div
                key={r.nombre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col"
              >
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  className={`relative w-full flex flex-col text-left rounded-2xl border overflow-hidden transition-all duration-250 active:scale-[0.98] group ${
                    selected === i
                      ? 'border-primary shadow-[0_0_28px_rgba(220,38,38,0.5)] bg-primary/10'
                      : 'border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
                  }`}
                >
                  {/* Check badge */}
                  {selected === i && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                    >
                      <Check size={14} className="text-black" />
                    </motion.div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`flex items-center gap-1 font-black text-[9px] tracking-widest uppercase px-2 py-1 rounded-full ${
                      r.badge === 'Edición Limitada' ? 'bg-amber-400 text-black' :
                      r.badge === 'Exclusiva' ? 'bg-blue-500 text-white' :
                      'bg-white/15 text-white/70'
                    }`}>
                      <Star size={7} /> {r.badge}
                    </span>
                  </div>

                  {/* Imagen */}
                  <div
                    className="w-full bg-black overflow-hidden cursor-zoom-in"
                    onClick={e => { e.stopPropagation(); setLightbox(i); }}
                  >
                    <img
                      src={assetUrl(r.img)}
                      alt={r.nombre}
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 flex-1">
                    <p className={`font-heading font-black text-sm leading-tight mb-1 transition-colors ${selected === i ? 'text-primary' : 'text-white'}`}>
                      {r.nombre}
                    </p>
                    <p className="text-white/40 text-[11px] leading-snug mb-2">{r.detalle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest line-through">{r.valor}</span>
                      <span className="text-primary font-black text-xs tracking-widest">GRATIS</span>
                    </div>
                  </div>
                </button>

              </motion.div>
            ))}
          </div>

          {/* Panel de selección + CTA */}
          <div className="sticky bottom-4 z-30 mt-6 md:mt-10 max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl border p-4 md:p-5 shadow-[0_8px_40px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 ${
                selected !== null
                  ? 'border-primary/50 bg-black/90'
                  : 'border-white/10 bg-black/80'
              }`}
            >
              {/* Tu selección */}
              <div className="flex items-center gap-3 mb-3">
                {selected !== null ? (
                  <>
                    <img src={assetUrl(REGALOS[selected].img)} alt={REGALOS[selected].nombre} width={44} height={44} decoding="async" className="w-11 h-11 object-contain rounded-xl bg-zinc-900 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-0.5">Tu regalo elegido</p>
                      <p className="text-primary font-black text-sm leading-tight truncate">{REGALOS[selected].nombre}</p>
                      <p className="text-white/40 text-[11px] leading-snug truncate">{REGALOS[selected].detalle}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors shrink-0 p-1">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center shrink-0">
                      <Gift size={18} className="text-white/20" />
                    </div>
                    <p className="text-white/35 text-sm">Tocá un regalo para seleccionarlo</p>
                  </div>
                )}
              </div>

              {/* Botón reclamar */}
              <button
                onClick={handleReclamar}
                disabled={selected === null}
                className={`w-full flex items-center justify-center gap-3 font-black py-3.5 px-6 rounded-xl tracking-wider text-sm transition-all active:scale-[0.98] ${
                  selected !== null
                    ? 'bg-primary hover:bg-red-600 text-black shadow-[0_4px_24px_rgba(220,38,38,0.5)]'
                    : 'bg-white/8 text-white/25 cursor-not-allowed'
                }`}
              >
                <FaWhatsapp size={18} /> Reclamar mi regalo por WhatsApp
              </button>

              {selected === null && (
                <p className="text-white/20 text-[10px] text-center mt-2 leading-relaxed">
                  Sujeto a disponibilidad · Válido con compra en Bolivia Fitness
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA TIENDA ────────────────────────────────────── */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 via-black to-zinc-900 shadow-[0_0_40px_rgba(220,38,38,0.2)] p-7 md:p-10"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-primary text-[10px] font-black tracking-[0.35em] uppercase mb-2 drop-shadow-[0_0_6px_var(--color-primary)]">
                  Bolivia Fitness · Tienda Oficial
                </p>
                <h3 className="text-white font-heading font-black text-2xl md:text-3xl leading-tight mb-2">
                  ¿Todavía no has visto<br />
                  <span className="text-primary drop-shadow-[0_0_12px_var(--color-primary)]">nuestros productos?</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  Explora la tienda completa: suplementos, ropa y accesorios. Con cada compra, ¡llevas un regalo!
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
                <Link
                  href="/suplementos"
                  className="inline-flex items-center justify-center gap-3 w-full bg-primary text-black font-black py-4 px-6 rounded-xl hover:bg-white transition-colors tracking-wider text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <ShoppingBag size={18} /> Ver tienda completa
                </Link>
                <a
                  href="https://wa.me/59175666702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full border border-white/25 text-white font-bold py-4 px-6 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all tracking-wider text-sm"
                >
                  <FaWhatsapp size={18} className="text-[#25D366]" /> Consultar por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
