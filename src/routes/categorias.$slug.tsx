import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck, BatteryCharging } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, offersByCategory, getSeller, type Category } from "@/lib/mock-data";

export const Route = createFileRoute("/categorias/$slug")({
  loader: ({ params }) => {
    if (!(params.slug in CATEGORY_LABEL)) throw notFound();
    return { slug: params.slug as Category };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${CATEGORY_LABEL[(loaderData as { slug: Category }).slug]} — Mi Auto Sustentable` },
      { name: "description", content: `Oferta de ${CATEGORY_LABEL[(loaderData as { slug: Category }).slug]} en Chile.` },
      { property: "og:title", content: `${CATEGORY_LABEL[(loaderData as { slug: Category }).slug]} — Mi Auto Sustentable` },
    ],
  }) : { meta: [] },
  component: Category,
});

function Category() {
  const data = Route.useLoaderData() as { slug: import("@/lib/mock-data").Category };
  const slug = data.slug;
  const all = offersByCategory(slug);
  const [fVerificado, setVerificado] = useState(false);
  const [fGarantia, setGarantia] = useState(false);
  const [fBateria, setBateria] = useState(false);

  const list = useMemo(() => {
    return all
      .filter((o) => {
        if (fVerificado && !getSeller(o.sellerId)?.verificado) return false;
        if (fGarantia && !o.conGarantia) return false;
        if (fBateria && !o.bateriaCert) return false;
        return true;
      })
      // Orden por relevancia: verificados primero, luego destacados, NO por pago
      .sort((a, b) => {
        const av = getSeller(a.sellerId)?.verificado ? 1 : 0;
        const bv = getSeller(b.sellerId)?.verificado ? 1 : 0;
        if (bv !== av) return bv - av;
        return (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0);
      });
  }, [all, fVerificado, fGarantia, fBateria]);

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <Link to="/categorias" className="text-sm text-muted-foreground hover:text-foreground">← Categorías</Link>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{CATEGORY_LABEL[slug]}</h1>
        <p className="mt-2 text-muted-foreground">{list.length} de {all.length} {all.length === 1 ? "oferta" : "ofertas"} según tus filtros.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip active={fVerificado} onClick={() => setVerificado(!fVerificado)} icon={<ShieldCheck className="h-3.5 w-3.5" />}>Verificado</FilterChip>
          <FilterChip active={fGarantia} onClick={() => setGarantia(!fGarantia)}>Con garantía</FilterChip>
          <FilterChip active={fBateria} onClick={() => setBateria(!fBateria)} icon={<BatteryCharging className="h-3.5 w-3.5" />}>Batería certificada</FilterChip>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Orden por relevancia (verificados primero). Lo pagado va marcado &laquo;Publicidad&raquo;, no se disfraza de orgánico.
        </p>
        <div className="mt-8">
          {list.length === 0 ? (
            <EmptyState title="Sin oferta por ahora" description="Vuelve pronto, se publican unidades cada semana."
              action={<Button asChild variant="hero"><Link to="/oferta">Ver toda la oferta</Link></Button>} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function FilterChip({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
        active ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
