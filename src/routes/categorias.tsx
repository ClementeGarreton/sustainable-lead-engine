import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { CATEGORY_LABEL, offersByCategory } from "@/lib/mock-data";

export const Route = createFileRoute("/categorias")({
  head: () => ({ meta: [
    { title: "Categorías — Mi Auto Sustentable" },
    { name: "description", content: "Navega la oferta agrupada por categoría: eléctricos, híbridos, mantenimiento EV, conversión y accesorios." },
  ]}),
  component: Categories,
});

function Categories() {
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Categorías</h1>
        <p className="mt-2 text-muted-foreground">Encuentra exactamente lo que buscas.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(CATEGORY_LABEL).map(([k, v]) => {
            const count = offersByCategory(k).length;
            return (
              <Link key={k} to="/categorias/$slug" params={{ slug: k }}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
                <h3 className="font-display text-xl font-semibold">{v}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{count} {count === 1 ? "oferta publicada" : "ofertas publicadas"}</p>
                <p className="mt-4 text-sm text-primary">Explorar →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
