import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Send, User, Phone, MapPin, Dumbbell } from 'lucide-react';
import { ciudades } from '@/data/branches';

type Step = 'form' | 'success';

const fieldClass =
  'w-full bg-[#111] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/40 transition-all duration-200 appearance-none';

const PLANES = [
  { nombre: 'Mensual', precio: '150' },
  { nombre: 'Trimestral', precio: '390' },
  { nombre: 'Semestral', precio: '720' },
  { nombre: 'Anual', precio: '1.200' },
];

// Flat list of all branches for the select
const todasLasSucursales = ciudades.flatMap(c =>
  c.sucursales.map(s => ({ ...s, ciudad: c.nombre }))
);

export default function InscripcionPage() {
  const [step, setStep] = useState<Step>('form');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sucursalId, setSucursalId] = useState('');
  const [planNombre, setPlanNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedBranch = todasLasSucursales.find(b => b.id === sucursalId);
  const selectedPlan = PLANES.find(p => p.nombre === planNombre);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = 'Ingresa tu nombre completo';
    if (!telefono.trim()) e.telefono = 'Ingresa tu número de teléfono';
    if (!sucursalId) e.sucursal = 'Selecciona una sucursal';
    if (!planNombre) e.plan = 'Selecciona un plan';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsapp = selectedBranch?.whatsapp ?? '59175666702';

    const lines = [
      `Hola. Quiero inscribirme en Bolivia Fitness.`,
      ``,
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Sucursal: ${selectedBranch?.nombre ?? sucursalId} (${selectedBranch?.ciudad ?? ''})`,
      `Plan: ${planNombre}${selectedPlan ? ` — ${selectedPlan.precio} Bs.` : ''}`,
      mensaje.trim() ? `Mensaje: ${mensaje.trim()}` : '',
      ``,
      `¿Pueden darme más información? Gracias.`,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className="text-primary font-heading font-bold text-xs tracking-[0.35em] uppercase mb-2 drop-shadow-[0_0_8px_var(--color-primary)]">
            Bolivia Fitness · Únete
          </p>
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-white">
            INSCRIPCIÓN
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Completa el formulario y te contactamos por WhatsApp
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Nombre */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  <User size={13} /> Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); setErrors(ev => ({ ...ev, nombre: '' })); }}
                  className={fieldClass}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-0.5">{errors.nombre}</p>}
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  <Phone size={13} /> Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="Ej: 70000000"
                  value={telefono}
                  onChange={e => { setTelefono(e.target.value); setErrors(ev => ({ ...ev, telefono: '' })); }}
                  className={fieldClass}
                />
                {errors.telefono && <p className="text-red-400 text-xs mt-0.5">{errors.telefono}</p>}
              </div>

              {/* Sucursal */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  <MapPin size={13} /> Sucursal
                </label>
                <div className="relative">
                  <select
                    value={sucursalId}
                    onChange={e => { setSucursalId(e.target.value); setErrors(ev => ({ ...ev, sucursal: '' })); }}
                    className={fieldClass + ' pr-10 cursor-pointer'}
                  >
                    <option value="" disabled>Selecciona una sucursal</option>
                    {ciudades.map(ciudad => (
                      <optgroup key={ciudad.id} label={`${ciudad.nombre}`}>
                        {ciudad.sucursales.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.nombre}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
                {errors.sucursal && <p className="text-red-400 text-xs mt-0.5">{errors.sucursal}</p>}
              </div>

              {/* Plan */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  <Dumbbell size={13} /> Plan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PLANES.map(plan => (
                    <button
                      key={plan.nombre}
                      type="button"
                      onClick={() => { setPlanNombre(plan.nombre); setErrors(ev => ({ ...ev, plan: '' })); }}
                      className={`flex flex-col items-start p-3 rounded-xl border transition-all duration-200 text-left ${
                        planNombre === plan.nombre
                          ? 'border-primary bg-primary/10 shadow-[0_0_14px_rgba(220,38,38,0.3)]'
                          : 'border-white/10 bg-[#111] hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-wider text-white">{plan.nombre}</span>
                      <span className="text-white/50 text-xs mt-0.5">{plan.precio} Bs.</span>
                    </button>
                  ))}
                </div>
                {errors.plan && <p className="text-red-400 text-xs mt-0.5">{errors.plan}</p>}
              </div>

              {/* Mensaje opcional */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  Mensaje adicional <span className="text-white/30 normal-case font-normal">(opcional)</span>
                </label>
                <textarea
                  placeholder="¿Tienes alguna pregunta o comentario?"
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                  rows={3}
                  className={fieldClass + ' resize-none'}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="mt-2 w-full flex items-center justify-center gap-3 bg-primary text-black font-heading font-black uppercase tracking-widest text-sm py-4 rounded-xl shadow-[0_4px_24px_rgba(220,38,38,0.4)] hover:brightness-110 transition-all duration-200"
              >
                <Send size={18} />
                Enviar por WhatsApp
              </motion.button>

              <p className="text-center text-white/25 text-xs leading-relaxed">
                Al enviar, se abrirá WhatsApp con tu información pre-cargada.<br />
                No compartimos tus datos con terceros.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center text-center gap-5 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center"
              >
                <CheckCircle2 size={40} className="text-primary" />
              </motion.div>
              <h2 className="font-heading font-black text-3xl text-white">¡Listo!</h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Tu mensaje fue enviado a la sucursal. En breve te contactamos para confirmar tu inscripción.
              </p>
              <button
                onClick={() => { setStep('form'); setNombre(''); setTelefono(''); setSucursalId(''); setPlanNombre(''); setMensaje(''); }}
                className="mt-4 text-primary text-sm font-bold underline underline-offset-4 hover:text-white transition-colors"
              >
                Inscribir a otra persona
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
