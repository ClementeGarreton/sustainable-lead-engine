import { Link } from "@tanstack/react-router";
import { Lock, MapPin, ShieldCheck } from "lucide-react";
import type { Offer } from "@/lib/mock-data";
import { CATEGORY_LABEL, SELLER_LABEL, SEAL_LABEL, getSeller } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function OfferCard({ offer }: { offer: Offer }) {
  const seller = getSeller(offer.sellerId);
  return (
    <Link
      to="/oferta/$slug"
      params={{ slug: offer.slug }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur">{CATEGORY_LABEL[offer.category]}</Badge>
        {seller && (
          <Badge variant="outline" className="absolute right-3 top-3 border-primary/40 bg-background/80 text-primary backdrop-blur">
            {SELLER_LABEL[seller.type]}
          </Badge>
        )}
        {offer.featured && (
          <Badge className="absolute bottom-3 left-3 bg-amber-500/95 text-black tracking-wide uppercase text-[10px] font-bold">
            Oferta destacada · Publicidad
          </Badge>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 font-display text-lg font-semibold leading-tight">{offer.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{offer.hook}</p>
        {offer.seals && offer.seals.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {offer.seals.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                <ShieldCheck className="h-3 w-3" /> {SEAL_LABEL[s]}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {offer.city}
          </span>
          <span className="inline-flex items-center gap-1 text-primary">
            <Lock className="h-3.5 w-3.5" /> Ver precio
          </span>
        </div>
      </div>
    </Link>
  );
}
