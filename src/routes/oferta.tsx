import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OFFERS, SELLER_LABEL, CATEGORY_LABEL, getSeller, type SellerType, type Category } from "@/lib/mock-data";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Oferta de electromovilidad en Chile — Mi Auto Sustentable" },
      { name: "description", content: "Explora autos eléctricos, híbridos, servicios EV y conversiones publicados en Mi Auto Sustentable." },
      { property: "og:title", content: "Oferta — Mi Auto Sustentable" },
      { property: "og:description", content: "Cataloga eléctrico, híbrido, taller EV y conversión en un solo portal." },
    ],
  }),
  component: OfferList,
});

function OfferList() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<SellerType | "todos">("todos");
  const [cat, setCat] = useState<Category | "todos">("todos");

  const items = useMemo(() =>
    OFFERS.filter((o) => {
      const seller = getSeller(o.sellerId);
      if (type !== "todos" && seller?.type !== type) return false;
      if (cat !== "todos" && o.category !== cat) return false;
      if (q && !(o.title + o.hook).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }),
  [q, type, cat]);

  return (
    <SiteShell>
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Toda la oferta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Filtra por tipo de vendedor y categoría. Toca una oferta para desbloquear precio y contacto.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar oferta..." className="pl-9" />
            </div>
            <Select value={type} onChange={(v) => setType(v as SellerType | "todos")} options={[["todos", "Todos los vendedores"], ...Object.entries(SELLER_LABEL)] as [string, string][]} />
            <Select value={cat} onChange={(v) => setCat(v as Category | "todos")} options={[["todos", "Todas las categorías"], ...Object.entries(CATEGORY_LABEL)] as [string, string][]} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {items.length === 0 ? (
          <EmptyState
            title="Sin resultados"
            description="Prueba ajustar los filtros o limpiar la búsqueda."
            action={<Button onClick={() => { setQ(""); setType("todos"); setCat("todos"); }} variant="outline">Limpiar filtros</Button>}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((o) => <OfferCard key={o.id} offer={o} />)}
          </div>
        )}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          ¿Buscas algo específico? <Link to="/buscar" className="text-primary hover:underline">Búsqueda avanzada</Link>
        </p>
      </section>
    </SiteShell>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
    >
      {options.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
    </select>
  );
}
