/**
 * AudioPlayer — singleton de audio para todo el sitio.
 *
 * El audio intenta arrancar al montar la aplicación para que los navegadores
 * que permiten autoplay comiencen inmediatamente. Cuando el navegador aplica
 * su política de autoplay, el primer click/touch/tecla dispara el mismo
 * intento sin dejar el audio bloqueado.
 */

import { useEffect } from 'react';

// ─── Ruta del archivo ─────────────────────────────────────────────────────
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const AUDIO_SRC = `${BASE}/music/background.mp3`;

// ─── Singleton creado al parsear el módulo ────────────────────────────────
const audio = new Audio(AUDIO_SRC);
// Do not compete with the first paint; play() still loads it when autoplay is
// allowed or when the user makes the first interaction.
audio.preload = 'none';
audio.volume = 0.18;
audio.loop   = true;

audio.addEventListener('canplay',        () => console.log('[AudioPlayer] Listo para reproducirse.'));
audio.addEventListener('canplaythrough', () => console.log('[AudioPlayer] Buffer completo.'));
audio.addEventListener('playing',        () => console.log('[AudioPlayer] Reproduciendo.'));
audio.addEventListener('error', () => {
  const codes: Record<number, string> = {
    1: 'MEDIA_ERR_ABORTED',
    2: 'MEDIA_ERR_NETWORK',
    3: 'MEDIA_ERR_DECODE',
    4: 'MEDIA_ERR_SRC_NOT_SUPPORTED (posible 404 o ruta incorrecta)',
  };
  const code = audio.error?.code ?? 0;
  console.error(`[AudioPlayer] ❌ ${codes[code] ?? 'Error desconocido'} — src: ${AUDIO_SRC}`);
});

console.log('[AudioPlayer] Audio listo. Esperando primera interacción…');

// ─── Estado ───────────────────────────────────────────────────────────────
let isPlaying        = false;
let listenersAttached = false;

// ─── Reproducción ─────────────────────────────────────────────────────────
function tryPlay(): void {
  if (isPlaying) return;
  audio.play()
    .then(() => {
      isPlaying = true;
      console.log('[AudioPlayer] Música iniciada.');
    })
    .catch((err: Error) => {
      console.warn('[AudioPlayer] Bloqueado por el navegador, reintentando en la próxima interacción.', err.message);
      attachListeners();
    });
}

// ─── Listeners ────────────────────────────────────────────────────────────
const EVENTS = ['click', 'touchstart', 'keydown'] as const;

function onInteraction(): void {
  detachListeners();
  tryPlay();
}

function attachListeners(): void {
  if (listenersAttached) return;
  listenersAttached = true;
  EVENTS.forEach(ev => document.addEventListener(ev, onInteraction));
}

function detachListeners(): void {
  if (!listenersAttached) return;
  listenersAttached = false;
  EVENTS.forEach(ev => document.removeEventListener(ev, onInteraction));
}

// ─── Componente React (sin DOM) ───────────────────────────────────────────
export default function AudioPlayer(): null {
  useEffect(() => {
    if (!isPlaying) {
      tryPlay();
      attachListeners();
    }
  }, []);
  return null;
}
