import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { PLANES_VENDEDORES } from "@/lib/mock-data";

export const Route = createFileRoute("/precios")({
  head: () => ({ meta: [
    { title: "Planes para vendedores — Mi Auto Sustentable" },
    { name: "description", content: "Tres planes para concesionarios, talleres e instaladores en Chile. Cobro transparente: aparición, leads y clics se facturan por separado." },
    { property: "og:title", content: "Planes — Mi Auto Sustentable" },
  ]}),
  component: () => (
    <SiteShell>
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <p className="text-xs uppercase tracking-wider text-primary">Para vendedores</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Concentramos la publicidad para traerte compradores que ya saben lo que quieren.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Bajamos tu costo de captar clientes. Dejas de pagar por curiosos en redes y compites en un canal vertical donde la persona ya viene pre-educada por nuestro contenido.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Publicidad dispersa y cara",
              "Pagar por curiosos no interesados",
              "Segmentar público a mano",
              "Competir todos contra todos por atención",
            ].map((d) => (
              <p key={d} className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                <span className="mr-2 text-accent">✗</span>{d}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANES_VENDEDORES.map((p) => (
            <div key={p.id} className={`relative flex flex-col rounded-3xl border bg-card p-7 ${p.destacado ? "border-primary shadow-glow" : "border-border"}`}>
              {p.destacado && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="h-3 w-3" /> Recomendado
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{p.nombre}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.para}</p>
              <p className="mt-6 font-display text-base text-muted-foreground">Precio a coordinar con el equipo en esta versión v0.1.0.</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.incluye.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.destacado ? "hero" : "outline"} size="lg" className="mt-6">
                <Link to="/contacto" search={{ plan: p.id }}>{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          v0.1.0 sin pasarela de pago automática. El alta se coordina por contacto y se factura manualmente. El cobro automatizado llega en una fase posterior.
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Leads se ofrecen al vendedor para contacto por email, SMS, WhatsApp o redes sociales. Sin exclusividad de un solo vendedor por lead.
        </p>
      </section>
    </SiteShell>
  ),
});
