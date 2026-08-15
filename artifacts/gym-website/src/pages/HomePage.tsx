import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Link } from 'wouter';
import { ciudades } from '@/data/branches';
import { assetUrl } from '@/lib/asset-url';

export default function HomePage() {
  const totalTiendas = ciudades.reduce((total, ciudad) => total + ciudad.sucursales.length, 0);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ── HERO PRINCIPAL ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden border-b border-white/10 bg-black">
        {/* Video promocional como fondo de portada */}
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
           poster={assetUrl('/hero-promocion-poster.webp')}
          aria-hidden="true"
           src={assetUrl('/hero-promocion.mp4')}
        />
        {/* Transparencia para que el contenido siga siendo legible */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(220,38,38,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgba(220,38,38,0.08),transparent_45%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/65 to-transparent" />

        <div className="relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col justify-between px-6 pb-9 pt-10 md:px-16 md:pb-14 md:pt-16">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/75 md:text-xs">
            <span className="h-px w-10 bg-primary shadow-[0_0_10px_rgba(220,38,38,0.9)]" />
             <span>Santa Cruz de la Sierra · Bolivia</span>
          </div>

          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-4 font-heading text-xs font-black uppercase tracking-[0.34em] text-primary drop-shadow-[0_0_12px_rgba(220,38,38,0.75)] md:text-sm"
            >
              Bodybuilding Training Center
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="max-w-4xl font-heading text-[clamp(2.7rem,9vw,7.8rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
            >
              Tu mejor versión
              <span className="mt-2 block text-primary drop-shadow-[0_0_22px_rgba(220,38,38,0.45)]">se entrena.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-lg"
            >
               REPRESENTANTES OFICIALES DE SUPLEMENTOS AMERICANOS
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.6 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/suplementos"
                className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 font-heading text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_0_22px_rgba(220,38,38,0.35)] transition-all hover:bg-red-500 hover:shadow-[0_0_32px_rgba(220,38,38,0.58)]"
              >
                Ver productos
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sucursales"
                className="inline-flex items-center justify-center gap-3 border border-white/45 bg-black/35 px-7 py-4 font-heading text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-black"
              >
                Nuestras tiendas
                <span className="text-primary">→</span>
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-5 border-t border-white/20 pt-5">
            <div className="grid grid-cols-3 gap-4 md:flex md:gap-10">
              <div>
                <p className="font-heading text-xl font-black text-white md:text-3xl">30+</p>
                <p className="mt-1 max-w-[92px] text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-white/55 md:max-w-none md:text-[10px] md:tracking-[0.18em]">Marcas americanas</p>
              </div>
              <div>
                <p className="font-heading text-xl font-black text-white md:text-3xl">500+</p>
                <p className="mt-1 max-w-[92px] text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-white/55 md:max-w-none md:text-[10px] md:tracking-[0.18em]">Productos disponibles</p>
              </div>
              <div>
                <p className="font-heading text-xl font-black text-white md:text-3xl">{totalTiendas}</p>
                <p className="mt-1 max-w-[92px] text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-white/55 md:max-w-none md:text-[10px] md:tracking-[0.18em]">Tiendas en Bolivia</p>
              </div>
            </div>
            <div className="hidden items-center gap-3 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 sm:flex">
              <span>Desliza para conocer Bolivia Fitness</span>
              <span className="h-8 w-px bg-primary" />
            </div>
          </div>
        </div>
      </section>
      {/* ¿Quiénes somos? */}
      <section id="quienes-somos" className="below-fold-section pt-10 md:pt-28">
        <div className="container mx-auto px-6 md:px-16 pb-4 md:pb-16">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-4 drop-shadow-[0_0_8px_var(--color-primary)]">
               Bolivia Fitness · Suplementos Americanos
            </p>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
              ¿QUIÉNES <span className="text-primary drop-shadow-[0_0_18px_var(--color-primary)]">SOMOS?</span>
            </h2>

            {/* Quiénes somos */}
            <div className="mb-6">
              <p className="text-white text-base md:text-lg leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)]">
                Somos una empresa boliviana especializada en la importación y venta de suplementos y productos americanos.
              </p>
            </div>

          </motion.div>

          {/* Foto de una tienda Bolivia Fitness */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="container mx-auto mt-8 px-6 md:mt-14 md:px-16"
          >
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-[0_0_32px_rgba(220,38,38,0.18)]">
              <img
                 src={assetUrl('/tarija-tienda.webp')}
                alt="Bolivia Fitness Tarija durante su inauguración"
                width={720}
                height={952}
                loading="lazy"
                decoding="async"
                className="block h-auto max-h-[680px] w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 md:px-16">

          {/* Arrow CTA → Sucursales */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12 md:mt-20"
          >
            <motion.div
              animate={{
                scale: [1, 1.12, 1, 1.08, 1],
              }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', repeatDelay: 0.6 }}
              style={{ display: 'inline-block', transformOrigin: 'center' }}
            >
            <Link
              href="/sucursales"
              className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-red-800 hover:border-red-600 rounded-full px-5 py-3 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
                <img
                   src={assetUrl('/logo-bf-small.webp')}
                  alt="Bolivia Fitness"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                Nuestras Tiendas
              </span>

              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
              >
                <ArrowRight size={20} className="text-primary" />
              </motion.div>
            </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>
      {/* ── PROMO DE LANZAMIENTO ─────────────────────────── */}
      <section id="promociones" className="below-fold-section pt-10 pb-20 md:pt-20 md:pb-36 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16">

          {/* Badge alerta */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/50 text-primary font-black text-xs tracking-[0.25em] uppercase px-4 py-2 rounded-full shadow-[0_0_18px_rgba(220,38,38,0.35)]">
               Promo de lanzamiento
            </span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <h2 className="font-heading font-black text-[clamp(2rem,7vw,4.5rem)] uppercase leading-[0.9] tracking-[-0.03em] text-white">
              LLÉVATE TU SUPLE<br />
              <span className="text-primary drop-shadow-[0_0_22px_rgba(220,38,38,0.5)]">Y ELIGE TU ACCESORIO</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm md:text-base mb-10 max-w-lg leading-relaxed"
          >
             Compra tu suplemento favorito y <span className="text-white font-bold">elige uno de estos accesorios totalmente GRATIS</span>
          </motion.p>

          {/* Accesorios — carrusel horizontal en mobile, grid en desktop */}
          <div className="flex gap-3 md:grid md:grid-cols-5 overflow-x-auto pb-4 md:pb-0 md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { src: '/promos/crew-polera.webp', nombre: 'Polera Crew' },
              { src: '/promos/crew-shaker.webp', nombre: 'Shaker Crew' },
              { src: '/promos/crew-gorra.webp', nombre: 'Gorra Crew' },
              { src: '/promos/crew-croptop.webp', nombre: 'Crop Top Crew' },
              { src: '/promos/crew-medias.webp', nombre: 'Medias Crew' },
            ].map((item, i) => (
              <motion.div
                key={item.nombre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative shrink-0 w-[70vw] max-w-[200px] md:w-auto md:max-w-none snap-start rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group hover:border-primary/50 hover:shadow-[0_0_24px_rgba(220,38,38,0.3)] transition-all duration-300"
              >
                <img
                  src={item.src}
                  alt={item.nombre}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                {/* FREE badge */}
                <div className="absolute top-2.5 right-2.5 bg-primary text-black text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.6)]">
                  GRATIS
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center font-heading font-black text-sm uppercase tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {item.nombre}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
               href="https://wa.me/59175666702?text=Hola%2C%20quiero%20aprovechar%20la%20promo%20de%20lanzamiento.%20Suplemento%20%2B%20accesorio%20gratis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-heading text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(220,38,38,0.45)] transition-all hover:bg-red-500 hover:shadow-[0_0_36px_rgba(220,38,38,0.65)] rounded-xl"
            >
              <FaWhatsapp size={18} /> Quiero mi accesorio gratis
            </a>
            <p className="flex items-center text-white/35 text-xs self-center">
              * Válido hasta agotar stock · consulta condiciones
            </p>
          </motion.div>


        </div>
      </section>
      {/* ── SUPLEMENTOS — teaser ─────────────────────────── */}
      <section id="suplementos" className="below-fold-section pt-4 pb-24 md:pt-16 md:pb-40">
        <div className="container mx-auto px-6 md:px-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-14"
          >
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]">
              Bolivia Fitness · Tienda Oficial
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
              SUPLE<span className="text-primary drop-shadow-[0_0_18px_var(--color-primary)]">MENTOS</span>
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl">
              Suplementos americanos originales importados directamente de EE.UU. <span className="text-white font-semibold">Las mejores marcas</span>, con asesoría experta incluida.
            </p>
          </motion.div>

          {/* Categorías — mini preview */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mb-6 md:mb-10">
            {[
               "Proteínas", "Pre-Entrenos", "Creatina", "Aminoácidos",
               "Quemadores", "Vitaminas", "Mass Gainers", "Accesorios",
             ].map((nombre, i) => (
              <motion.div
                 key={nombre}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
              >
                 <div className="mb-1 font-heading text-sm font-black tracking-[0.18em] text-primary">{String(i + 1).padStart(2, '0')}</div>
                 <p className="text-white/70 text-[10px] font-bold leading-tight">{nombre}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 via-black to-zinc-900 shadow-[0_0_40px_rgba(220,38,38,0.25)] p-7"
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col gap-4">
              <div>
                 <p className="text-primary text-[10px] font-black tracking-[0.35em] uppercase mb-2 drop-shadow-[0_0_6px_var(--color-primary)]">Bolivia Fitness · SUPLEMENTOS</p>
                <h3 className="text-white font-heading font-black text-2xl leading-tight">
                  Tu suplemento ideal,<br />
                  <span className="text-primary drop-shadow-[0_0_12px_var(--color-primary)]">a un paso del gym.</span>
                </h3>
                <p className="text-white/55 text-sm mt-2 leading-relaxed">
                  Disponible en todas nuestras tiendas Bolivia Fitness. Productos 100% originales importados de EE.UU.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {["Marcas internacionales y nacionales", "Asesoría experta gratuita", "Productos 100% originales"].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_6px_var(--color-primary)]" />
                    <span className="text-white/75 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/suplementos"
                className="inline-flex items-center justify-center gap-3 w-full bg-primary text-black font-black py-3.5 px-6 rounded-xl hover:bg-white transition-colors tracking-wider text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Ver tienda completa <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
