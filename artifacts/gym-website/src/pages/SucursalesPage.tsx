import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronDown, Navigation, Building2, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'wouter';
import { ciudades } from '@/data/branches';
import { assetUrl } from '@/lib/asset-url';

const CIUDAD_META: Record<string, { color: string; glow: string }> = {
  'santa-cruz':  { color: 'from-emerald-900/40 to-black', glow: 'rgba(16,185,129,0.15)' },
  'cochabamba':  { color: 'from-pink-900/40 to-black',    glow: 'rgba(236,72,153,0.15)' },
  'la-paz':      { color: 'from-blue-900/40 to-black',    glow: 'rgba(59,130,246,0.15)' },
  'el-alto':     { color: 'from-sky-900/40 to-black',     glow: 'rgba(14,165,233,0.15)' },
  'oruro':       { color: 'from-purple-900/40 to-black',  glow: 'rgba(168,85,247,0.15)' },
  'sucre':       { color: 'from-amber-900/40 to-black',   glow: 'rgba(245,158,11,0.15)' },
  'tarija':      { color: 'from-violet-900/40 to-black',  glow: 'rgba(139,92,246,0.15)' },
};

export default function SucursalesPage() {
  const [openCiudad, setOpenCiudad] = useState<string | null>(null);

  const totalTiendas = ciudades.reduce((acc, c) => acc + c.sucursales.length, 0);

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-24 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.18),transparent_60%)]" />
        <div className="relative container mx-auto px-6 md:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-heading font-bold text-xs tracking-[0.35em] uppercase mb-4 drop-shadow-[0_0_8px_var(--color-primary)]"
          >
            Bolivia Fitness · Red Nacional
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-[clamp(2.4rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white mb-5"
          >
            NUESTRAS <span className="text-primary drop-shadow-[0_0_22px_rgba(220,38,38,0.5)]">TIENDAS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Más de {totalTiendas} tiendas en toda Bolivia
          </motion.p>

          {/* Dept pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {ciudades.map(c => {
              const meta = CIUDAD_META[c.id];
              const isOpen = openCiudad === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setOpenCiudad(isOpen ? null : c.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                    isOpen
                      ? 'bg-primary border-primary text-white shadow-[0_0_14px_rgba(220,38,38,0.45)]'
                      : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white/80'
                  }`}
                >
                  {c.nombre} · {c.sucursales.length}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── ACORDEÓN POR DEPARTAMENTO ──────────────────────── */}
      <section className="pb-28 md:pb-40">
        <div className="container mx-auto px-4 md:px-16 max-w-[1120px] flex flex-col gap-5">
          {ciudades.map((ciudad, ci) => {
            const isOpen = openCiudad === ciudad.id;
            const meta = CIUDAD_META[ciudad.id];

            return (
              <motion.div
                key={ciudad.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.06 }}
                className={`rounded-2xl border border-primary/35 overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.12),inset_0_0_18px_rgba(220,38,38,0.035)] ${
                  isOpen
                    ? 'border-primary/75 shadow-[0_0_34px_rgba(220,38,38,0.28),0_0_72px_rgba(220,38,38,0.08),inset_0_0_24px_rgba(220,38,38,0.06)]'
                    : 'hover:border-primary/65 hover:shadow-[0_0_28px_rgba(220,38,38,0.22),inset_0_0_22px_rgba(220,38,38,0.05)]'
                }`}
              >
                {/* ── CABECERA DEPARTAMENTO ── */}
                <button
                  onClick={() => setOpenCiudad(isOpen ? null : ciudad.id)}
                  className={`w-full relative overflow-hidden bg-gradient-to-r ${meta?.color ?? 'from-zinc-900 to-black'} hover:brightness-110 transition-all duration-200`}
                >
                  {/* Glow fondo */}
                  {isOpen && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 20% 50%, ${meta?.glow ?? 'transparent'}, transparent 70%)` }}
                    />
                  )}

                  <div className="relative flex items-center justify-between gap-4 px-5 py-6 md:px-7 md:py-7">
                    <div className="flex items-center gap-4">
                      {/* Emoji badge */}
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl shrink-0 border transition-all duration-300 ${
                        isOpen ? 'bg-primary/15 border-primary/55 shadow-[0_0_18px_rgba(220,38,38,0.28)]' : 'bg-white/5 border-primary/25'
                      }`}>
                        <MapPin size={16} className="text-primary" />
                      </div>

                      <div className="text-left">
                        <p className="font-heading font-black text-lg md:text-2xl uppercase tracking-wide text-white leading-none mb-1">
                          {ciudad.nombre}
                        </p>
                        <div className="flex items-center gap-2">
                          <Building2 size={11} className="text-white/40 shrink-0" />
                          <p className="text-white/85 text-sm md:text-base font-semibold tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.18)]">
                            {ciudad.sucursales.length} {ciudad.sucursales.length === 1 ? 'tienda' : 'tiendas'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Branch count badge */}
                        <span className={`hidden sm:flex items-center justify-center w-11 h-11 rounded-full font-heading font-black text-base transition-all duration-300 ${
                        isOpen
                            ? 'bg-primary text-black shadow-[0_0_18px_rgba(255,30,30,0.78)]'
                            : 'bg-primary/15 border border-primary/35 text-primary shadow-[0_0_12px_rgba(220,38,38,0.24)]'
                      }`}>
                        {ciudad.sucursales.length}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className={`transition-colors ${isOpen ? 'text-primary' : 'text-white/30'}`}
                      >
                        <ChevronDown size={22} />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* ── SUCURSALES ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden bg-black/50"
                    >
                      <div className="grid sm:grid-cols-2 gap-4 p-5 md:p-6">
                        {ciudad.sucursales.map((s, si) => (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: si * 0.07, ease: [0.4, 0, 0.2, 1] }}
                            className="relative pt-3"
                          >
                            {/* Badge TIENDAS */}
                            <span className="absolute top-0 left-3 z-10 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-[3px] rounded-full shadow-[0_0_10px_rgba(220,38,38,0.9),0_0_22px_rgba(220,38,38,0.5)] border border-red-400/40 select-none">
                              TIENDAS
                            </span>
                            <Link
                              href={`/sucursales/${s.id}`}
                              className="block rounded-xl border border-primary/30 bg-zinc-900/70 overflow-hidden group shadow-[0_0_16px_rgba(220,38,38,0.1)] hover:border-primary/75 hover:shadow-[0_0_28px_rgba(220,38,38,0.25),0_0_48px_rgba(220,38,38,0.08)] transition-all duration-300 cursor-pointer"
                            >
                              {/* Imagen sucursal */}
                              <div className="relative h-44 md:h-48 bg-zinc-900 overflow-hidden">
                                {s.imagen ? (
                                  <img
                                    src={assetUrl(s.imagen)}
                                    alt={s.nombre}
                                    width={720}
                                    height={980}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                                    <img
                                      src={assetUrl('/logo-bf-small.webp')}
                                      alt="Bolivia Fitness"
                                      width={64}
                                      height={64}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-16 h-16 object-contain opacity-20 group-hover:opacity-30 transition-opacity"
                                    />
                                  </div>
                                )}
                                {/* Gradiente inferior */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                                {/* Nombre encima */}
                                <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between">
                                  <span className="font-heading font-black text-xs uppercase tracking-widest text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                                    {s.nombre}
                                  </span>
                                  <span className="text-white/40 group-hover:text-primary transition-colors">
                                    <ChevronRight size={14} />
                                  </span>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="p-4 flex flex-col gap-2">
                                <div className="flex items-start gap-2.5">
                                  <MapPin size={13} className="text-primary shrink-0 mt-0.5 drop-shadow-[0_0_4px_var(--color-primary)]" />
                                  <p className="text-white/65 text-xs leading-snug">{s.direccion}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <Clock size={13} className="text-white/30 shrink-0" />
                                  <p className="text-white/40 text-xs leading-snug">{s.horario}</p>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-white/6">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Ver detalle</span>
                                  <ChevronRight size={10} className="text-primary/50" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
