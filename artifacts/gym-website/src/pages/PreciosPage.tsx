import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock3, MapPin, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { ciudades } from '@/data/branches';

const CIUDAD_CODIGOS: Record<string, string> = {
  'santa-cruz': 'SC',
  'cochabamba': 'CB',
  'la-paz': 'LP',
  'el-alto': 'EA',
  'oruro': 'OR',
  'sucre': 'SU',
  'tarija': 'TJ',
};

const PLANES_GENERALES = [
  { nombre: 'Mensual', precio: '150', desc: 'Acceso completo 1 mes', highlight: false },
  { nombre: 'Trimestral', precio: '390', desc: '3 meses · ahorra 10%', highlight: true },
  { nombre: 'Semestral', precio: '720', desc: '6 meses · ahorra 20%', highlight: false },
  { nombre: 'Anual', precio: '1,200', desc: '12 meses · mejor precio', highlight: false },
];

export default function PreciosPage() {
  const totalTiendas = ciudades.reduce((acc, c) => acc + c.sucursales.length, 0);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 py-14 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.16),transparent_60%)]" />
        <div className="container mx-auto px-6 md:px-16">
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.7)]">
              Bolivia Fitness · Membresías
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 font-heading text-4xl font-black uppercase leading-none text-white md:text-6xl"
            >
              PLANES DE <span className="text-primary drop-shadow-[0_0_22px_rgba(220,38,38,0.5)]">MEMBRESÍA</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-sm leading-relaxed text-white/60 md:text-lg"
            >
              Disponibles en las {totalTiendas} tiendas Bolivia Fitness a nivel nacional.
              Escríbenos por WhatsApp para confirmar precios en tu ciudad.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              {[
                { icon: MapPin, title: `${totalTiendas} tiendas`, text: '7 ciudades en Bolivia' },
                { icon: Clock3, title: 'Horarios flexibles', text: 'Entrena a tu ritmo' },
                { icon: Check, title: 'Sin contratos', text: 'Cancela cuando quieras' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3">
                  <Icon size={17} className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-white">{title}</p>
                    <p className="mt-0.5 text-[11px] text-white/45">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANES ─────────────────────────────────────── */}
      <section className="py-14 md:py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-heading font-bold text-xs tracking-[0.35em] uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]"
          >
            Precios referenciales · consulta en tu tienda
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-2xl md:text-3xl text-white uppercase mb-8"
          >
            Elige tu plan
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            {PLANES_GENERALES.map((plan, i) => (
              <motion.div
                key={plan.nombre}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative flex flex-col gap-1.5 rounded-xl p-5 border transition-all duration-200 bg-[#111]
                  ${plan.highlight
                    ? 'border-primary shadow-[0_0_28px_rgba(220,38,38,0.6)]'
                    : 'border-white/10 hover:border-primary/40 hover:shadow-[0_0_18px_rgba(220,38,38,0.2)]'
                  }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black tracking-wider px-3 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                    MÁS POPULAR
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">{plan.nombre}</p>
                <p className="font-heading font-black text-3xl leading-none text-white">
                  {plan.precio} <span className="text-base font-bold text-white/60">Bs.</span>
                </p>
                <p className="text-white/50 text-xs leading-snug mt-1">{plan.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA global */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href="https://wa.me/59175666702"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-primary text-black font-heading font-black py-4 px-6 rounded-xl hover:bg-white transition-colors tracking-widest text-sm shadow-[0_0_24px_rgba(220,38,38,0.45)] uppercase mb-20"
          >
            <FaWhatsapp size={20} /> Consultar por WhatsApp
          </motion.a>

          {/* ── TIENDAS POR CIUDAD ─────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-heading font-bold text-xs tracking-[0.35em] uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]"
          >
            Encuentra tu tienda
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-2xl md:text-3xl text-white uppercase mb-8"
          >
            Nuestras tiendas
          </motion.h3>

          <div className="flex flex-col gap-8">
            {ciudades.map((ciudad, ci) => (
              <motion.div
                key={ciudad.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-heading text-sm font-black tracking-[0.18em] text-primary">{CIUDAD_CODIGOS[ciudad.id]}</span>
                  <h4 className="font-heading font-black text-base uppercase tracking-widest text-white">{ciudad.nombre}</h4>
                  <span className="text-white/30 text-xs ml-1">({ciudad.sucursales.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ciudad.sucursales.map((s, si) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.06 }}
                      className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-heading font-bold text-sm text-white">{s.nombre}</p>
                        <p className="text-white/45 text-xs mt-1 flex items-start gap-1.5">
                          <MapPin size={11} className="text-primary shrink-0 mt-0.5" />
                          {s.direccion}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={s.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-white text-[11px] font-bold uppercase tracking-wider"
                        >
                          <Navigation size={11} /> Ubicación
                        </a>
                        <a
                          href={`https://wa.me/${s.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all text-[#25D366] text-[11px] font-bold uppercase tracking-wider"
                        >
                          <FaWhatsapp size={12} /> WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {ci < ciudades.length - 1 && (
                  <div className="mt-8 border-t border-white/8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
