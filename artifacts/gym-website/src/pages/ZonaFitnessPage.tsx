import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import {
  MapPin, Clock, ShoppingBag, Star, ChevronRight, X, ChevronLeft,
  ShoppingCart, Search, Plus, Minus, Trash2, Check, ArrowUp,
  ChevronDown, User, Phone, Package, MessageCircle, Send, Sparkles, Gift,
  ShieldCheck, Zap, Award
} from 'lucide-react';
import { assetUrl } from '@/lib/asset-url';

// ─── REGALOS ─────────────────────────────────────────────────────────────────
const REGALOS = [
  { img: '/promos/crew-polera.webp',  nombre: 'Camiseta Daddy Aioli',  detalle: 'Seamos Rivales — Edición limitada' },
  { img: '/promos/crew-shaker.webp',  nombre: 'Shaker Evogen',          detalle: 'Botella mezcladora 700ml — Azul' },
  { img: '/promos/crew-shaker.webp',  nombre: 'Shaker Insane Labz',     detalle: 'Botella mezcladora 700ml — Negro' },
  { img: '/promos/crew-gorra.webp',   nombre: 'Gorra Daddy Aioli',      detalle: 'Snapback blanca — Edición exclusiva' },
];

// ─── TIPOS ───────────────────────────────────────────────────────────────────
type Variante = { precio: string; detalle: string };
type CartItem = { img: string; nombre: string; precio: string; variante: string; qty: number };
type Producto = {
  img: string; nombre: string; precio: string; detalle: string;
  variantes?: Variante[];
  sucursales?: string[];
  badge?: 'Nuevo' | 'Más vendido';
};

// Todas las imágenes de la tienda pasan por este componente. Si una foto
// antigua se elimina o cambia de nombre, nunca dejamos un cuadro roto visible.
function SafeImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
        <img
      {...props}
      src={assetUrl(currentSrc ?? '/logo-bf.webp')}
      alt={alt}
      onError={() => {
        if (currentSrc !== '/logo-bf.webp') setCurrentSrc('/logo-bf.webp');
      }}
    />
  );
}

// ─── SUCURSALES ──────────────────────────────────────────────────────────────
const TODAS_SUCURSALES = ['Banzer', 'Centro', 'Radial 17', 'Piraí', 'Satélite', 'Melchor Pinto', 'UTEPSA'];

// ─── DATOS DE PRODUCTOS ──────────────────────────────────────────────────────
const productosQuemaGrasa: Producto[] = [
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Thermo Cuts Nutrex',    precio: '360BS', detalle: '120 Caps',   badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Athomx Lipo Smash',     precio: '280BS', detalle: '60 Serv.',  sucursales: ['Banzer','Centro','Radial 17','Satélite'] },
  { img: '/quema-grasa/l-carnitine-liquid-shots.webp', nombre: 'Carnitina Dragon',       precio: '350BS', detalle: '500ML',    sucursales: ['Banzer','Centro','Radial 17','Piraí','Melchor Pinto'] },
  { img: '/quema-grasa/l-carnitine-liquid-shots.webp', nombre: 'L-Carnitina Nutrex',    precio: '330BS', detalle: '500ML',    badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Lipo6 Black Ultra',     precio: '290BS', detalle: '60 Cps',   badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Lipo6 Stim Free',       precio: '300BS', detalle: '60 Cps',   sucursales: ['Banzer','Centro','Radial 17'] },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Lipo6 Diuretic Nutrex', precio: '280BS', detalle: '80 Cps',   sucursales: ['Banzer','Centro','Radial 17','Satélite'] },
  { img: '/quema-grasa/cla-3000-prosupps.webp',     nombre: 'BPI CLA+Carnitina',     precio: '350BS', detalle: '50 Serv.', sucursales: ['Banzer','Centro','Radial 17','Piraí'] },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Lipo6 Hers Nutrex',     precio: '250BS', detalle: '60 Cps',   sucursales: ['Banzer','Centro','Satélite'] },
  { img: '/quema-grasa/black-viper-dragon.webp',    nombre: 'Black Viper Dragon Pharma', precio: 'Consultar', detalle: '80 cápsulas · Energía y quema', badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/l-carnitine-liquid-shots.webp', nombre: 'L-Carnitine Liquid Shots ProSupps', precio: 'Consultar', detalle: '31 Serv. · Berry · Sin cafeína', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/dryup-dragon.webp',          nombre: 'DryUp Dragon Pharma',    precio: 'Consultar', detalle: '80 cápsulas · Diurético', sucursales: TODAS_SUCURSALES },
  { img: '/quema-grasa/cla-3000-prosupps.webp',     nombre: 'CLA 3000 ProSupps',      precio: 'Consultar', detalle: '90 cápsulas · Control de peso', badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
];

const productosAminoacidos: Producto[] = [
  { img: '/aminoacidos/hydro-bcaa-prosupps.webp', nombre: 'Beta Alanine Metabolic', precio: '250BS', detalle: '300gr',
    sucursales: ['Banzer','Centro','Radial 17'] },
  { img: '/aminoacidos/glutamine-fermented-dragon.webp',  nombre: 'Glutamina Pure Nutrex',  precio: '300BS', detalle: '300gr · 60 Serv.',
    badge: 'Más vendido', sucursales: TODAS_SUCURSALES,
    variantes: [{ precio: '300BS', detalle: '300gr · 60 Serv.' }, { precio: '610BS', detalle: '1000gr · 200 Serv.' }] },
  { img: '/aminoacidos/eaa-dragon-pharma.webp', nombre: 'EAA+Hydratation Nutrex', precio: '380BS', detalle: '30 Serv.',
    badge: 'Nuevo', sucursales: ['Banzer','Centro','Radial 17','Satélite'] },
  { img: '/aminoacidos/glutamine-fermented-dragon.webp',       nombre: 'Glutamina Scitec',       precio: '380BS', detalle: '600gr',
    sucursales: ['Banzer','Centro','Radial 17'] },
  { img: '/aminoacidos/hydro-bcaa-prosupps.webp',  nombre: 'BCAA+Glutamina Scitec',  precio: '460BS', detalle: '600gr',
    sucursales: ['Banzer','Centro','Radial 17','Piraí'] },
  { img: '/aminoacidos/eaa-dragon-pharma.webp',    nombre: 'Amino Charge Scitec',    precio: '410BS', detalle: '570gr · 30 Serv.',
    sucursales: ['Banzer','Centro','Radial 17','Satélite','Melchor Pinto'] },
  { img: '/aminoacidos/hydro-bcaa-prosupps.webp', nombre: 'Hydro BCAA ProSupps', precio: 'Consultar', detalle: '7g BCAA · 10g EAA · Blue Raspberry',
    badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/aminoacidos/eaa-dragon-pharma.webp', nombre: 'EAA Dragon Pharma', precio: 'Consultar', detalle: 'EAA avanzado · Recuperación y rendimiento',
    badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/aminoacidos/glutamine-fermented-dragon.webp', nombre: 'Glutamine Fermented Dragon Pharma', precio: 'Consultar', detalle: '300gr · Glutamina fermentada',
    sucursales: TODAS_SUCURSALES },
];

