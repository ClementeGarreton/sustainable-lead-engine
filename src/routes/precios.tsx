import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { PLANS, formatCLP } from "@/lib/mock-data";

export const Route = createFileRoute("/precios")({
  head: () => ({ meta: [
    { title: "Planes para vendedores — Mi Auto Sustentable" },
    { name: "description", content: "Suscripción mensual con cupo de leads incluido. Paga solo por leads extra cuando los necesites." },
    { property: "og:title", content: "Planes — Mi Auto Sustentable" },
  ]}),
  component: () => (
    <SiteShell>
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-wider text-primary">Para vendedores</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Suscripción + cupo de leads</h1>
          <p className="mt-4 text-muted-foreground">Plan mensual con leads incluidos. ¿Necesitas más? Págalos solo cuando los uses. Cero anuncios dispersos, cero gasto perdido.</p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className={`relative flex flex-col rounded-3xl border bg-card p-7 ${p.popular ? "border-primary shadow-glow" : "border-border"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="h-3 w-3" /> Más elegido
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.reach}</p>
              <p className="mt-6 font-display text-4xl font-bold">{formatCLP(p.monthly)}<span className="text-sm font-medium text-muted-foreground">/mes</span></p>
              <p className="mt-1 text-sm text-primary">{p.leads} leads incluidos · {formatCLP(p.extra)} c/u extra</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.popular ? "hero" : "outline"} size="lg" className="mt-6">
                <Link to="/checkout" search={{ plan: p.id }}>Empezar con {p.name}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Modelo de cobro tentativo: leads se ofrecen al vendedor para contacto por email, SMS, WhatsApp o redes sociales. Sin exclusividad de un solo vendedor por lead.
        </p>
      </section>
    </SiteShell>
  ),
});
