export interface ProductoDestacado {
  img: string;
  nombre: string;
  precio: string;
  detalle: string;
  categoria: string;
  badge?: 'Más vendido' | 'Nuevo';
}

export const PRODUCTOS_DESTACADOS: ProductoDestacado[] = [
  // Proteínas
  { img: '/proteinas/whey-phorm-dragon-rainbow.webp', nombre: '100% Whey Protein Scitec', precio: 'Consultar', detalle: 'Proteína Whey',     categoria: 'Proteína',    badge: 'Más vendido' },
  { img: '/proteinas/iso-phorm-dragon.webp',           nombre: 'Whey Isolate Scitec',      precio: 'Consultar', detalle: 'Proteína Isolada',  categoria: 'Proteína',    badge: 'Más vendido' },
  { img: '/proteinas/whey-prosupps.webp',              nombre: 'Isojet Evogen',            precio: 'Consultar', detalle: 'Ultra-Pure Isolate',categoria: 'Proteína' },
  // Quema grasa
  { img: '/quema-grasa/black-viper-dragon.webp',  nombre: 'Thermo Cuts Nutrex', precio: '360Bs', detalle: '120 Caps',  categoria: 'Quema Grasa', badge: 'Más vendido' },
  { img: '/quema-grasa/black-viper-dragon.webp', nombre: 'Lipo6 Black Ultra',  precio: '290Bs', detalle: '60 Cáps',  categoria: 'Quema Grasa', badge: 'Más vendido' },
  // Creatina / Aminoácidos
  { img: '/creatina/creatina-dragon-grape.webp',        nombre: 'Creatina Nutrex',       precio: '350Bs', detalle: '300gr',            categoria: 'Creatina',    badge: 'Más vendido' },
  { img: '/aminoacidos/glutamine-fermented-dragon.webp', nombre: 'Glutamina Pure Nutrex', precio: '300Bs', detalle: '300gr · 60 Serv.', categoria: 'Aminoácidos', badge: 'Más vendido' },
  { img: '/creatina/creatina-dragon-monohydrate.webp',   nombre: 'Creatina Dragon Pharma',precio: '400Bs', detalle: '300gr',            categoria: 'Creatina' },
  // Ganador de peso
  { img: '/proteinas/mass-phorm-dragon.webp', nombre: 'NitroHard', precio: '550Bs', detalle: '900gr', categoria: 'Ganador de Masa', badge: 'Más vendido' },
  // Ropa
  { img: '/promos/crew-polera.webp',   nombre: 'Polera Oversize Bolivia Fitness', precio: '200Bs', detalle: 'Azul / Negro',  categoria: 'Ropa', badge: 'Más vendido' },
  { img: '/promos/crew-polera.webp',   nombre: 'Short Hombre Bolivia Fitness',    precio: '150Bs', detalle: 'Oliva / Gris',  categoria: 'Ropa', badge: 'Más vendido' },
  { img: '/promos/crew-polera.webp',   nombre: 'Solera Bolivia Fitness',          precio: '180Bs', detalle: 'Negro',          categoria: 'Ropa', badge: 'Más vendido' },
  // Accesorios
  { img: '/promos/crew-gorra.webp',                    nombre: 'Gorra Dragon Pharma',   precio: '50Bs', detalle: 'Camel / Negro', categoria: 'Accesorio', badge: 'Más vendido' },
  { img: '/promos/crew-shaker.webp',                 nombre: 'Shaker Crew',           precio: '45Bs', detalle: 'Rojo / Negro',  categoria: 'Accesorio' },
];