const productosCreatina: Producto[] = [
  { img: '/creatina/creatina-dragon-grape.webp', nombre: 'Creatina Monohidratada Dragon Pharma', precio: 'Consultar', detalle: '300gr · Uva · 45 Serv.',
    badge: 'Más vendido', sucursales: TODAS_SUCURSALES,
    variantes: [{ precio: 'Consultar', detalle: '300gr · Uva · 45 Serv.' }] },
  { img: '/creatina/creatina-dragon-monohydrate.webp', nombre: 'Creatina Monohidratada Dragon Pharma', precio: 'Consultar', detalle: '300gr · Sin sabor · 45 Serv.',
    sucursales: TODAS_SUCURSALES,
    variantes: [{ precio: 'Consultar', detalle: '300gr · Sin sabor · 45 Serv.' }] },
  { img: '/creatina/creatina-prosupps-monohydrate.webp', nombre: 'Creatina Monohidratada ProSupps', precio: 'Consultar', detalle: '1000gr · 200 Serv.',
    badge: 'Nuevo', sucursales: TODAS_SUCURSALES,
    variantes: [{ precio: 'Consultar', detalle: '1000gr · 200 Serv.' }] },
  { img: '/creatina/atp-force-dragon.webp', nombre: 'ATP Force Dragon Pharma', precio: 'Consultar', detalle: '30 Serv. · Fuerza y recuperación',
    badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
];

const productosGanadorPeso: Producto[] = [
  { img: '/proteinas/mass-phorm-dragon.webp',           nombre: 'NitroHard',           precio: '550BS', detalle: '900gr',           badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/mass-phorm-dragon.webp', nombre: 'Monsterone Darkness', precio: '450BS', detalle: 'Ganador de Peso', sucursales: ['Banzer','Centro','Radial 17','Satélite'] },
  { img: '/proteinas/mass-phorm-dragon.webp',            nombre: 'Carnibol',            precio: '520BS', detalle: '900gr',           sucursales: ['Banzer','Centro','Radial 17'] },
  { img: '/proteinas/mass-phorm-dragon.webp',          nombre: 'Mister Fit',          precio: '100BS', detalle: '1000gr',          badge: 'Nuevo', sucursales: ['Banzer','Centro','Radial 17','Piraí','Melchor Pinto','UTEPSA'] },
  { img: '/proteinas/mass-phorm-dragon.webp',      nombre: 'Vitargo Scitec',      precio: '250BS', detalle: '900gr · 30 Serv.',sucursales: ['Banzer','Centro','Radial 17'] },
];

const productosGorrasMedias: Producto[] = [
  { img: '/promos/crew-gorra.webp',     nombre: 'Gorra Dragon Pharma',  precio: '50BS', detalle: 'Camel / Negro',  badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-gorra.webp',nombre: 'Gorra Daddy Aioli',    precio: '50BS', detalle: 'Negro',          badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-gorra.webp',nombre: 'Gorra Bolivia Fitness', precio: '60BS', detalle: 'Negro',                                sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-medias.webp',           nombre: 'Medias Bolivia Fitness',precio: '40BS', detalle: 'Blanco / Negro',                       sucursales: TODAS_SUCURSALES },
];

const productosShorts: Producto[] = [
  { img: '/promos/crew-polera.webp',    nombre: 'Short Hombre Bolivia Fitness', precio: '150BS', detalle: 'Oliva / Gris',          badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',    nombre: 'Short Hombre Bolivia Fitness', precio: '150BS', detalle: 'Azul / Negro',           badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',   nombre: 'Short Damas Bolivia Fitness',  precio: '140BS', detalle: 'Azul / Naranja',                               sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',   nombre: 'Short Damas Bolivia Fitness',  precio: '140BS', detalle: 'Negro / Blanco',                               sucursales: TODAS_SUCURSALES },
];

const productosPoleras: Producto[] = [
  { img: '/promos/crew-polera.webp',    nombre: 'Polera Oversize Bolivia Fitness Bodybuilding', precio: '200BS', detalle: 'Azul / Negro',   badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',         nombre: 'Polera Oversize Bolivia Fitness Conquer',      precio: '200BS', detalle: 'Azul Marino',                         sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',   nombre: 'Polera Oversize Bolivia Fitness Dragon Negro', precio: '230BS', detalle: 'Negro',          badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',           nombre: 'Polera Oversize Daddy Aioli',         precio: '90BS',  detalle: 'Gris Oscuro',                         sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',  nombre: 'Polera Oversize Dragon Pharma',       precio: '230BS', detalle: 'Blanco',                              sucursales: TODAS_SUCURSALES },
];

const productosSoleras: Producto[] = [
  { img: '/promos/crew-polera.webp',              nombre: 'Solera Bolivia Fitness Modo Beast On', precio: '180BS', detalle: 'Negro',  badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',  nombre: 'Solera Bolivia Fitness Bodybuilding',  precio: '150BS', detalle: 'Azul',   badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp', nombre: 'Solera Bolivia Fitness Bodybuilding',  precio: '150BS', detalle: 'Negro',                        sucursales: TODAS_SUCURSALES },
  { img: '/promos/crew-polera.webp',             nombre: 'Solera Dragon Pharma',        precio: '230BS', detalle: 'Azul Marino',                  sucursales: TODAS_SUCURSALES },
];

const productos: Producto[] = [
  { img: '/proteinas/iso-phorm-dragon.webp', nombre: 'Whey Isolate Scitec',      precio: 'Consultar', detalle: 'Proteína Isolada',  badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-phorm-dragon-rainbow.webp',     nombre: '100% Whey Protein Scitec', precio: 'Consultar', detalle: 'Proteína Whey',     badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-prosupps.webp',          nombre: 'Proteína Whey 90 USN',     precio: 'Consultar', detalle: 'Premium Protein',                         sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/mass-phorm-dragon.webp', nombre: 'Super Whey IntegralMedica',precio: 'Consultar', detalle: 'Whey 100% Pure',                          sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-prosupps.webp',  nombre: 'Whey 100% Pure Integral',  precio: 'Consultar', detalle: 'Proteína Whey',                           sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-phorm-dragon-rainbow.webp',       nombre: 'Protein Phorm Dragon',     precio: 'Consultar', detalle: 'Proteína Blend',    badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/iso-phorm-dragon.webp',           nombre: 'ISO Rhorm Isolate Dragon', precio: 'Consultar', detalle: '100% Whey Isolate', badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-phorm-dragon-rainbow.webp',          nombre: 'Whey Phorm Isolate Dragon',precio: 'Consultar', detalle: 'Whey Isolate',      badge: 'Nuevo',       sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/iso-phorm-dragon.webp',       nombre: 'Isojet Evogen',            precio: 'Consultar', detalle: 'Ultra-Pure Isolate',                      sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/mass-phorm-dragon.webp',          nombre: 'Mass Phorm Dragon Pharma', precio: 'Consultar', detalle: 'Mass gainer · Chocolate · 200 Serv.', badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-phorm-dragon-rainbow.webp',  nombre: 'Whey Phorm Dragon Pharma', precio: 'Consultar', detalle: 'Whey blend · Rainbow Cake', badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/whey-prosupps.webp',              nombre: 'Whey ProSupps',             precio: 'Consultar', detalle: 'Proteína premium · Cookies & Cream', sucursales: TODAS_SUCURSALES },
  { img: '/proteinas/iso-phorm-dragon.webp',           nombre: 'ISO Phorm Dragon Pharma',   precio: 'Consultar', detalle: 'Whey isolate hidrolizada · Peanut Butter', badge: 'Nuevo', sucursales: TODAS_SUCURSALES },
];

// ─── PRE-ENTRENOS ─────────────────────────────────────────────────────────────
const productosPreentrenos: Producto[] = [
  { img: '/pre-entrenos/venom-inferno-dragon.webp', nombre: 'Venom Inferno Dragon Pharma', precio: 'Consultar', detalle: '300gr · Lychee', badge: 'Más vendido', sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/mr-veinz-dragon.webp',      nombre: 'Mr. Veinz Dragon Pharma',     precio: 'Consultar', detalle: '40/20 Serv. · Pineapple', badge: 'Nuevo',        sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/neuro-morph-dragon.webp',   nombre: 'Neuro Morph Dragon Pharma',   precio: 'Consultar', detalle: '40 Serv. · Orange Mango',                         sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/hyde-signature.webp',       nombre: 'Mr. Hyde Signature',          precio: 'Consultar', detalle: '1 Serving · Blue Razz',                           sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/l-citrulline-dragon.webp',  nombre: 'L-Citrulline Dragon Pharma',  precio: 'Consultar', detalle: '180gr · 60 Serv. · Unflavored',                   sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/pre-extra-1.webp',          nombre: 'Pre-Entreno Dragon Pharma',   precio: 'Consultar', detalle: 'Pre-Workout',                                     sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/pre-extra-2.webp',          nombre: 'Pre-Workout Premium',         precio: 'Consultar', detalle: 'Fuerza · Energía · Foco',                         sucursales: TODAS_SUCURSALES },
  { img: '/pre-entrenos/pre-extra-3.webp',          nombre: 'Pre-Workout Dragon',          precio: 'Consultar', detalle: 'Energía Explosiva',                               sucursales: TODAS_SUCURSALES },
];

// Catálogo unificado para buscador
const catalogoCompleto = [
  ...productos.map(p           => ({ ...p, categoria: 'Proteína',       seccion: 'proteinas' })),
  ...productosPreentrenos.map(p=> ({ ...p, categoria: 'Pre-Entrenos',   seccion: 'pre-entrenos' })),
  ...productosGanadorPeso.map(p=> ({ ...p, categoria: 'Ganador de Peso',seccion: 'ganador-de-peso' })),
  ...productosCreatina.map(p   => ({ ...p, categoria: 'Creatina',       seccion: 'creatina' })),
  ...productosAminoacidos.map(p=> ({ ...p, categoria: 'Aminoácidos',    seccion: 'aminoacidos' })),
  ...productosQuemaGrasa.map(p => ({ ...p, categoria: 'Quema Grasa',    seccion: 'quema-grasa' })),
  ...productosSoleras.map(p    => ({ ...p, categoria: 'Soleras',        seccion: 'soleras' })),
  ...productosPoleras.map(p    => ({ ...p, categoria: 'Poleras',        seccion: 'poleras' })),
  ...productosShorts.map(p         => ({ ...p, categoria: 'Shorts',         seccion: 'shorts' })),
  ...productosGorrasMedias.map(p   => ({ ...p, categoria: 'Gorras & Medias', seccion: 'gorras-medias' })),
];

const categorias = [
  { nombre: 'Proteínas',        desc: 'Whey, caseína, isolada, hidrolizada y vegana.',           productos: ['Whey Protein','Caseína','Proteína Isolada','Proteína Vegana','Egg Protein'],  color: 'from-blue-900/20 to-blue-950/10',    border: 'border-blue-500/20',   glow: 'shadow-[0_0_24px_rgba(59,130,246,0.1)]'  },
  { nombre: 'Pre-Entrenos',     desc: 'Energía explosiva, foco mental y pump extremo.',           productos: ['C4 Original','Ghost Legend','Nitraflex','Bulk Black','Mr. Hyde'],             color: 'from-yellow-900/20 to-yellow-950/10', border: 'border-yellow-500/20', glow: 'shadow-[0_0_24px_rgba(234,179,8,0.1)]'   },
  { nombre: 'Creatina',         desc: 'Monohidratada, HCl y fórmulas avanzadas.',                productos: ['Creapure','Creatine HCl','Creatine Monohydrate','Kre-Alkalyn','Cell-Tech'],   color: 'from-red-900/20 to-red-950/10',      border: 'border-primary/20',    glow: 'shadow-[0_0_24px_rgba(220,38,38,0.1)]'   },
  { nombre: 'Aminoácidos',      desc: 'BCAA, EAA, glutamina y más. Recuperación óptima.',        productos: ['BCAA 2:1:1','EAA Complex','Glutamina','Arginina','Beta-Alanina'],              color: 'from-green-900/20 to-green-950/10',  border: 'border-green-500/20',  glow: 'shadow-[0_0_24px_rgba(34,197,94,0.1)]'   },
  { nombre: 'Quemadores',       desc: 'Termogénicos y fat burners para tu definición.',          productos: ['Hydroxycut','Lipo-6 Black','OxyShred','Burn-XT','Cellucor Super HD'],          color: 'from-orange-900/20 to-orange-950/10', border: 'border-orange-500/20', glow: 'shadow-[0_0_24px_rgba(249,115,22,0.1)]'  },
  { nombre: 'Vitaminas & Salud',desc: 'Multivitamínicos, omega-3, vitamina D3 y bienestar.',     productos: ['Multivitamínico','Omega-3','Vitamina D3','Zinc + Magnesio','Colágeno'],         color: 'from-purple-900/20 to-purple-950/10', border: 'border-purple-500/20',  glow: 'shadow-[0_0_24px_rgba(168,85,247,0.1)]'  },
  { nombre: 'Ganadores de Masa',desc: 'Mass gainers e hipercalóricos para maximizar tu volumen.',productos: ['Serious Mass','True-Mass','Mega Mass','Up Your Mass','Real Gains'],             color: 'from-indigo-900/20 to-indigo-950/10', border: 'border-indigo-500/20',  glow: 'shadow-[0_0_24px_rgba(99,102,241,0.1)]'  },
  { nombre: 'Accesorios',       desc: 'Shakers, guantes, cinturones y todo lo que necesitas.',   productos: ['Shakers','Guantes','Cinturones','Rodilleras','Straps'],                        color: 'from-zinc-800/20 to-zinc-900/10',     border: 'border-white/10',      glow: 'shadow-[0_0_24px_rgba(255,255,255,0.05)]' },
];

const marcas = ['Optimum Nutrition','MuscleTech','BSN','Dymatize','Cellucor','Ghost','Redcon1','Allmax','Rule1','EVL Nutrition','NutriFit Bolivia','NutreExplosion','Señor Maca'];

const FILTROS_RAPIDOS = [
  { label: 'Proteínas',         id: 'proteinas' },
  { label: 'Pre-Entrenos',      id: 'pre-entrenos' },
  { label: 'Aminoácidos',       id: 'aminoacidos' },
  { label: 'Creatina',          id: 'creatina' },
  { label: 'Quemadores',        id: 'quema-grasa' },
  { label: 'Ganadores',         id: 'ganador-de-peso' },
  { label: 'Soleras',           id: 'soleras' },
  { label: 'Poleras',           id: 'poleras' },
  { label: 'Shorts',            id: 'shorts' },
  { label: 'Gorras & Medias',   id: 'gorras-medias' },
];

// ─── MODAL REGALOS ───────────────────────────────────────────────────────────
function GiftModal({ productoPedido, onClose }: { productoPedido: Omit<CartItem,'qty'>; onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleReclamar = () => {
    if (selected === null) return;
    const regalo = REGALOS[selected].nombre;
    const msg = `*Tienda Virtual Bolivia Fitness*\n\nHola. Quiero reclamar mi regalo por compra.\n\nProducto: ${productoPedido.nombre}\nRegalo elegido: ${regalo}`;
    window.open(`https://wa.me/59175666702?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030303]/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#080808] border border-primary/20 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(220,38,38,0.15)] flex flex-col"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_12px_rgba(220,38,38,0.4)]">
              <Gift size={16} className="text-primary" />
            </div>
            <span className="text-white font-heading font-black tracking-[0.2em] uppercase text-sm">Elige tu regalo</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><X size={16} /></button>
        </div>
        <div className="p-6">
          <p className="text-white/40 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-4">Lleva un producto, escoge un regalo</p>
          <div className="grid grid-cols-2 gap-4">
            {REGALOS.map((r, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`relative flex flex-col items-center text-center rounded-xl border overflow-hidden transition-all duration-300 p-3 ${selected === i ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(220,38,38,0.3)] scale-[1.02]' : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]'}`}>
                {selected === i && (
                  <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <SafeImage src={r.img} alt={r.nombre} className="w-20 h-20 object-contain mb-3 drop-shadow-lg" />
                <p className={`font-heading font-bold text-xs leading-tight mb-1 ${selected === i ? 'text-primary' : 'text-white'}`}>{r.nombre}</p>
                <p className="text-white/40 font-sans text-[10px] leading-snug">{r.detalle}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-5 border-t border-white/5 bg-[#050505]">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 mb-4">
            <p className="text-white/40 text-[9px] font-heading font-black tracking-[0.2em] uppercase mb-2">Tu selección</p>
            <div className="flex items-center gap-2 mb-1.5">
              <Package size={14} className="text-primary" />
              <span className="text-white font-sans text-xs truncate">{productoPedido.nombre}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift size={14} className="text-primary" />
              <span className={`font-sans text-xs truncate font-bold ${selected !== null ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'text-white/30'}`}>
                {selected !== null ? REGALOS[selected].nombre : 'Aún no elegiste un regalo'}
              </span>
            </div>
          </div>
          <button onClick={handleReclamar} disabled={selected === null}
            className={`w-full flex items-center justify-center gap-2 font-heading font-black uppercase text-[11px] tracking-[0.15em] py-4 rounded-xl transition-all duration-300 ${selected !== null ? 'bg-[#25D366] text-black shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5d] active:scale-[0.98]' : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'}`}>
            <FaWhatsapp size={16} /> Reclamar regalo por WhatsApp
          </button>
          <button onClick={onClose} className="w-full mt-3 text-white/30 hover:text-white/70 font-sans text-xs transition-colors">Omitir y continuar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FORMULARIO DE PEDIDO ───────────────────────────────────────────────────
interface OrderFormProps { cart: CartItem[]; onClose: () => void; onSent: () => void; }

function OrderForm({ cart, onClose, onSent }: OrderFormProps) {
  const [nombre, setNombre]     = useState('');
  const [telefono, setTelefono] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [entrega, setEntrega]   = useState<'sucursal' | 'envio'>('sucursal');
  const [comentarios, setComentarios] = useState('');
  const [errors, setErrors]     = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!nombre.trim())   e.nombre   = 'Ingresa tu nombre';
    if (!telefono.trim()) e.telefono = 'Ingresa tu teléfono';
    if (!sucursal)        e.sucursal = 'Selecciona una sucursal';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;
    const lines = cart.map(c => `• ${c.nombre}${c.variante ? ` (${c.variante})` : ''} — ${c.precio} ×${c.qty}`).join('\n');
    const metodo = entrega === 'sucursal' ? `Recoger en sucursal: *${sucursal}*` : `Consultar envío (sucursal ref: *${sucursal}*)`;
    const msg = [
      `*Tienda Virtual Bolivia Fitness*`, ``, `Hola. Quiero hacer un pedido.`, ``, `*Datos:*`, `Nombre: ${nombre}`, `Teléfono: ${telefono}`, `Método: ${metodo}`, ``, `*Productos:*`,
      lines, comentarios.trim() ? `\n*Comentarios:* ${comentarios.trim()}` : '', ``, `Por favor confirmar.`
    ].filter(l => l !== undefined).join('\n');
    window.location.href = `https://wa.me/59175666702?text=${encodeURIComponent(msg)}`;
    onSent();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030303]/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-[#080808] border border-[#25D366]/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(37,211,102,0.15)] flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <FaWhatsapp size={20} className="text-[#25D366]" />
            <span className="text-white font-heading font-black tracking-[0.2em] uppercase text-sm">Datos del pedido</span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-all"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <p className="text-white/40 text-[9px] font-heading font-black tracking-[0.2em] uppercase mb-3">Resumen ({cart.reduce((s,c)=>s+c.qty,0)})</p>
            <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-xs font-sans">
                  <span className="text-white/70 truncate mr-2">{item.nombre} {item.variante && `(${item.variante})`}</span>
                  <span className="text-primary font-bold shrink-0">×{item.qty}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-white/50 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 block">Nombre *</label>
              <input type="text" value={nombre} onChange={e => {setNombre(e.target.value); setErrors(p=>({...p,nombre:''}))}}
                className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all ${errors.nombre?'border-red-500':'border-white/10 focus:border-primary focus:bg-white/[0.05]'}`} />
            </div>
            <div>
              <label className="text-white/50 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 block">Teléfono *</label>
              <input type="tel" value={telefono} onChange={e => {setTelefono(e.target.value); setErrors(p=>({...p,telefono:''}))}}
                className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all ${errors.telefono?'border-red-500':'border-white/10 focus:border-primary focus:bg-white/[0.05]'}`} />
            </div>
            <div>
              <label className="text-white/50 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 block">Sucursal de recojo *</label>
              <select value={sucursal} onChange={e => {setSucursal(e.target.value); setErrors(p=>({...p,sucursal:''}))}}
                className={`w-full appearance-none bg-white/[0.03] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.sucursal?'border-red-500 text-white':'border-white/10 focus:border-primary focus:bg-white/[0.05]'} ${!sucursal?'text-white/30':'text-white'}`}>
                <option value="" disabled>Seleccionar...</option>
                {TODAS_SUCURSALES.map(s => <option key={s} value={s} className="bg-[#111] text-white">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 block">Entrega</label>
              <div className="grid grid-cols-2 gap-3">
                {(['sucursal','envio'] as const).map((val) => (
                  <button key={val} onClick={() => setEntrega(val)}
                    className={`py-3 rounded-xl border text-[11px] font-heading font-black tracking-[0.1em] uppercase transition-all ${entrega === val ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' : 'bg-white/[0.02] border-white/10 text-white/50 hover:border-white/30'}`}>
                    {val === 'sucursal' ? 'Recoger' : 'Envío'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-white/5 bg-[#050505]">
          <button onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-heading font-black text-[11px] tracking-[0.15em] uppercase py-4 rounded-xl transition-all shadow-[0_4px_24px_rgba(37,211,102,0.3)] active:scale-[0.98]">
            <Send size={16} /> Enviar pedido
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CONFIRMACIÓN DE PEDIDO ───────────────────────────────────────────────────
function OrderConfirmation({ cart, onClose, onNewOrder }: { cart: CartItem[]; onClose: () => void; onNewOrder: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030303]/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }}
        className="relative w-full max-w-sm bg-[#080808] border border-[#25D366]/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(37,211,102,0.2)] p-8 text-center"
        onClick={e => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,211,102,0.4)]">
          <Check size={36} className="text-[#25D366]" />
        </div>
        <h3 className="text-white font-heading font-black text-2xl mb-2 tracking-tight">¡Pedido enviado!</h3>
        <p className="text-white/50 text-sm font-sans mb-8">Te contactaremos por WhatsApp en breve para confirmar tu compra.</p>
        <div className="space-y-3">
          <button onClick={onNewOrder} className="w-full py-4 rounded-xl border border-white/10 text-white font-heading font-black text-[11px] tracking-[0.15em] uppercase hover:bg-white/5 transition-all">Hacer otro pedido</button>
          <button onClick={onClose} className="w-full py-3 text-white/30 hover:text-white/70 font-sans text-xs transition-colors">Volver a la tienda</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MODAL DE PRODUCTO ────────────────────────────────────────────────────────
function ProductModal({ items, index, categoria, onClose, onPrev, onNext, addToCart, onOpenCart, onOpenGift }: {
  items: Producto[]; index: number; categoria: string;
  onClose: () => void; onPrev: () => void; onNext: () => void;
  addToCart: (item: Omit<CartItem,'qty'>, qty: number) => void;
  onOpenCart: () => void;
  onOpenGift?: (item: Omit<CartItem,'qty'>) => void;
}) {
  const [qty, setQty]             = useState(1);
  const [added, setAdded]         = useState(false);
  const [varIdx, setVarIdx]       = useState(0);
  const prod = items[index];
  const varianteActual = prod.variantes?.[varIdx];
  const precioMostrar  = varianteActual?.precio ?? prod.precio;
  const detalleMostrar = varianteActual?.detalle ?? prod.detalle;

  useEffect(() => { setQty(1); setAdded(false); setVarIdx(0); }, [index]);

  const handleAddToCart = () => {
    addToCart({
      img: prod.img, nombre: prod.nombre,
      precio: precioMostrar,
      variante: varianteActual?.detalle ?? '',
    }, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false); onClose();
      if (onOpenGift) onOpenGift({ img: prod.img, nombre: prod.nombre, precio: precioMostrar, variante: varianteActual?.detalle ?? '' });
      else onOpenCart();
    }, 900);
  };

  const handleWhatsApp = () => {
    const msg = `*Tienda Virtual Bolivia Fitness*\n\nHola, vengo de la tienda online de Bolivia Fitness. Quiero consultar o comprar: ${prod.nombre}.`;
    window.location.href = `https://wa.me/59175666702?text=${encodeURIComponent(msg)}`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#030303]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-8" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row max-h-[calc(100dvh-1rem)] md:max-h-[95vh]"
        onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md" aria-label="Cerrar">
          <X size={20} />
        </button>

        {/* Imagen */}
        <div className="relative w-full h-[22vh] min-h-[190px] max-h-[240px] md:h-auto md:min-h-[300px] md:max-h-none md:w-[55%] bg-gradient-to-b from-[#0a0a0a] to-[#030303] shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 p-4 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          {prod.badge && (
            <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-heading font-black tracking-[0.2em] uppercase bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_4px_16px_rgba(245,158,11,0.3)]">
              {prod.badge === 'Nuevo' ? <Sparkles size={12} /> : <Star size={12} />} {prod.badge}
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div key={prod.img} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
              className="w-full h-full relative z-10">
              <SafeImage src={prod.img} alt={prod.nombre} className="w-full h-full object-contain max-h-[20vh] md:max-h-[600px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none z-20">
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"><ChevronLeft size={24} /></button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"><ChevronRight size={24} /></button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 font-heading text-[10px] font-black tracking-[0.3em]">{index + 1} / {items.length}</div>
        </div>

        {/* Info */}
        <div className="flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 md:p-10 overflow-y-auto bg-[#050505]">
          <div>
            <p className="text-primary font-heading text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-1.5 md:mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-primary"></span> {categoria}
            </p>
            <AnimatePresence mode="wait">
              <motion.h2 key={prod.nombre} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="text-white font-heading font-black text-2xl sm:text-3xl md:text-4xl leading-[1.05] mb-2 md:mb-4">{prod.nombre}</motion.h2>
            </AnimatePresence>
            <p className="text-white/50 text-xs sm:text-sm md:text-base leading-snug md:leading-relaxed mb-3 md:mb-6 font-sans">{detalleMostrar}</p>

            {/* Precio */}
            <div className="mb-3 md:mb-8">
              <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white drop-shadow-[0_0_24px_rgba(220,38,38,0.4)]">
                {precioMostrar}
              </p>
            </div>

            {/* Selector de variante */}
            {prod.variantes && prod.variantes.length > 1 && (
              <div className="mb-3 md:mb-8">
                <p className="text-white/40 text-[9px] md:text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 md:mb-3">Elige tu presentación</p>
                <div className="grid grid-cols-2 gap-3">
                  {prod.variantes.map((v, i) => (
                    <button key={i} onClick={() => setVarIdx(i)}
                      className={`flex flex-col items-start px-3 py-2 md:px-4 md:py-3 rounded-xl border text-left transition-all duration-200 ${varIdx === i ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(220,38,38,0.15)]' : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.05] hover:border-white/20'}`}>
                      <span className="font-heading font-black text-xs md:text-sm mb-0.5">{v.precio}</span>
                      <span className="font-sans text-[10px] md:text-[11px] opacity-80">{v.detalle}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-white/5 mb-3 md:mb-6" />

            {/* Cantidad y Sucursales */}
            <div className="flex items-start gap-3 md:gap-6 mb-3 md:mb-8">
              <div>
                <p className="text-white/40 text-[9px] md:text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 md:mb-3">Cantidad</p>
                <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1 w-fit">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><Minus size={14} /></button>
                  <span className="text-white font-heading font-black text-lg md:text-xl w-8 md:w-12 text-center tabular-nums">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><Plus size={14} /></button>
                </div>
              </div>
              
              {prod.sucursales && prod.sucursales.length > 0 && (
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-[9px] md:text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2 md:mb-3">Disponibilidad</p>
                  <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-1 scrollbar-hide">
                    {prod.sucursales.map(s => (
                      <span key={s} className="flex shrink-0 items-center gap-1.5 bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-[9px] md:text-[10px] font-heading font-bold text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_rgba(37,211,102,0.8)] shrink-0" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="sticky bottom-0 flex flex-col sm:flex-row gap-2 md:gap-3 mt-2 md:mt-4 pt-2 md:pt-0 pb-1 md:pb-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
            <button onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 font-heading font-black text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.15em] uppercase py-3 md:py-4 rounded-xl transition-all duration-300 active:scale-[0.98] ${added ? 'bg-[#25D366] text-black shadow-[0_0_30px_rgba(37,211,102,0.5)]' : 'bg-primary hover:bg-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)]'}`}>
              {added ? <><Check size={18} /> Añadido</> : <><ShoppingCart size={18} /> Añadir al carrito</>}
            </button>
            <button onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 font-heading font-black text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.15em] uppercase py-3 md:py-4 rounded-xl border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 active:scale-[0.98]">
              <FaWhatsapp size={18} /> Consultar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── TARJETA DE PRODUCTO ──────────────────────────────────────────────────────
function ProductCard({ img, nombre, precio, detalle, badge, onView, onAddToCart }: {
  img: string; nombre: string; precio: string; detalle: string;
  badge?: string; onView: () => void; onAddToCart: () => void;
}) {
  const [added, setAdded] = useState(false);
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl bg-[#030303] overflow-hidden cursor-pointer transition-all duration-300 h-full"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.02)'
      }}
      onClick={onView}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none z-20 group-hover:ring-primary/50 transition-colors duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_24px_rgba(220,38,38,0.3)] z-0" />

      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gradient-to-b from-[#0a0a0a] to-[#030303] overflow-hidden z-10 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <SafeImage src={img} alt={nombre} loading="lazy" decoding="async" className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-700 relative z-0" />
        
        {/* Badge "Ver Detalle" */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
          <div className="bg-primary text-white font-heading font-black text-[10px] tracking-[0.2em] uppercase px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.8)] scale-90 group-hover:scale-100 transition-transform duration-300">
            VER DETALLE
          </div>
        </div>

        {/* Precio */}
        <div className="absolute top-3 left-3 z-30">
          <span className="bg-[#dc2626] text-white font-heading font-black text-[11px] tracking-wider px-3 py-1.5 rounded shadow-[0_4px_12px_rgba(220,38,38,0.5)] flex items-center">
            {precio}
          </span>
        </div>

        {/* Badge Nuevo/Vendido */}
        {badge && (
          <div className="absolute top-3 right-3 z-30">
            <span className="flex items-center gap-1.5 font-heading font-black text-[9px] tracking-widest uppercase px-2.5 py-1.5 rounded bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
              {badge === 'Nuevo' ? <Sparkles size={10} /> : <Star size={10} />} {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 z-10 bg-[#030303]">
        <p className="text-white/40 text-[9px] font-heading font-black tracking-[0.25em] uppercase mb-1.5">{detalle}</p>
        <p className="text-white font-heading font-bold text-base leading-tight group-hover:text-primary transition-colors duration-300 mb-4">{nombre}</p>
        
        <button onClick={handleAdd}
          className={`mt-auto w-full flex items-center justify-center gap-2 font-heading font-black text-[10px] tracking-[0.15em] uppercase py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] ${added ? 'bg-[#25D366] text-black shadow-[0_0_20px_rgba(37,211,102,0.4)] border border-[#25D366]' : 'bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 hover:border-[#25D366]'}`}>
          {added ? <><Check size={14} /> ¡Añadido!</> : <><ShoppingCart size={14} /> Añadir al carrito</>}
        </button>
      </div>
    </motion.div>
  );
}

// ─── SECCIÓN DE PRODUCTOS ─────────────────────────────────────────────────────
function SeccionProductos({ id, titulo, subtitulo, desc, items, categoria, addToCart, onOpenCart, onOpenGift }: {
  id: string; titulo: string; subtitulo: string; desc: string;
  items: Producto[]; categoria: string;
  addToCart: (item: Omit<CartItem,'qty'>, qty: number) => void;
  onOpenCart: () => void;
  onOpenGift?: (item: Omit<CartItem,'qty'>) => void;
}) {
  const [modal, setModal] = useState<number | null>(null);

  useEffect(() => {
    if (modal === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setModal(null);
      if (e.key === 'ArrowLeft')  setModal(i => i !== null ? (i - 1 + items.length) % items.length : null);
      if (e.key === 'ArrowRight') setModal(i => i !== null ? (i + 1) % items.length : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, items.length]);

  return (
    <section id={id} className="pt-10 pb-10 bg-[#030303] scroll-mt-24 relative border-t border-white/5">
      <AnimatePresence>
        {modal !== null && (
          <ProductModal items={items} index={modal} categoria={categoria}
            onClose={() => setModal(null)}
            onPrev={() => setModal(i => i !== null ? (i - 1 + items.length) % items.length : null)}
            onNext={() => setModal(i => i !== null ? (i + 1) % items.length : null)}
            addToCart={addToCart} onOpenCart={onOpenCart} onOpenGift={onOpenGift} />
        )}
      </AnimatePresence>
      <div className="container mx-auto px-6 md:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-primary font-heading font-black text-[10px] tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_8px_var(--color-primary)]">
                <span className="w-8 h-px bg-primary"></span> {categoria}
              </p>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-none tracking-tight">
                {titulo} <span className="text-primary drop-shadow-[0_0_24px_rgba(220,38,38,0.4)]">{subtitulo}</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm md:text-base max-w-sm leading-relaxed font-sans">
              {desc}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((prod, i) => (
            <motion.div key={`${prod.img}-${prod.nombre}-${prod.detalle}-${i}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.5 }} className="h-full">
              <ProductCard img={prod.img} nombre={prod.nombre} precio={prod.precio} detalle={prod.variantes?.[0]?.detalle ?? prod.detalle} badge={prod.badge}
                onView={() => setModal(i)}
                onAddToCart={() => addToCart({ img: prod.img, nombre: prod.nombre, precio: prod.precio, variante: prod.variantes?.[0]?.detalle ?? '' }, 1)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function ZonaFitnessPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<number | null>(null);
  const [modalProt, setModalProt]             = useState<number | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen]           = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderSent, setOrderSent]         = useState(false);
  const [sentCart, setSentCart]           = useState<CartItem[]>([]);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [giftTriggerItem, setGiftTriggerItem] = useState<Omit<CartItem,'qty'> | null>(null);
  const openGiftModal = useCallback((item: Omit<CartItem,'qty'>) => { setGiftTriggerItem(item); setGiftModalOpen(true); }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => { try { localStorage.setItem('bf_cart', JSON.stringify(cart)); } catch {} }, [cart]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setCartOpen(false); setModalProt(null); setOrderFormOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (modalProt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setModalProt(null);
      if (e.key === 'ArrowLeft')  setModalProt(i => i !== null ? (i - 1 + productos.length) % productos.length : null);
      if (e.key === 'ArrowRight') setModalProt(i => i !== null ? (i + 1) % productos.length : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalProt]);

  const addToCart = useCallback((item: Omit<CartItem,'qty'>, qty = 1) => {
    setCart(prev => {
      const key = item.nombre + (item.variante ?? '');
      const existing = prev.find(c => c.nombre + (c.variante ?? '') === key);
      if (existing) return prev.map(c => c.nombre + (c.variante ?? '') === key ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { ...item, qty }];
    });
  }, []);

  const removeFromCart = (nombre: string, variante: string) => setCart(prev => prev.filter(c => !(c.nombre === nombre && c.variante === variante)));
  const updateQty = (nombre: string, variante: string, delta: number) => setCart(prev => prev.map(c => c.nombre === nombre && c.variante === variante ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  const handleSendOrder = () => { if (!cart.length) return; setOrderFormOpen(true); };
  const handleOrderSent = () => { setSentCart([...cart]); setOrderFormOpen(false); setCartOpen(false); setOrderSent(true); setCart([]); };
  const scrollToSection = (id: string) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setSearchQuery(''); };

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length >= 1;
  const filteredProducts = isSearching ? catalogoCompleto.filter(p => p.nombre.toLowerCase().includes(q) || p.detalle.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)) : [];
  const sugerencias = isSearching && filteredProducts.length > 0 && q.length < 3 ? [...new Set(filteredProducts.map(p => p.categoria))].slice(0, 4) : [];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary selection:text-white">
      {/* ── MODALES ──────────────────────────────────────── */}
      <AnimatePresence>{orderFormOpen && <OrderForm cart={cart} onClose={() => setOrderFormOpen(false)} onSent={handleOrderSent} />}</AnimatePresence>
      <AnimatePresence>{orderSent && <OrderConfirmation cart={sentCart} onClose={() => setOrderSent(false)} onNewOrder={() => { setOrderSent(false); setCartOpen(true); }} />}</AnimatePresence>
      <AnimatePresence>{giftModalOpen && giftTriggerItem && <GiftModal productoPedido={giftTriggerItem} onClose={() => setGiftModalOpen(false)} />}</AnimatePresence>

      {/* ── DRAWER CARRITO ───────────────────────────────── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-[#030303]/90 backdrop-blur-md" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-[91] w-full max-w-md bg-[#080808] border-l border-white/5 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_12px_rgba(220,38,38,0.4)]">
                    <ShoppingCart size={14} className="text-primary" />
                  </div>
                  <span className="text-white font-heading font-black tracking-[0.2em] uppercase text-sm">Mi Pedido</span>
                  {totalItems > 0 && <span className="bg-primary text-white font-heading font-black text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]">{totalItems}</span>}
                </div>
                <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><X size={16} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                      <ShoppingCart size={32} className="text-white/20" />
                    </div>
                    <p className="text-white/60 font-heading font-black text-lg mb-2">Tu pedido está vacío</p>
                    <p className="text-white/40 font-sans text-sm max-w-[200px]">Explora el catálogo y añade los mejores suplementos.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.nombre + item.variante} className="flex gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                      <div className="w-20 h-20 rounded-xl bg-[#030303] border border-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                        <SafeImage src={item.img} alt={item.nombre} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="text-white font-heading font-bold text-sm leading-tight mb-1 truncate">{item.nombre}</p>
                        {item.variante && <p className="text-white/40 font-sans text-[10px] mb-2">{item.variante}</p>}
                        <p className="text-primary font-heading font-black text-sm drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]">{item.precio}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1 bg-[#030303] border border-white/10 rounded-lg p-1">
                            <button onClick={() => updateQty(item.nombre, item.variante, -1)} className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10"><Minus size={12} /></button>
                            <span className="text-white font-heading font-black text-xs w-6 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.nombre, item.variante, 1)} className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10"><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.nombre, item.variante)} className="text-white/30 hover:text-primary transition-colors ml-auto"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-white/5 bg-[#050505]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-[10px] font-heading font-black tracking-[0.2em] uppercase">{totalItems} productos</span>
                    <button onClick={() => setCart([])} className="text-white/30 hover:text-primary text-[10px] font-heading font-black tracking-widest uppercase transition-colors">Vaciar</button>
                  </div>
                  <button onClick={handleSendOrder}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-heading font-black text-xs tracking-[0.15em] uppercase py-5 rounded-xl transition-all shadow-[0_4px_30px_rgba(37,211,102,0.4)] active:scale-[0.98]">
                    <FaWhatsapp size={20} /> Enviar pedido
                  </button>
                  <p className="text-white/30 text-[10px] text-center mt-4 font-sans">Te contactaremos para confirmar disponibilidad y entrega.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── BOTÓN FLOTANTE CARRITO ────────────────────────── */}
      <motion.button onClick={() => setCartOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[85] w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_8px_40px_rgba(220,38,38,0.6)] hover:bg-red-500 transition-colors">
        <ShoppingCart size={24} className="text-white" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-black text-[11px] font-heading font-black flex items-center justify-center shadow-lg">
              {totalItems > 9 ? '9+' : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── BOTÓN VOLVER ARRIBA ───────────────────────────── */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-[85] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── MODAL PROTEÍNAS ──────────────────────────────── */}
      <AnimatePresence>
        {modalProt !== null && (
          <ProductModal items={productos} index={modalProt} categoria="Suplementación Profesional"
            onClose={() => setModalProt(null)}
            onPrev={() => setModalProt(i => i !== null ? (i - 1 + productos.length) % productos.length : null)}
            onNext={() => setModalProt(i => i !== null ? (i + 1) % productos.length : null)}
            addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
        )}
      </AnimatePresence>

      {/* ── BUSCADOR STICKY + FILTROS RÁPIDOS ────────────── */}
      <div className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/10 py-4 px-6 md:px-16 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between max-w-6xl mx-auto">
            <div className="relative w-full md:w-[400px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/70 pointer-events-none group-focus-within:text-primary transition-colors" />
              <input
                ref={searchRef}
                type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar suplementos..."
                aria-label="Buscar suplementos"
                className="w-full bg-white border-2 border-white rounded-full pl-12 pr-10 py-3.5 text-black font-sans text-sm font-semibold placeholder:text-black/55 shadow-[0_0_18px_rgba(255,255,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.9)] focus:outline-none focus:border-primary focus:shadow-[0_0_24px_rgba(255,255,255,0.8),0_0_34px_rgba(220,38,38,0.28)] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda" className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-primary transition-colors"><X size={16} /></button>
              )}
              {/* Sugerencias */}
              <AnimatePresence>
                {sugerencias.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 p-2">
                    {sugerencias.map(cat => (
                      <button key={cat} onClick={() => { const s = catalogoCompleto.find(p=>p.categoria===cat)?.seccion ?? ''; scrollToSection(s); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl text-sm font-heading font-bold text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                        <Search size={14} className="text-primary" />
                        <span>Ver <span className="text-white">{cat}</span></span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Filtros rápidos */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
              {FILTROS_RAPIDOS.map(f => (
                <button key={f.label} onClick={() => scrollToSection(f.id)}
                  className="shrink-0 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-white/60 text-[10px] font-heading font-black tracking-[0.15em] uppercase hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all whitespace-nowrap">
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTADOS DE BÚSQUEDA ────────────────────────── */}
      {isSearching && (
        <div className="bg-[#050505] border-b border-white/5 py-16">
          <div className="container mx-auto px-6 md:px-16">
            <p className="text-white/50 text-[11px] font-heading font-black tracking-[0.2em] uppercase mb-8">
              {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para{' '}
              "<span className="text-primary">{searchQuery}</span>"
            </p>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                <Search size={40} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/50 font-heading font-black text-xl mb-2">No encontramos ese producto</p>
                <p className="text-white/30 font-sans text-sm mb-6">Prueba con otro término o consúltanos directamente.</p>
                <a href={`https://wa.me/59175666702?text=${encodeURIComponent(`Hola! Busco: ${searchQuery}. ¿Tienen disponible?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-black font-heading font-black text-[11px] tracking-[0.15em] uppercase px-6 py-4 rounded-xl hover:bg-[#1ebe5d] transition-colors shadow-[0_4px_24px_rgba(37,211,102,0.3)]">
                  <FaWhatsapp size={16} /> Consultar disponibilidad
                </a>
              </div>
            ) : (
              Object.entries(
                filteredProducts.reduce<Record<string, typeof filteredProducts>>((acc, p) => {
                  (acc[p.categoria] ??= []).push(p); return acc;
                }, {})
              ).map(([cat, prods]) => (
                <div key={cat} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-primary text-[11px] font-heading font-black tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">{cat}</p>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/30 text-[10px] font-sans">{prods.length} resultado{prods.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {prods.map((prod, i) => (
                      <SearchResultCard key={prod.img + i} prod={prod} addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── SUPLEMENTACIÓN PROFESIONAL ───────────────────── */}
      <section id="proteinas" className="pt-6 pb-20 md:pb-28 bg-[#030303] scroll-mt-24 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-primary font-heading font-black text-[10px] tracking-[0.3em] uppercase mb-3 drop-shadow-[0_0_8px_var(--color-primary)]">
                  <span className="w-8 h-px bg-primary"></span> Suplementación Profesional
                </p>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-none tracking-tight">
                  PROTEÍNAS <span className="text-primary drop-shadow-[0_0_24px_rgba(220,38,38,0.4)]">& MÁS</span>
                </h2>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productos.map((prod, i) => (
              <motion.div key={`${prod.img}-${prod.nombre}-${i}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.5 }} className="h-full">
                <ProductCard img={prod.img} nombre={prod.nombre} precio={prod.precio} detalle={prod.detalle} badge={prod.badge}
                  onView={() => setModalProt(i)}
                  onAddToCart={() => addToCart({ img: prod.img, nombre: prod.nombre, precio: prod.precio, variante: '' }, 1)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SeccionProductos id="pre-entrenos" titulo="PRE" subtitulo="ENTRENOS" desc="Energía explosiva, foco mental y pump extremo. Las mejores marcas americanas." items={productosPreentrenos} categoria="Pre-Entrenos" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="ganador-de-peso" titulo="GANADOR" subtitulo="DE PESO" desc="Hipercalóricos y mass gainers para maximizar tu volumen." items={productosGanadorPeso} categoria="Ganador de Peso" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="creatina" titulo="CREA" subtitulo="TINA" desc="Creatina monohidratada y fórmulas avanzadas para potenciar fuerza, rendimiento y recuperación." items={productosCreatina} categoria="Creatina" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="aminoacidos" titulo="AMINO" subtitulo="ÁCIDOS" desc="BCAA, EAA y glutamina para una recuperación óptima." items={productosAminoacidos} categoria="Aminoácidos" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="quema-grasa" titulo="QUEMA" subtitulo="GRASA" desc="Termogénicos, fat burners y L-Carnitina para definición." items={productosQuemaGrasa} categoria="Quema Grasa" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="soleras" titulo="SOLE" subtitulo="RAS" desc="Entrena con estilo y representa tu marca." items={productosSoleras} categoria="Soleras" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="poleras" titulo="POLE" subtitulo="RAS" desc="Comodidad y estilo para dentro y fuera del gym." items={productosPoleras} categoria="Poleras" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="shorts" titulo="SHOR" subtitulo="TS" desc="Ligereza y estilo para cada entrenamiento." items={productosShorts} categoria="Shorts" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />
      <SeccionProductos id="gorras-medias" titulo="GORRAS" subtitulo="& MEDIAS" desc="El detalle que completa tu look." items={productosGorrasMedias} categoria="Gorras & Medias" addToCart={addToCart} onOpenCart={() => setCartOpen(true)} onOpenGift={openGiftModal} />

      {/* ── TRUST BADGES ──────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { icon: <MapPin />, titulo: 'En las sucursales', desc: 'Compra en las 7 sucursales Bolivia Fitness, antes o después de entrenar.' },
              { icon: <ShieldCheck />, titulo: '100% Originales', desc: 'Productos sellados, con registro sanitario y garantía de autenticidad.' },
            ].map((item, i) => (
              <motion.div key={item.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} 
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300">
                  {React.cloneElement(item.icon, { size: 32, className: "text-primary" })}
                </div>
                <h4 className="text-white font-heading font-black text-xl mb-3">{item.titulo}</h4>
                <p className="text-white/50 font-sans text-sm leading-relaxed max-w-[260px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARCAS MARQUEE ───────────────────────────────────────── */}
      <section className="py-16 overflow-hidden bg-[#030303] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-16 mb-8">
          <p className="text-primary font-heading font-black text-[10px] tracking-[0.3em] uppercase text-center drop-shadow-[0_0_8px_var(--color-primary)]">Trabajamos con la élite</p>
        </div>
        <div className="relative flex overflow-x-hidden w-full group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
          
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap min-w-max py-4 group-hover:[animation-play-state:paused]">
            {[...marcas, ...marcas, ...marcas].map((marca, i) => (
              <span key={i} className="inline-block bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-4 text-white/50 font-heading font-black text-xl md:text-2xl uppercase tracking-wider hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default">
                {marca}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0505] shadow-[0_0_80px_rgba(220,38,38,0.15)] p-10 md:p-20 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.2)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-primary text-[10px] font-heading font-black tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_8px_var(--color-primary)]">Sube de nivel</p>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-none mb-6">EL MEJOR EQUIPO <span className="text-primary drop-shadow-[0_0_20px_var(--color-primary)]">MERECE LO MEJOR</span></h2>
              <p className="text-white/60 font-sans text-lg md:text-xl leading-relaxed mb-10">Síguenos en Instagram para novedades y escríbenos por WhatsApp para armar tu stack perfecto.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/59175666702" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white font-heading font-black py-5 px-10 rounded-2xl hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] active:scale-95 transition-all duration-300 tracking-[0.15em] text-xs uppercase">
                  <FaWhatsapp size={22} /> Contáctanos
                </a>
                <a href="https://www.instagram.com/zonafitness_bolivia" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/20 text-white font-heading font-black py-5 px-10 rounded-2xl hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all duration-300 tracking-[0.15em] text-xs uppercase">
                  <FaInstagram size={22} /> Ver Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function SearchResultCard({ prod, addToCart, onOpenCart, onOpenGift }: {
  prod: Producto & { categoria: string };
  addToCart: (item: Omit<CartItem,'qty'>, qty: number) => void;
  onOpenCart: () => void;
  onOpenGift?: (item: Omit<CartItem,'qty'>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <ProductModal items={[prod]} index={0} categoria={prod.categoria}
            onClose={() => setOpen(false)} onPrev={() => {}} onNext={() => {}}
            addToCart={addToCart} onOpenCart={onOpenCart} onOpenGift={onOpenGift} />
        )}
      </AnimatePresence>
      <ProductCard img={prod.img} nombre={prod.nombre} precio={prod.precio}
        detalle={prod.variantes?.[0]?.detalle ?? prod.detalle} badge={prod.badge}
        onView={() => setOpen(true)}
        onAddToCart={() => addToCart({ img: prod.img, nombre: prod.nombre, precio: prod.precio, variante: prod.variantes?.[0]?.detalle ?? '' }, 1)} />
    </>
  );
}
