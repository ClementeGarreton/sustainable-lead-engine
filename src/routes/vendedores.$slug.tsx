import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { getSellerBySlug, offersBySeller, SELLER_LABEL } from "@/lib/mock-data";

export const Route = createFileRoute("/vendedores/$slug")({
  loader: ({ params }) => {
    const seller = getSellerBySlug(params.slug);
    if (!seller) throw notFound();
    return { seller, offers: offersBySeller(seller.id) };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.seller.name} — Mi Auto Sustentable` },
      { name: "description", content: loaderData.seller.about },
      { property: "og:title", content: loaderData.seller.name },
      { property: "og:description", content: loaderData.seller.about },
    ],
  }) : { meta: [] },
  component: SellerPage,
});

function SellerPage() {
  const { seller, offers } = Route.useLoaderData();
  return (
    <SiteShell>
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <Link to="/oferta" className="text-sm text-muted-foreground hover:text-foreground">← Volver</Link>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">{SELLER_LABEL[seller.type]}</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{seller.name}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{seller.about}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{seller.city}</span>
                <span className="inline-flex items-center gap-1 text-accent"><Star className="h-3.5 w-3.5 fill-current" />{seller.rating}</span>
                <span>{offers.length} ofertas publicadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Su oferta</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </section>
    </SiteShell>
  );
}
