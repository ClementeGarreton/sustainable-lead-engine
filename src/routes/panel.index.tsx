import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Inbox, Eye, Sparkles } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { OFFERS, formatCLP } from "@/lib/mock-data";

export const Route = createFileRoute("/panel/")({
  component: PanelHome,
});

function PanelHome() {
  const myOffers = OFFERS.slice(0, 3);
  const stats = [
    { i: Inbox, l: "Leads del mes", v: "27", trend: "+12%" },
    { i: TrendingUp, l: "Tasa de desbloqueo", v: "7.1%", trend: "+0.4 pp" },
    { i: Eye, l: "Vistas totales", v: "1.840", trend: "+18%" },
    { i: Sparkles, l: "Plan activo", v: "Acelera", trend: "23/50 leads" },
  ];
  return (
    <PanelShell title="Resumen" subtitle="Bienvenido de vuelta, EV+ Santiago">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
            <s.i className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs text-muted-foreground">{s.l}</p>
            <p className="font-display text-2xl font-bold">{s.v}</p>
            <p className="text-xs text-primary">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-semibold">Tu oferta más activa</h3>
            <Button asChild size="sm" variant="ghost"><Link to="/panel/oferta">Ver toda</Link></Button>
          </div>
          <div className="divide-y divide-border">
            {myOffers.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img src={o.image} alt="" width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{o.views} vistas · {o.unlocks} desbloqueos</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{formatCLP(o.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-gradient-primary p-5 text-primary-foreground shadow-glow">
          <h3 className="font-display text-lg font-bold">Mejora tu plan</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">¿Necesitas más leads este mes? Sube a Tracción Total y obtén 150 leads incluidos.</p>
          <Button asChild variant="warm" size="sm" className="mt-4"><Link to="/precios">Ver planes</Link></Button>
        </div>
      </div>
    </PanelShell>
  );
}
