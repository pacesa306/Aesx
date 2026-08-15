import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { ciudades } from '@/data/branches';

const REDES_BF = [
  {
    plataforma: 'Instagram',
    handle: '@boliviafitness_oficial',
    url: 'https://www.instagram.com/boliviafitness_oficial',
    color: 'from-pink-600 to-purple-600',
    icon: FaInstagram,
    desc: 'Productos, promos y novedades',
  },
  {
    plataforma: 'TikTok',
    handle: '@boliviafitness',
    url: 'https://www.tiktok.com/@boliviafitness',
    color: 'from-zinc-800 to-zinc-900',
    icon: FaTiktok,
    desc: 'Videos, rutinas y unboxings',
  },
  {
    plataforma: 'Facebook',
    handle: 'Bolivia Fitness',
    url: 'https://www.facebook.com/boliviafitness',
    color: 'from-blue-700 to-blue-900',
    icon: FaFacebook,
    desc: 'Comunidad y eventos',
  },
  {
    plataforma: 'WhatsApp',
    handle: '+591 75666702',
    url: 'https://wa.me/59175666702',
    color: 'from-green-700 to-green-900',
    icon: FaWhatsapp,
    desc: 'Pedidos y consultas directas',
  },
];

export default function RedesPage() {
  const totalSucursales = ciudades.reduce((acc, c) => acc + c.sucursales.length, 0);

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-28 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.14),transparent_60%)]" />
        <div className="relative container mx-auto px-6 md:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-heading font-bold text-xs tracking-[0.35em] uppercase mb-4 drop-shadow-[0_0_8px_var(--color-primary)]"
          >
            Bolivia Fitness · Comunidad
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-heading font-black text-[clamp(2.2rem,8vw,5rem)] uppercase leading-[0.92] tracking-[-0.03em] text-white mb-4"
          >
            REDES <span className="text-primary drop-shadow-[0_0_22px_rgba(220,38,38,0.5)]">SOCIALES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-base max-w-md mx-auto leading-relaxed"
          >
            Seguinos para conocer productos, promociones y novedades de nuestras {totalSucursales} tiendas en Bolivia.
          </motion.p>
        </div>
      </section>

      {/* ── REDES PRINCIPALES ─────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-16 max-w-2xl">
          <div className="flex flex-col gap-3">
            {REDES_BF.map((red, i) => {
              const Icon = red.icon;
              return (
                <motion.a
                  key={red.plataforma}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-4 hover:border-white/25 hover:bg-zinc-900 active:scale-[0.985] transition-all duration-200 group"
                >
                  {/* Icono */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${red.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-black text-sm leading-tight">{red.plataforma}</p>
                    <p className="text-primary text-xs font-bold mt-0.5 truncate">{red.handle}</p>
                    <p className="text-white/35 text-[11px] mt-0.5 leading-snug">{red.desc}</p>
                  </div>

                  {/* Arrow */}
                  <svg className="shrink-0 text-white/20 group-hover:text-white/50 transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP ──────────────────────────── */}
      <section className="pb-24 md:pb-36">
        <div className="container mx-auto px-6 md:px-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-black to-zinc-900 p-7 text-center shadow-[0_0_40px_rgba(220,38,38,0.15)]"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <p className="text-primary text-[10px] font-black tracking-[0.35em] uppercase mb-3 drop-shadow-[0_0_6px_var(--color-primary)]">
              Contacto directo
            </p>
            <h3 className="font-heading font-black text-2xl text-white mb-2">
              ¿Querés hacer un pedido?
            </h3>
            <p className="text-white/50 text-sm mb-6">
              Escribinos por WhatsApp y recibís atención personalizada.
            </p>
            <a
              href="https://wa.me/59175666702"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1aad52] text-black font-black py-3.5 px-7 rounded-xl tracking-wider text-sm transition-all active:scale-[0.97] shadow-[0_4px_20px_rgba(37,211,102,0.35)]"
            >
              <FaWhatsapp size={18} /> Escribir por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
