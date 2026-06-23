import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { OFFERS, SELLERS, CATEGORY_LABEL } from "@/lib/mock-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0" },
          { path: "/oferta", priority: "0.9" },
          { path: "/categorias", priority: "0.8" },
          { path: "/buscar", priority: "0.6" },
          { path: "/precios", priority: "0.8" },
          { path: "/sobre-nosotros", priority: "0.6" },
          { path: "/contacto", priority: "0.6" },
          { path: "/faq", priority: "0.6" },
          { path: "/soporte", priority: "0.5" },
          { path: "/terminos", priority: "0.4" },
          { path: "/privacidad", priority: "0.4" },
          { path: "/cookies", priority: "0.4" },
          ...Object.keys(CATEGORY_LABEL).map((k) => ({ path: `/categorias/${k}`, priority: "0.7" })),
          ...OFFERS.map((o) => ({ path: `/oferta/${o.slug}`, priority: "0.7" })),
          ...SELLERS.map((s) => ({ path: `/vendedores/${s.slug}`, priority: "0.6" })),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc><priority>${e.priority}</priority></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
