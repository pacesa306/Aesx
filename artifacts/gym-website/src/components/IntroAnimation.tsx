import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Horizontal shooting star (passes 1 & 2) ── */
function ShootingStar({ direction = 'ltr', top, startDelay = 0.15 }: {
  direction?: 'ltr' | 'rtl'; top: string; startDelay?: number;
}) {
  const isLtr = direction === 'ltr';
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: 0, width: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.9, delay: startDelay, times: [0, 0.08, 0.55, 1] }}
    >
      <motion.div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        initial={{ x: isLtr ? '-5%' : '105%' }}
        animate={{ x: isLtr ? '105%' : '-5%' }}
        transition={{ duration: 0.75, delay: startDelay, ease: [0.2, 0.8, 0.6, 1] }}
      >
        {!isLtr && (
          <div style={{
            width: 180, height: 3, borderRadius: 4, flexShrink: 0,
            background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.8))',
            filter: 'blur(0.5px)',
          }} />
        )}
        <div style={{
          width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
          background: 'white',
          boxShadow: '0 0 6px 3px white, 0 0 16px 6px rgba(255,255,255,0.6)',
        }} />
        {isLtr && (
          <div style={{
            width: 180, height: 3, borderRadius: 4, flexShrink: 0,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8))',
            filter: 'blur(0.5px)',
          }} />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Collision star — flies from left or right toward screen center ── */
function CollisionStar({ fromLeft = true, startDelay = 0 }: {
  fromLeft?: boolean; startDelay?: number;
}) {
  const TRAIL = 360;
  const HEAD  = 13; // radius

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1] }}
      transition={{ duration: 0.45, delay: startDelay, times: [0, 0.06, 1] }}
    >
      {/* Anchored at screen center */}
      <motion.div
        style={{ position: 'absolute', top: 'calc(50% - 30px)', left: '50%' }}
        initial={{ x: fromLeft ? -1800 : 1800 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.45, delay: startDelay, ease: [0.4, 0, 0.6, 1] }}
      >
        {/* Head */}
        <div style={{
          position: 'absolute',
          width: HEAD * 2, height: HEAD * 2, borderRadius: '50%',
          top: -HEAD, left: -HEAD,
          background: 'white',
          boxShadow: `0 0 10px ${HEAD}px white, 0 0 30px ${HEAD * 2}px rgba(255,255,255,0.8), 0 0 70px ${HEAD * 4}px rgba(255,255,255,0.4)`,
        }} />
        {/* Trail — behind the head relative to travel direction */}
        <div style={{
          position: 'absolute',
          width: TRAIL, height: 5, borderRadius: 5, top: -2.5,
          ...(fromLeft
            ? {
                left: -(TRAIL + HEAD),
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.95))',
              }
            : {
                left: HEAD,
                background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.95))',
              }),
          filter: 'blur(1px)',
        }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Explosion flash ── */
function ExplosionFlash({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ background: 'white' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.05, 0.25, 1], ease: 'easeOut' }}
      onAnimationComplete={() => setTimeout(onDone, 1000)}
    />
  );
}

/* ── Main intro ── */
export default function IntroAnimation() {
  const [show, setShow]   = useState(false);
  const [flash, setFlash] = useState(false);

  const finishIntro = () => {
    sessionStorage.setItem('gym-intro-complete', 'true');
    window.dispatchEvent(new Event('gym:intro-complete'));
    setShow(false);
  };

  useEffect(() => {
    // Permite revisar páginas profundas sin esperar la intro en previews automatizados.
    if (new URLSearchParams(window.location.search).has('no-intro')) return;

    const hasShown = sessionStorage.getItem('gym-intro-shown');
    if (!hasShown) {
      setShow(true);
      sessionStorage.setItem('gym-intro-shown', 'true');

      // Pass1 ends ~1.0s, Pass2 ends ~2.0s, Collision at 2.1 + 0.45 = 2.55s
      const flashTimer = setTimeout(() => setFlash(true), 2550);
      return () => clearTimeout(flashTimer);
    }
    return () => {};
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Pass 1 */}
          <ShootingStar direction="ltr" top="calc(50% - 110px)" startDelay={0.1} />
          <ShootingStar direction="rtl" top="calc(50% + 45px)" startDelay={0.1} />
          {/* Pass 2 — reversed, starts after pass 1 finishes */}
          <ShootingStar direction="rtl" top="calc(50% - 110px)" startDelay={1.1} />
          <ShootingStar direction="ltr" top="calc(50% + 45px)" startDelay={1.1} />
          {/* Collision */}
          <CollisionStar fromLeft={true}  startDelay={2.1} />
          <CollisionStar fromLeft={false} startDelay={2.1} />

          {/* Flash on collision */}
           {flash && <ExplosionFlash onDone={finishIntro} />}

          {/* Logo */}
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="flex items-center gap-3 font-heading font-black text-3xl md:text-5xl uppercase"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: 60 }} animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                  className="block text-white tracking-[0.18em]"
                >BOLIVIA</motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: 60 }} animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  className="block gold-gradient-text"
                >FITNESS</motion.span>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-400 text-xs tracking-[0.3em] uppercase text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              MISIÓN · VISIÓN · DISCIPLINA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
