import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, offersByCategory, type Category } from "@/lib/mock-data";

export const Route = createFileRoute("/categorias/$slug")({
  loader: ({ params }) => {
    if (!(params.slug in CATEGORY_LABEL)) throw notFound();
    return { slug: params.slug as Category };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${CATEGORY_LABEL[loaderData.slug]} — Mi Auto Sustentable` },
      { name: "description", content: `Oferta de ${CATEGORY_LABEL[loaderData.slug]} en Chile.` },
      { property: "og:title", content: `${CATEGORY_LABEL[loaderData.slug]} — Mi Auto Sustentable` },
    ],
  }) : { meta: [] },
  component: Category,
});

function Category() {
  const { slug } = Route.useLoaderData();
  const list = offersByCategory(slug);
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <Link to="/categorias" className="text-sm text-muted-foreground hover:text-foreground">← Categorías</Link>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{CATEGORY_LABEL[slug]}</h1>
        <p className="mt-2 text-muted-foreground">{list.length} {list.length === 1 ? "oferta" : "ofertas"} disponible(s).</p>
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
