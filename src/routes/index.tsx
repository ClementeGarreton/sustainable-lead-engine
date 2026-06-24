import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Eye, Sparkles, BatteryCharging, ShieldCheck,
  Calculator, MapPin, Wrench, Stethoscope, Home, Scale, Compass,
} from "lucide-react";
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
                <Link to="/herramientas">Calcular ahorro</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/precios">Soy vendedor</Link>
              </Button>
            </div>
            <p className="pt-2 text-sm text-muted-foreground">
              Concentramos pauta en Instagram, TikTok y Google para traerte
              compradores cualificados. Publicidad unificada, costo compartido.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="relative aspect-square rounded-3xl border border-border bg-card/40 p-3 shadow-glow backdrop-blur">
              <img src={heroImg} alt="Auto eléctrico cargando" width={1024} height={1024} className="h-full w-full rounded-2xl object-cover" />
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-popover px-4 py-3 shadow-card animate-pulse-glow">
                <BatteryCharging className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Autonomía</p>
                  <p className="font-display font-bold text-sm">Varía por modelo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NO SE POR DONDE EMPEZAR */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">Empieza por aquí</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">¿No sabes por dónde empezar?</h2>
          <p className="mt-2 text-muted-foreground">Elige lo que más se parece a tu situación. Te llevamos al paso siguiente.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {START_CARDS.map((c) => (
            <Link
              key={c.title}
              to={c.to as string}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow"
            >
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <p className="mt-3 text-sm text-primary">{c.cta} →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TENGO MIEDO DE... */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-sidebar/40 p-6 md:p-10">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">¿Qué te preocupa?</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Tengo miedo de…</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            En electromovilidad no siempre sabes qué buscar, pero sabes qué temes.
            Elige tu preocupación y te mostramos el camino corto.
          </p>
          <ul className="mt-6 grid gap-2 md:grid-cols-2">
            {FEARS.map((f) => (
              <li key={f.label}>
                <Link
                  to={f.to as string}
                  className="group flex items-center justify-between gap-4 rounded-xl border-l-2 border-transparent bg-card/40 p-4 transition-all hover:border-primary hover:bg-card"
                >
                  <div>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{f.path}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OFERTA DESTACADA */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Oferta destacada</h2>
            <p className="text-sm text-muted-foreground">
              Las tarjetas marcadas como <span className="font-semibold text-amber-500">"Oferta destacada"</span> son anunciantes pagos. El resto es ranking neutral.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/oferta">Ver todas <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </section>

      {/* ESTADO DEL MERCADO — contexto honesto */}
      <section className="container mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">Electromovilidad en Chile</p>
        <h2 className="mt-2 font-display text-3xl font-bold">El mercado ya está aquí.</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          No tienes que apostar a algo marginal. Este es el contexto verificable hoy.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display font-semibold">Estrategia Nacional de Electromovilidad</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Política pública vigente del Gobierno de Chile que respalda el desarrollo del sector.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <BatteryCharging className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display font-semibold">Red pública creciendo</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Copec Voltex, Enel X Way y otros operadores expanden su red en Chile.
              <span className="block mt-1 text-xs italic">Cifras puntuales por confirmar con la fuente.</span>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Calculator className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display font-semibold">Ahorro real depende de tu uso</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No te damos un número inflado. <Link to="/herramientas" className="text-primary underline">Calcula tu ahorro</Link> con tus propios kilómetros y tarifa.
            </p>
          </div>
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

const START_CARDS = [
  { icon: Scale, title: "Comparar eléctrico vs híbrido", desc: "Entiende las diferencias reales de costo y uso.", cta: "Comparar ahora", to: "/herramientas" },
  { icon: Calculator, title: "Calcular cuánto ahorraría", desc: "Ingresa tu consumo actual y ve el ahorro proyectado a 5 años.", cta: "Abrir calculadora TCO", to: "/herramientas" },
  { icon: MapPin, title: "Ver cargadores cerca de mí", desc: "Mapa de puntos de carga públicos y domiciliarios en Chile.", cta: "Ver mapa", to: "/categorias/accesorios" },
  { icon: Wrench, title: "Encontrar un mecánico EV", desc: "Talleres con experiencia certificada para tu auto eléctrico o híbrido.", cta: "Buscar taller", to: "/categorias/mantenimiento" },
  { icon: Stethoscope, title: "Saber si la batería de un usado está sana", desc: "Antes de comprar un usado, conoce el estado real de su batería.", cta: "Diagnóstico de batería", to: "/categorias/medico-bateria" },
  { icon: Home, title: "Cotizar instalación de cargador en casa", desc: "Instala un wallbox en tu hogar. Instaladores con certificación SEC.", cta: "Cotizar instalación", to: "/categorias/instalacion-domiciliaria" },
];

const FEARS = [
  { label: "Tengo miedo de quedarme sin batería", path: "Mapa de carga · Planificador de ruta · Wallbox", to: "/categorias/instalacion-domiciliaria" },
  { label: "Tengo miedo de pagar demasiado", path: "Calculadora TCO · Comparador eléctrico vs híbrido", to: "/herramientas" },
  { label: "Tengo miedo de no entender la tecnología", path: "Glosario EV · Artículos · Quiz de compatibilidad", to: "/herramientas" },
  { label: "Tengo miedo de que me engañen con la batería", path: "Qué es SoH · Cómo se mide · Médico de batería", to: "/categorias/medico-bateria" },
  { label: "Tengo miedo de no saber dónde repararlo", path: "Directorio mecánicos EV · Talleres certificados", to: "/categorias/mantenimiento" },
];
