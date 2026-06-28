import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Sparkles, BatteryCharging, Wrench, Calculator, MapPin, Stethoscope, Plug, Car, ShieldQuestion, Wallet, Battery, HelpCircle, Instagram, Youtube, Music2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { OfferCard } from "@/components/site/OfferCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { destacadas, CATEGORY_LABEL, SHORTS } from "@/lib/mock-data";
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
  const featured = destacadas();
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        </div>
        <div className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Portal vertical de electromovilidad · Chile
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
            <p className="pt-2 text-xs text-muted-foreground">
              Información honesta para decidir tu próximo paso. Sin métricas infladas, sin urgencias falsas.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="relative aspect-square rounded-3xl border border-border bg-card/40 p-3 shadow-glow backdrop-blur">
              <img src={heroImg} alt="Auto eléctrico cargando" width={1024} height={1024} className="h-full w-full rounded-2xl object-cover" />
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-popover px-4 py-3 shadow-card animate-pulse-glow">
                <BatteryCharging className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Empieza por</p>
                  <p className="font-display font-bold">tu miedo →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPIEZA POR AQUÍ — 6 acciones rápidas */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold">Empieza por aquí</h2>
          <p className="text-sm text-muted-foreground">Si no sabes por dónde empezar, estos 6 caminos cubren las dudas más comunes.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            { i: Car, t: "Comparar autos", d: "Eléctricos e híbridos por categoría.", to: "/oferta" },
            { i: Calculator, t: "Calcular ahorro", d: "Cuánto te ahorras pasando a eléctrico.", to: "/herramientas" },
            { i: Plug, t: "Ver cargadores", d: "Wallbox e instalación SEC certificada.", to: "/categorias/accesorios" },
            { i: Wrench, t: "Mecánico EV", d: "Talleres especializados en batería.", to: "/categorias/mantenimiento" },
            { i: Stethoscope, t: "Médico de batería", d: "Diagnóstico de salud de tu batería.", to: "/categorias/mantenimiento" },
            { i: MapPin, t: "Instalar cargador en casa", d: "Instaladores con certificación.", to: "/categorias/accesorios" },
          ].map((c) => (
            <Link key={c.t} to={c.to} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <c.i className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">Ir <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* TENGO MIEDO DE… */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-card/40 p-8 md:p-12">
          <p className="text-xs uppercase tracking-wider text-accent">Navega por tu duda</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Tengo miedo de…</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cada miedo tiene una respuesta concreta. No te vendemos optimismo — te llevamos a la persona o herramienta que lo resuelve.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              { i: Wallet, m: "…que sea muy caro", s: "Calcula tu ahorro real mensual y anual.", to: "/herramientas" },
              { i: Plug, m: "…quedarme sin batería en la ruta", s: "Mira cómo instalar cargador en casa.", to: "/categorias/accesorios" },
              { i: Battery, m: "…que la batería se muera pronto", s: "Conoce el médico de batería verificado.", to: "/categorias/mantenimiento" },
              { i: Wrench, m: "…no saber dónde repararlo", s: "Directorio de mecánicos especializados.", to: "/categorias/mantenimiento" },
              { i: HelpCircle, m: "…no entender la tecnología", s: "Hazte el test de compatibilidad gratis.", to: "/herramientas" },
              { i: ShieldQuestion, m: "…no saber si me conviene a mí", s: "Test honesto: te conviene, o todavía no.", to: "/herramientas" },
            ].map((m) => (
              <Link key={m.m} to={m.to} className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary/40 hover:bg-card">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <m.i className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold">{m.m}</p>
                  <p className="text-sm text-muted-foreground">{m.s}</p>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Destacados</h2>
            <p className="text-sm text-muted-foreground">
              Espacios pagados, etiquetados como tales. Socios fundadores aparecen primero.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/oferta">Ver todas <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        {featured.length === 0 ? (
          <EmptyState
            title="Pronto: las primeras ofertas verificadas"
            description="Estamos validando los primeros vendedores socios fundadores. No mostramos mockups que parezcan reales."
            action={<Button asChild variant="hero"><Link to="/precios">Quiero ser socio fundador</Link></Button>}
          />
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Estas ofertas son demostrativas mientras incorporamos a los primeros vendedores. Cada tarjeta marcada como “Demo” se reemplazará por una publicación real verificada.
            </p>
          </>
        )}
      </section>

      {/* CARRUSEL DE SHORTS */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold">Aprende en 60 segundos</h2>
          <p className="text-sm text-muted-foreground">
            Series &laquo;¿Qué hacer con tu auto eléctrico?&raquo; y &laquo;10 preguntas para Google&raquo;. Lo educativo guía, no vende disfrazado.
          </p>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {SHORTS.map((s) => {
            const Icon = s.plataforma === "instagram" ? Instagram : s.plataforma === "tiktok" ? Music2 : Youtube;
            return (
              <a
                key={s.id}
                href={s.url}
                className="group block w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/20 via-accent/10 to-background">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-background/80 backdrop-blur">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
                    {s.plataforma}
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <p className="font-display text-sm font-semibold leading-snug">{s.titulo}</p>
                  {s.inciso && <p className="text-xs text-muted-foreground">{s.inciso}</p>}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* EL MERCADO YA ESTÁ AQUÍ */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold">El mercado ya está aquí</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Chile es uno de los mercados de electromovilidad más avanzados de la región. Entramos en fase de acumulación, antes del despegue. Los híbridos hoy mueven más volumen que los eléctricos puros — el portal cubre todo el espectro.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Estrategia Nacional de Electromovilidad", d: "Política pública vigente que empuja la adopción." },
              { t: "Carga concentrada en Santiago", d: "Por eso la instalación domiciliaria es lo más rentable." },
              { t: "Híbridos lideran en volumen", d: "Más accesibles y sin dependencia de cargador." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-background p-5">
                <p className="font-display font-semibold">{c.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Cifras exactas pendientes de verificación con la fuente. No publicamos números si no podemos respaldarlos.
          </p>
        </div>
      </section>

      {/* EXPLORA POR CATEGORÍA */}
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

      {/* CTA VENDEDORES */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 text-primary-foreground md:p-14">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">¿Vendes autos eléctricos o servicios EV?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Concentramos la publicidad para traerte compradores que ya saben lo que quieren. Tú dejas de pagar por curiosos.
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
