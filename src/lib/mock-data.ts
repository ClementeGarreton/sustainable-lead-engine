import suv from "@/assets/offer-suv.jpg";
import sedan from "@/assets/offer-sedan.jpg";
import mechanic from "@/assets/offer-mechanic.jpg";
import conversion from "@/assets/offer-conversion.jpg";

export type SellerType = "concesionario" | "vendedor" | "mecanico" | "conversion";

export const SELLER_LABEL: Record<SellerType, string> = {
  concesionario: "Concesionario",
  vendedor: "Vendedor independiente",
  mecanico: "Mecánico EV",
  conversion: "Conversión a híbrido",
};

export type Category =
  | "autos-electricos"
  | "autos-hibridos"
  | "mantenimiento"
  | "conversion"
  | "accesorios"
  | "medico-bateria"
  | "instalacion-domiciliaria";

export const CATEGORY_LABEL: Record<Category, string> = {
  "autos-electricos": "Autos eléctricos",
  "autos-hibridos": "Autos híbridos",
  mantenimiento: "Mantenimiento EV",
  conversion: "Conversión a híbrido",
  accesorios: "Cargadores y accesorios",
  "medico-bateria": "Médico de batería",
  "instalacion-domiciliaria": "Instalación domiciliaria",
};

export interface Seller {
  id: string;
  slug: string;
  name: string;
  type: SellerType;
  city: string;
  rating: number;
  avatar: string;
  about: string;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  hook: string; // dato de gancho visible
  hidden: string; // contenido oculto detras del muro
  price: number; // CLP
  image: string;
  category: Category;
  sellerId: string;
  city: string;
  createdAt: string;
  views: number;
  unlocks: number;
  featured?: boolean; // marca "Oferta destacada" honesta
  seals?: Array<"bateria-certificada" | "garantia" | "historial" | "concesionario">;
}

export const SELLERS: Seller[] = [
  {
    id: "s1",
    slug: "evplus-santiago",
    name: "EV+ Santiago",
    type: "concesionario",
    city: "Santiago",
    rating: 4.8,
    avatar: "",
    about: "Concesionario multimarca con stock de autos 100% eléctricos importados directos.",
  },
  {
    id: "s2",
    slug: "carla-vendedora",
    name: "Carla Soto",
    type: "vendedor",
    city: "Viña del Mar",
    rating: 4.6,
    avatar: "",
    about: "Vendedora afiliada con stock de SUV eléctricos seminuevos verificados.",
  },
  {
    id: "s3",
    slug: "taller-voltio",
    name: "Taller Voltio",
    type: "mecanico",
    city: "Providencia",
    rating: 4.9,
    avatar: "",
    about: "Mecánica especializada en baterías de litio y diagnóstico eléctrico.",
  },
  {
    id: "s4",
    slug: "hibridate-cl",
    name: "Hibrídate Chile",
    type: "conversion",
    city: "Concepción",
    rating: 4.7,
    avatar: "",
    about: "Conversión de autos a tracción híbrida con kits homologados.",
  },
];

export const OFFERS: Offer[] = [
  {
    id: "o1",
    slug: "suv-electrico-2024-autonomia-larga",
    title: "SUV eléctrico 2024 con autonomía extendida",
    hook: "Hasta 510 km de autonomía real, listo para entrega esta semana.",
    hidden:
      "Modelo BYD Atto 3 Extended Range 2024, 0 km, color blanco perla. Garantía oficial 8 años de batería. Financiamiento 0% a 24 meses disponible. Precio de cierre con bono de chatarrización incluido.",
    price: 28990000,
    image: suv,
    category: "autos-electricos",
    sellerId: "s1",
    city: "Santiago",
    createdAt: "2025-06-12",
    views: 1240,
    unlocks: 88,
    featured: true,
    seals: ["concesionario", "garantia", "historial"],
  },
  {
    id: "o2",
    slug: "sedan-deportivo-electrico-rojo",
    title: "Sedán deportivo eléctrico rojo, único disponible",
    hook: "0 a 100 en 3,9 s. Última unidad en showroom.",
    hidden:
      "Tesla Model 3 Performance 2023, 12.000 km, Full Self-Driving incluido. Traspaso y revisión técnica al día. Aceptamos parte de pago.",
    price: 41500000,
    image: sedan,
    category: "autos-electricos",
    sellerId: "s2",
    city: "Viña del Mar",
    createdAt: "2025-06-18",
    views: 980,
    unlocks: 64,
    seals: ["bateria-certificada", "historial"],
  },
  {
    id: "o3",
    slug: "revision-bateria-litio-completa",
    title: "Revisión completa de batería de litio",
    hook: "Diagnóstico de 120 puntos con informe firmado.",
    hidden:
      "Servicio realizado por ingeniero certificado SEC. Incluye prueba de capacidad, BMS, balanceo y reporte PDF. Atención a Tesla, BYD, MG, Volvo y Renault.",
    price: 149000,
    image: mechanic,
    category: "mantenimiento",
    sellerId: "s3",
    city: "Providencia",
    createdAt: "2025-06-20",
    views: 612,
    unlocks: 41,
  },
  {
    id: "o4",
    slug: "conversion-hibrido-citadino",
    title: "Convierte tu auto en híbrido citadino",
    hook: "Ahorra hasta 45% en combustible. Kit homologado.",
    hidden:
      "Conversión con kit eléctrico auxiliar para uso urbano, instalación en 5 días hábiles. Garantía 24 meses. Aplicable a la mayoría de autos 1.6 a 2.0L.",
    price: 3200000,
    image: conversion,
    category: "conversion",
    sellerId: "s4",
    city: "Concepción",
    createdAt: "2025-06-08",
    views: 1810,
    unlocks: 120,
  },
  {
    id: "o5",
    slug: "cargador-domiciliario-7kw",
    title: "Cargador domiciliario 7 kW con instalación",
    hook: "Instalación profesional incluida en Región Metropolitana.",
    hidden:
      "Wallbox Pulsar Plus 7 kW, conector tipo 2, control desde app, certificación SEC. Mantención gratis primer año.",
    price: 890000,
    image: mechanic,
    category: "accesorios",
    sellerId: "s3",
    city: "Santiago",
    createdAt: "2025-06-15",
    views: 410,
    unlocks: 22,
  },
  {
    id: "o6",
    slug: "suv-hibrido-familiar",
    title: "SUV híbrido familiar, máxima eficiencia",
    hook: "22 km/L mixtos. 7 pasajeros.",
    hidden:
      "Toyota Highlander Hybrid 2024, traccion AWD, sistema THS-II. Stock para entrega inmediata. Financiamiento bancario preaprobado.",
    price: 35900000,
    image: suv,
    category: "autos-hibridos",
    sellerId: "s1",
    city: "Santiago",
    createdAt: "2025-06-19",
    views: 720,
    unlocks: 53,
    featured: true,
    seals: ["concesionario", "garantia"],
  },
];

