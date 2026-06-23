import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ShoppingBag, CreditCard, AlertTriangle, BarChart3 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OFFERS, SELLERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administración — Mi Auto Sustentable" }]}),
  component: Admin,
});

function Admin() {
  const stats = [
    { i: Users, l: "Vendedores", v: SELLERS.length, c: "text-primary" },
    { i: ShoppingBag, l: "Ofertas vivas", v: OFFERS.length, c: "text-accent" },
    { i: BarChart3, l: "Leads del mes", v: 312, c: "text-chart-2" },
    { i: CreditCard, l: "Ingresos del mes", v: "$ 4.870.000", c: "text-primary" },
  ];
  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-wider text-primary">Administración</p>
        <h1 className="mt-1 font-display text-3xl font-bold">Panel global</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
              <s.i className={`h-5 w-5 ${s.c}`} />
              <p className="mt-3 text-xs text-muted-foreground">{s.l}</p>
              <p className="font-display text-2xl font-bold">{s.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card title="Moderación de oferta" cta={["Ver todas", "/admin"]}>
            {OFFERS.slice(0, 4).map((o) => (
              <Row key={o.id} title={o.title} sub={`Por ${SELLERS.find(s => s.id === o.sellerId)?.name}`} status="OK" />
            ))}
          </Card>
          <Card title="Alertas" cta={["Resolver", "/admin"]}>
            <Row title="Reporte de oferta engañosa" sub="o3 · enviado por usuario" status="Pendiente" warn />
            <Row title="Pago rechazado plan Acelera" sub="Vendedor s2" status="Atender" warn />
          </Card>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Acceso restringido al rol administrador. <Link to="/" className="text-primary hover:underline">Salir</Link></p>
      </div>
    </SiteShell>
  );
}

function Card({ title, cta, children }: { title: string; cta: [string, string]; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display font-semibold">{title}</h3>
        <Link to={cta[1]} className="text-xs text-primary hover:underline">{cta[0]}</Link>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

function Row({ title, sub, status, warn }: { title: string; sub: string; status: string; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 text-sm">
      <div className="min-w-0">
        <p className="truncate font-medium">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${warn ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"}`}>
        {warn && <AlertTriangle className="h-3 w-3" />} {status}
      </span>
    </div>
  );
}
