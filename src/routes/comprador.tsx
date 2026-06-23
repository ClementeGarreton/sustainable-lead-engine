import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { OFFERS } from "@/lib/mock-data";
import { getUnlocked, getContact } from "@/lib/capture-store";

export const Route = createFileRoute("/comprador")({
  head: () => ({ meta: [{ title: "Mi panel — Comprador — Mi Auto Sustentable" }]}),
  component: Buyer,
});

function Buyer() {
  const [ids, setIds] = useState<string[]>([]);
  const [contact, setContact] = useState<ReturnType<typeof getContact>>(null);
  useEffect(() => { setIds(getUnlocked()); setContact(getContact()); }, []);
  const list = OFFERS.filter((o) => ids.includes(o.id));

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold">Hola{contact?.name ? `, ${contact.name.split(" ")[0]}` : ""} 👋</h1>
        <p className="mt-2 text-muted-foreground">Aquí queda guardada la oferta que has desbloqueado.</p>
        <h2 className="mt-10 mb-4 font-display text-xl font-semibold">Oferta desbloqueada</h2>
        {list.length === 0 ? (
          <EmptyState title="Aún no desbloqueas ofertas" description="Ingresa al listado y elige una oferta que te interese."
            action={<Button asChild variant="hero"><Link to="/oferta">Ver oferta</Link></Button>} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((o) => <OfferCard key={o.id} offer={o} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
