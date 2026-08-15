import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { branches } from '@/data/branches';

type Tipo = 'queja' | 'recomendacion';

export default function BuzonPage() {
  const [tipo, setTipo] = useState<Tipo>('queja');
  const [sucursal, setSucursal] = useState('');
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const inputCls =
    'w-full bg-[#111] border border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.15)] rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/70 focus:shadow-[0_0_16px_rgba(255,255,255,0.35)] transition-all';

  const handleEnviar = () => {
    const tipoLabel = tipo === 'queja' ? 'QUEJA' : 'RECOMENDACIÓN';
    const sucursalLabel = sucursal || 'General / Todas las sucursales';
    const lines = [
      `*${tipoLabel} — Bolivia Fitness*`,
      ``,
      `Sucursal: ${sucursalLabel}`,
      nombre ? `Nombre: ${nombre}` : null,
      contacto ? `Contacto: ${contacto}` : null,
      ``,
      `Mensaje:`,
      mensaje,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/59175666702?text=${encodeURIComponent(lines)}`;
    window.location.href = url;
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-16 max-w-xl md:max-w-2xl">

          {/* Tagline superior */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-14 text-center"
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.25em] font-bold mb-2">Bolivia Fitness</p>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white leading-snug">
              Déjanos tu sugerencia para seguir<br />
              <span className="text-primary">mejorando cada día</span>
            </h2>
            <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-sm mx-auto">
              Tu opinión es el motor de nuestro crecimiento. Cada mensaje que recibimos es leído y tomado en cuenta por nuestro equipo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d0d0d] border border-white/70 shadow-[0_0_28px_rgba(255,255,255,0.45)] rounded-2xl p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-2xl font-heading font-black text-white leading-tight mb-2">
                Buzón de Sugerencias
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cuéntanos qué sucedió o qué te gustaría ver en{' '}
                <span className="text-primary font-semibold">Bolivia Fitness</span>.
              </p>
            </div>

            {/* Tipo toggle */}
            <div className="grid grid-cols-2 gap-3">
              {(['queja', 'recomendacion'] as Tipo[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`py-3 px-2 rounded-lg font-heading font-black uppercase tracking-normal transition-all duration-200 w-full text-center leading-tight
                    ${tipo === t
                      ? 'bg-primary text-black shadow-[0_0_16px_rgba(220,38,38,0.6)] text-[11px]'
                      : 'bg-transparent border border-white/30 text-white/70 hover:border-white/60 text-[11px]'}`}
                >
                  {t === 'queja' ? 'Queja' : 'Reco­mendación'}
                </button>
              ))}
            </div>

            {/* Sucursal */}
            <div className="flex flex-col gap-1">
              <label htmlFor="sucursal" className="text-white/50 text-xs uppercase tracking-widest font-bold">Sucursal (Opcional)</label>
              <select
                id="sucursal"
                value={sucursal}
                onChange={e => setSucursal(e.target.value)}
                className={inputCls + ' appearance-none cursor-pointer'}
              >
                <option value="">General / Todas las sucursales</option>
                {branches.map(b => (
                  <option key={b.id} value={b.nombre}>{b.nombre}</option>
                ))}
              </select>
            </div>

            {/* Nombre */}
            <div className="flex flex-col gap-1">
              <label htmlFor="nombre" className="text-white/50 text-xs uppercase tracking-widest font-bold">Nombre (Opcional)</label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-1">
              <label htmlFor="contacto" className="text-white/50 text-xs uppercase tracking-widest font-bold">Contacto (Opcional)</label>
              <input
                id="contacto"
                type="text"
                placeholder="Teléfono o correo"
                value={contacto}
                onChange={e => setContacto(e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-1">
              <label htmlFor="mensaje" className="text-white/50 text-xs uppercase tracking-widest font-bold">Mensaje</label>
              <textarea
                id="mensaje"
                rows={5}
                placeholder="Cuéntanos los detalles..."
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                className={inputCls + ' resize-none'}
              />
            </div>

            {/* Enviar */}
            <button
              onClick={handleEnviar}
              disabled={!mensaje.trim()}
              className="w-full flex items-center justify-center gap-3 bg-primary text-black font-heading font-black tracking-widest uppercase py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_14px_rgba(220,38,38,0.5)] text-sm"
            >
              <FaWhatsapp size={18} />
              {enviado ? '¡Enviado por WhatsApp!' : 'ENVIAR POR WHATSAPP'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
