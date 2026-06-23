import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Zap, Shield, Sparkles, Gauge, BatteryCharging, Wrench } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { Button } from "@/components/ui/button";
import { OFFERS, CATEGORY_LABEL } from "@/lib/mock-data";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-mas.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mi Auto Sustentable — Tu próximo auto, con energía propia." },
      { name: "description", content: "Portal chileno de electromovilidad: concesionarios, vendedores, mecánicos y conversiones híbridas, todos en un solo lugar." },
      { property: "og:title", content: "Mi Auto Sustentable" },
      { property: "og:description", content: "Tu próximo auto, con energía propia. Portal chileno de electromovilidad." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = OFFERS.slice(0, 6);
  return (
    <SiteShell>
      {/* HERO — Ichimoku */}
      <section className="relative isolate overflow-hidden bg-hero">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        </div>
        <div className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Nuevo en Chile
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Tu próximo auto, <br />
              <span className="text-gradient">con energía propia.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              {SITE.hint} Encuentra autos eléctricos, híbridos, talleres EV y conversiones — en un solo lugar, de un solo vistazo.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="hero" size="xl">
                <Link to="/oferta">Ver oferta <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/precios">Soy vendedor</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <Stat n="+1.200" l="visitas / día" />
              <Stat n="6" l="categorías" />
              <Stat n="4" l="tipos de vendedor" />
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative aspect-square rounded-3xl border border-border bg-card/40 p-3 shadow-glow backdrop-blur">
              <img src={heroImg} alt="Auto eléctrico cargando" width={1024} height={1024} className="h-full w-full rounded-2xl object-cover" />
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-popover px-4 py-3 shadow-card animate-pulse-glow">
                <BatteryCharging className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Autonomía promedio</p>
                  <p className="font-display font-bold">+ 450 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUE ENCUENTRAS */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { i: Zap, t: "Concesionarios", d: "Stock 0 km y seminuevos verificados." },
            { i: Gauge, t: "Vendedores", d: "Particulares y afiliados con respaldo." },
            { i: Wrench, t: "Mecánicos EV", d: "Talleres con certificación SEC." },
            { i: Shield, t: "Conversiones", d: "Tu auto actual, ahora híbrido." },
          ].map((c) => (
            <div key={c.t} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <c.i className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFERTA DESTACADA */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Oferta destacada</h2>
            <p className="text-sm text-muted-foreground">Toca una oferta para ver precio y contacto.</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/oferta">Ver todas <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-6 font-display text-3xl font-bold">Explora por categoría</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
            <Link key={k} to="/categorias/$slug" params={{ slug: k }}
              className="rounded-xl border border-border bg-card p-5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/10 hover:text-primary">
              {v} →
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 text-primary-foreground md:p-14">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">¿Vendes autos eléctricos o servicios EV?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Concentramos pauta en Instagram, TikTok y Google. Tú recibes los leads. Sin gastar más de la cuenta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="warm" size="lg"><Link to="/precios">Ver planes</Link></Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/registro">Crear cuenta</Link>
              </Button>
            </div>
          </div>
          <Eye className="absolute -right-10 -top-10 h-64 w-64 text-primary-foreground/10" />
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-foreground">{n}</p>
      <p>{l}</p>
    </div>
  );
}
