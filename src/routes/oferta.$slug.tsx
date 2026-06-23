import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, Lock, MapPin, Phone, Mail, MessageCircle, Eye, Sparkles, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { CaptureModal } from "@/components/site/CaptureModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOffer, getSeller, OFFERS, SELLER_LABEL, CATEGORY_LABEL, formatCLP } from "@/lib/mock-data";
import { isUnlocked, getContact } from "@/lib/capture-store";

export const Route = createFileRoute("/oferta/$slug")({
  loader: ({ params }) => {
    const offer = getOffer(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${(loaderData as { offer: import("@/lib/mock-data").Offer }).offer.title} — Mi Auto Sustentable` },
      { name: "description", content: (loaderData as { offer: import("@/lib/mock-data").Offer }).offer.hook },
      { property: "og:title", content: (loaderData as { offer: import("@/lib/mock-data").Offer }).offer.title },
      { property: "og:description", content: (loaderData as { offer: import("@/lib/mock-data").Offer }).offer.hook },
      { property: "og:image", content: (loaderData as { offer: import("@/lib/mock-data").Offer }).offer.image },
    ],
  }) : { meta: [] },
  component: OfferDetail,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Oferta no encontrada</h1>
        <p className="mt-2 text-muted-foreground">Esta publicación puede haber sido pausada o eliminada.</p>
        <Button asChild variant="hero" className="mt-6"><Link to="/oferta">Ver oferta disponible</Link></Button>
      </div>
    </SiteShell>
  ),
});

function OfferDetail() {
  const data = Route.useLoaderData() as { offer: import("@/lib/mock-data").Offer };
  const offer = data.offer;
  const seller = getSeller(offer.sellerId)!;
  const related = OFFERS.filter((o) => o.id !== offer.id && o.category === offer.category).slice(0, 3);
  const [open, setOpen] = useState(false);
  const [_, force] = useState(0);
  const unlocked = isUnlocked(offer.id);
  const contact = getContact();

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-8">
        <Link to="/oferta" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la oferta
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img src={offer.image} alt={offer.title} width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-primary/40 text-primary">{CATEGORY_LABEL[offer.category]}</Badge>
              <Badge variant="outline">{SELLER_LABEL[seller.type]}</Badge>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{offer.city}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{offer.createdAt}</span>
              <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{offer.views} vistas</span>
            </div>
          </div>

          <aside className="space-y-4">
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl">{offer.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{offer.hook}</p>
            </div>

            {!unlocked ? (
              <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card p-6 shadow-glow">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Contenido bloqueado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Desbloquea precio de cierre, datos de contacto del vendedor y detalles de la oferta dejándonos tu correo y WhatsApp.
                  </p>
                  <Button onClick={() => setOpen(true)} variant="hero" size="lg" className="w-full animate-pulse-glow">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Desbloquear gratis
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    1 oferta cualquiera desbloquea todas en esta sesión.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 rounded-2xl border border-primary/40 bg-card p-6 shadow-glow">
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Desbloqueado</span>
                </div>
                <p className="font-display text-4xl font-bold text-gradient">{formatCLP(offer.price)}</p>
                <div className="space-y-2 rounded-xl bg-background/40 p-4 text-sm">
                  <p className="font-semibold">{seller.name}</p>
                  <p className="text-muted-foreground">{seller.about}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <Button variant="hero" size="sm" asChild><a href={`https://wa.me/56912345678?text=Hola, vi tu oferta "${offer.title}" en Mi Auto Sustentable.`}><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
                  <Button variant="outline" size="sm" asChild><a href="tel:+56912345678"><Phone className="h-4 w-4" />Llamar</a></Button>
                  <Button variant="outline" size="sm" asChild><a href={`mailto:vendedor@mas.cl`}><Mail className="h-4 w-4" />Correo</a></Button>
                </div>
                <p className="text-xs text-muted-foreground">Detalle: {offer.hidden}</p>
                {contact && <p className="text-[11px] text-muted-foreground">Tus datos quedaron asociados a este lead: <strong>{contact.name}</strong> · {contact.email}</p>}
              </div>
            )}

            <Link to="/vendedores/$slug" params={{ slug: seller.slug }}
              className="block rounded-2xl border border-border bg-card p-4 text-sm hover:border-primary/40">
              <p className="text-xs text-muted-foreground">Publicado por</p>
              <p className="font-display font-semibold">{seller.name}</p>
              <p className="text-xs text-muted-foreground">{SELLER_LABEL[seller.type]} · {seller.city} · ⭐ {seller.rating}</p>
            </Link>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 font-display text-2xl font-bold">Oferta relacionada</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </section>
        )}
      </div>

      <CaptureModal
        open={open}
        onOpenChange={setOpen}
        offerId={offer.id}
        offerTitle={offer.title}
        onUnlocked={() => force((n) => n + 1)}
      />
    </SiteShell>
  );
}