OFFERS.push(
  {
    id: "o7",
    slug: "diagnostico-soh-bateria-usado",
    title: "Médico de batería: diagnóstico SoH para auto usado",
    hook: "Antes de comprar, sabe cuánta vida útil le queda a la batería.",
    hidden:
      "Informe SoH con prueba de capacidad, lectura BMS, balanceo y peritaje firmado por ingeniero certificado SEC. Recomendaciones de compra/no compra con respaldo técnico.",
    price: 89000,
    image: mechanic,
    category: "medico-bateria",
    sellerId: "s3",
    city: "Providencia",
    createdAt: "2025-06-22",
    views: 530,
    unlocks: 38,
    seals: ["bateria-certificada"],
  },
  {
    id: "o8",
    slug: "instalacion-wallbox-domiciliario",
    title: "Instalación domiciliaria de cargador wallbox (SEC)",
    hook: "Cargador 7 kW + instalación certificada en Región Metropolitana.",
    hidden:
      "Visita técnica, materiales, conexión al tablero y declaración TE-1 incluidos. Garantía 24 meses. Coordinación con tu administradora si vives en edificio.",
    price: 1190000,
    image: conversion,
    category: "instalacion-domiciliaria",
    sellerId: "s3",
    city: "Santiago",
    createdAt: "2025-06-21",
    views: 470,
    unlocks: 31,
    seals: ["garantia"],
  },
);

export const SEAL_LABEL: Record<NonNullable<Offer["seals"]>[number], string> = {
  "bateria-certificada": "Batería certificada",
  garantia: "Con garantía",
  historial: "Historial disponible",
  concesionario: "Concesionario",
};

export function getOffer(slug: string) {
  return OFFERS.find((o) => o.slug === slug);
}
export function getSeller(id: string) {
  return SELLERS.find((s) => s.id === id);
}
export function getSellerBySlug(slug: string) {
  return SELLERS.find((s) => s.slug === slug);
}
export function offersBySeller(id: string) {
  return OFFERS.filter((o) => o.sellerId === id);
}
export function offersByCategory(cat: string) {
  return OFFERS.filter((o) => o.category === cat);
}

export const PLANS = [
  {
    id: "starter",
    name: "Despegue",
    monthly: 39000,
    leads: 15,
    extra: 3500,
    reach: "Alcance local en Instagram",
    features: [
      "Publicaciones ilimitadas",
      "15 leads incluidos / mes",
      "$3.500 por lead extra",
      "Panel de bandeja con datos completos",
    ],
  },
  {
    id: "pro",
    name: "Acelera",
    monthly: 89000,
    leads: 50,
    extra: 2500,
    reach: "Alcance nacional en Instagram + TikTok",
    features: [
      "Todo Despegue",
      "50 leads incluidos / mes",
      "$2.500 por lead extra",
      "Perfil destacado en categorías",
      "Notificación instantánea por correo",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Tracción Total",
    monthly: 189000,
    leads: 150,
    extra: 1800,
    reach: "Alcance nacional + Google Ads",
    features: [
      "Todo Acelera",
      "150 leads incluidos / mes",
      "$1.800 por lead extra",
      "Asesoría 1:1 mensual",
      "API de integración a CRM",
    ],
  },
];

export function formatCLP(n: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
}
