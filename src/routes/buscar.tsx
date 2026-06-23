import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Input } from "@/components/ui/input";
import { OFFERS } from "@/lib/mock-data";

export const Route = createFileRoute("/buscar")({
  head: () => ({ meta: [{ title: "Búsqueda — Mi Auto Sustentable" }, { name: "description", content: "Busca autos eléctricos, híbridos y servicios EV." }]}),
  component: Buscar,
});

function Buscar() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"recientes" | "baratos" | "caros">("recientes");
  let results = OFFERS.filter((o) => (o.title + " " + o.hook + " " + o.city).toLowerCase().includes(q.toLowerCase()));
  if (sort === "baratos") results = [...results].sort((a, b) => a.price - b.price);
  if (sort === "caros") results = [...results].sort((a, b) => b.price - a.price);

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold">Búsqueda</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tesla, BYD, Santiago, conversión..." className="pl-9" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="recientes">Más recientes</option>
            <option value="baratos">Precio menor</option>
            <option value="caros">Precio mayor</option>
          </select>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{results.length} resultado(s)</p>
        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState title="Sin coincidencias" description="Prueba con otra palabra clave." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
