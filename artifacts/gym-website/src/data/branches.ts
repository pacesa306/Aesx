export interface Branch {
  id: string;
  nombre: string;
  direccion: string;
  horario: string;
  mapsUrl: string;
  mapsQuery?: string;
  whatsapp: string;
  imagen?: string;
  imagenes?: string[];
}

export interface Ciudad {
  id: string;
  nombre: string;
  sucursales: Branch[];
}

export const ciudades: Ciudad[] = [
  {
    id: "santa-cruz",
    nombre: "Santa Cruz de la Sierra",
    sucursales: [
      {
        id: "sc-1",
        nombre: "Calle Ñuflo de Chávez",
        direccion: "Calle Ñuflo de Chávez, Santa Cruz de la Sierra",
        horario: "Lunes a viernes · 09:00–20:00 · Sábado · 09:00–16:00",
        mapsUrl: "https://maps.app.goo.gl/tMWfN9dWicJ97cfW6?g_st=ac",
        mapsQuery: "6R8G+3M8 Bolivia Fitness, Calle Ñuflo de Chávez #424, Santa Cruz de la Sierra, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/sc-1/entrada.webp",
        imagenes: [
          "/sucursales/sc-1/entrada.webp",
          "/sucursales/sc-1/exhibicion.webp",
          "/sucursales/sc-1/interior.webp",
          "/sucursales/sc-1/ropa.webp",
          "/sucursales/sc-1/productos.webp",
        ],
      },
      {
        id: "sc-fidalga",
        nombre: "Shopping Fidalga Piso 2",
        direccion: "Shopping Fidalga Piso 2, Santa Cruz de la Sierra",
        horario: "Lunes a viernes · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/P5jePoTwdEaEy5vM7",
        mapsQuery: "Shopping Fidalga, Santa Cruz de la Sierra, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/sc-fidalga/foto1.webp",
        imagenes: [
          "/sucursales/sc-fidalga/foto1.webp",
          "/sucursales/sc-fidalga/foto2.webp",
          "/sucursales/sc-fidalga/foto3.webp",
          "/sucursales/sc-fidalga/foto4.webp",
        ],
      },
      {
        id: "sc-cinecenter",
        nombre: "Cine Center Planta Baja",
        direccion: "Cine Center Planta Baja, Santa Cruz de la Sierra",
        horario: "Lunes a viernes · 10:00–22:00",
        mapsUrl: "https://share.google/Rcd459xrxyTKmwc6W",
        mapsQuery: "Cine Center Santa Cruz de la Sierra, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/sc-cinecenter/foto8.webp",
        imagenes: [
          "/sucursales/sc-cinecenter/foto8.webp",
          "/sucursales/sc-cinecenter/foto9.webp",
          "/sucursales/sc-cinecenter/foto10.webp",
          "/sucursales/sc-cinecenter/foto1.webp",
          "/sucursales/sc-cinecenter/foto2.webp",
          "/sucursales/sc-cinecenter/foto3.webp",
          "/sucursales/sc-cinecenter/foto4.webp",
          "/sucursales/sc-cinecenter/foto5.webp",
          "/sucursales/sc-cinecenter/foto6.webp",
          "/sucursales/sc-cinecenter/foto7.webp",
        ],
      },
      {
        id: "sc-ventura",
        nombre: "Ventura Mall",
        direccion: "Ventura Mall, Santa Cruz de la Sierra",
        horario: "Lunes a viernes · 10:00–22:00",
        mapsUrl: "https://share.google/v7tBa9uZ9RBM6JkbA",
        mapsQuery: "Ventura Mall, Santa Cruz de la Sierra, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/sc-ventura/foto1.webp",
        imagenes: [
          "/sucursales/sc-ventura/foto1.webp",
          "/sucursales/sc-ventura/foto2.webp",
          "/sucursales/sc-ventura/foto3.webp",
          "/sucursales/sc-ventura/foto4.webp",
          "/sucursales/sc-ventura/foto5.webp",
          "/sucursales/sc-ventura/foto6.webp",
          "/sucursales/sc-ventura/foto7.webp",
        ],
      },
    ],
  },
  {
    id: "cochabamba",
    nombre: "Cochabamba",
    sucursales: [
      {
        id: "cbba-paseo",
        nombre: "Mall Paseo Aranjuez Piso 2",
        direccion: "Mall Paseo Aranjuez Piso 2, Cochabamba",
        horario: "Lunes a sábado · 10:00–22:00 · Domingo · 11:00–21:00",
        mapsUrl: "https://maps.app.goo.gl/AsccqpxDipgcRprWA?g_st=ac",
        mapsQuery: "Mall Paseo Aranjuez, Cochabamba, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/cbba-paseo/foto1.webp",
        imagenes: [
          "/sucursales/cbba-paseo/foto1.webp",
          "/sucursales/cbba-paseo/foto2.webp",
          "/sucursales/cbba-paseo/foto3.webp",
        ],
      },
      {
        id: "cbba-safer",
        nombre: "Torres Safer",
        direccion: "Torres Safer, Cochabamba",
        horario: "Lunes a viernes · 09:00–19:00",
        mapsUrl: "https://share.google/v7tBa9uZ9RBM6JkbA",
        mapsQuery: "Torres Safer, Cochabamba, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/cbba-safer/foto1.webp",
        imagenes: [
          "/sucursales/cbba-safer/foto1.webp",
          "/sucursales/cbba-safer/foto2.webp",
          "/sucursales/cbba-safer/foto3.webp",
        ],
      },
      {
        id: "cbba-quillacollo",
        nombre: "Cine Center · Quillacollo",
        direccion: "Cine Center Quillacollo, Cochabamba",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/YSxk8xU2h4ASzF1Q7?g_st=ac",
        mapsQuery: "Cine Center Quillacollo, Cochabamba, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/cbba-quillacollo/foto1.webp",
        imagenes: [
          "/sucursales/cbba-quillacollo/foto1.webp",
          "/sucursales/cbba-quillacollo/foto2.webp",
          "/sucursales/cbba-quillacollo/foto3.webp",
          "/sucursales/cbba-quillacollo/foto4.webp",
          "/sucursales/cbba-quillacollo/foto5.webp",
        ],
      },
    ],
  },
  {
    id: "la-paz",
    nombre: "La Paz",
    sucursales: [
      {
        id: "lpz-torres-mall",
        nombre: "Centro Torres Mall · Sub Suelo",
        direccion: "Centro Torres Mall, Sub Suelo, La Paz",
        horario: "Lunes a viernes · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/hXVTgNSxwZUN4QJT8?g_st=ac",
        mapsQuery: "Centro Torres Mall La Paz Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/lpz-torres-mall/foto1.webp",
        imagenes: [
          "/sucursales/lpz-torres-mall/foto1.webp",
          "/sucursales/lpz-torres-mall/foto2.webp",
          "/sucursales/lpz-torres-mall/foto3.webp",
          "/sucursales/lpz-torres-mall/foto4.webp",
        ],
      },
      {
        id: "lpz-megacenter",
        nombre: "Zona Sur Megacenter",
        direccion: "Megacenter Zona Sur, La Paz",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/GdFuU9Zxntn4wbnm6?g_st=ac",
        mapsQuery: "Megacenter Zona Sur La Paz, Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/lpz-megacenter/foto1.webp",
        imagenes: [
          "/sucursales/lpz-megacenter/foto1.webp",
          "/sucursales/lpz-megacenter/foto2.webp",
          "/sucursales/lpz-megacenter/foto3.webp",
        ],
      },
      {
        id: "lpz-safer",
        nombre: "Torres Safer",
        direccion: "Torres Safer, La Paz",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/FqCkWHKU3qzp2GWy5?g_st=ac",
        mapsQuery: "Torres Safer La Paz Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/lpz-safer/foto1.webp",
        imagenes: [
          "/sucursales/lpz-safer/foto1.webp",
          "/sucursales/lpz-safer/foto2.webp",
          "/sucursales/lpz-safer/foto3.webp",
        ],
      },
      {
        id: "lpz-4",
        nombre: "Zona Sur · Plaza 21 Mall",
        direccion: "Plaza 21 Mall, Zona Sur, La Paz",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/MJfcYqukPVDNzFes7?g_st=ac",
        mapsQuery: "Bolivia Fitness La Paz Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/lpz-4/foto1.webp",
        imagenes: [
          "/sucursales/lpz-4/foto1.webp",
          "/sucursales/lpz-4/foto2.webp",
          "/sucursales/lpz-4/foto3.webp",
          "/sucursales/lpz-4/foto4.webp",
          "/sucursales/lpz-4/foto5.webp",
        ],
      },
    ],
  },
  {
    id: "el-alto",
    nombre: "El Alto",
    sucursales: [
      {
        id: "alto-cinebol",
        nombre: "Ciudad Satélite · Cinebol Piso 3",
        direccion: "Cinebol Piso 3, Ciudad Satélite, El Alto",
        horario: "Lunes a sábado · 10:00–14:00 · Domingos · 14:00–20:00",
        mapsUrl: "https://maps.app.goo.gl/8HpBCwSDnd52UsdHA?g_st=ac",
        mapsQuery: "Cinebol Ciudad Satélite El Alto Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/alto-cinebol/foto1.webp",
        imagenes: [
          "/sucursales/alto-cinebol/foto1.webp",
          "/sucursales/alto-cinebol/foto2.webp",
          "/sucursales/alto-cinebol/foto3.webp",
        ],
      },
      {
        id: "alto-rioseco",
        nombre: "Río Seco · Multicine Planta Baja",
        direccion: "Multicine Planta Baja, Río Seco, El Alto",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/3jGHezVz6t5seyn16?g_st=ac",
        mapsQuery: "Multicine Río Seco El Alto Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/alto-rioseco/foto1.webp",
        imagenes: [
          "/sucursales/alto-rioseco/foto1.webp",
          "/sucursales/alto-rioseco/foto2.webp",
          "/sucursales/alto-rioseco/foto3.webp",
        ],
      },
    ],
  },
  {
    id: "oruro",
    nombre: "Oruro",
    sucursales: [
      {
        id: "oru-platinum",
        nombre: "Edificio Platinum",
        direccion: "Edificio Platinum, Oruro",
        horario: "Lunes a sábado · 10:00–13:30 · 14:00–21:00",
        mapsUrl: "https://maps.app.goo.gl/wFQDh63Zcbw3kHrCA?g_st=ac",
        mapsQuery: "Edificio Platinum Oruro Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/oru-platinum/foto1.webp",
        imagenes: [
          "/sucursales/oru-platinum/foto1.webp",
          "/sucursales/oru-platinum/foto2.webp",
          "/sucursales/oru-platinum/foto3.webp",
        ],
      },
    ],
  },
  {
    id: "sucre",
    nombre: "Sucre",
    sucursales: [
      {
        id: "suc-libertad",
        nombre: "Multicentro Libertad",
        direccion: "Multicentro Libertad, Sucre",
        horario: "Lunes a domingo · 10:00–22:00",
        mapsUrl: "https://maps.app.goo.gl/LtuUMev7Brh5vZnF6",
        mapsQuery: "Multicentro Libertad Sucre Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/suc-libertad/foto1.webp",
        imagenes: [
          "/sucursales/suc-libertad/foto1.webp",
          "/sucursales/suc-libertad/foto2.webp",
          "/sucursales/suc-libertad/foto3.webp",
        ],
      },
    ],
  },
  {
    id: "tarija",
    nombre: "Tarija",
    sucursales: [
      {
        id: "tar-15abril",
        nombre: "Av. 15 de Abril",
        direccion: "Avenida 15 de Abril, Tarija",
        horario: "Lunes a sábado · 09:00–13:30 · 15:00–21:00",
        mapsUrl: "https://maps.app.goo.gl/17bWLrVspFAHeowy5?g_st=ac",
        mapsQuery: "Bolivia Fitness Avenida 15 de Abril Tarija Bolivia",
        whatsapp: "59175666702",
        imagen: "/sucursales/tar-15abril/foto1.webp",
        imagenes: [
          "/sucursales/tar-15abril/foto1.webp",
          "/sucursales/tar-15abril/foto2.webp",
          "/sucursales/tar-15abril/foto3.webp",
          "/sucursales/tar-15abril/foto4.webp",
        ],
      },
    ],
  },
];

// Flat list for backwards compat
export const branches: Branch[] = ciudades.flatMap(c => c.sucursales);
