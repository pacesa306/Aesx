import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 30,   suffix: '+', prefix: '',  label: 'Marcas americanas',   detail: 'importadas directamente de EE.UU.' },
  { value: 500,  suffix: '+', prefix: '',  label: 'Productos',           detail: 'disponibles en tienda' },
  { value: 5,    suffix: '+', prefix: '',  label: 'Años de experiencia', detail: 'en el mercado boliviano' },
  { value: 5000, suffix: '+', prefix: '',  label: 'Clientes satisfechos',detail: 'en toda Bolivia' },
];

function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
  active,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return (
    <span>
      {prefix}{count >= 1000 ? count.toLocaleString('es-BO') : count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      {/* Red glow line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-primary font-heading font-bold text-xs tracking-[0.2em] uppercase mb-10 drop-shadow-[0_0_8px_var(--color-primary)]"
        >
          Bolivia Fitness · En números
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col items-center text-center gap-1"
            >
              {/* Number */}
              <span
                className="font-heading font-black text-5xl md:text-6xl leading-none text-white"
                style={{ textShadow: '0 0 40px rgba(220,38,38,0.35)' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} active={inView} />
              </span>

              {/* Label */}
              <p className="text-white font-bold uppercase tracking-wider text-sm mt-2">
                {stat.label}
              </p>

              {/* Detail */}
              <p className="text-white/35 text-xs leading-snug max-w-[120px]">
                {stat.detail}
              </p>

              {/* Divider (not on last) */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Red glow line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </section>
  );
}
