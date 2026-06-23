import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({ meta: [
    { title: "Sobre nosotros — Mi Auto Sustentable" },
    { name: "description", content: "Quiénes somos: el portal chileno que une electromovilidad en un solo lugar." },
    { property: "og:title", content: "Sobre Mi Auto Sustentable" },
  ]}),
  component: () => (
    <SiteShell>
      <article className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Tu próximo auto, con energía propia.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Mi Auto Sustentable nace en Chile para resolver un problema concreto: la oferta de autos eléctricos, híbridos, talleres especializados y servicios de conversión está dispersa entre decenas de páginas, redes sociales y avisos sueltos. Ningún comprador tiene tiempo para revisarlas todas.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold">Un solo lugar, un solo vistazo</h2>
        <p className="mt-3 text-muted-foreground">Concentramos la oferta de concesionarios, vendedores afiliados, mecánicos EV y especialistas en conversión bajo una sola entidad. Aplicamos el principio Ichimoku: lo importante se entiende de un solo vistazo.</p>
        <h2 className="mt-10 font-display text-2xl font-semibold">Cómo funciona el modelo</h2>
        <p className="mt-3 text-muted-foreground">Concentramos la pauta publicitaria en Instagram, TikTok y Google Ads — el alcance se distribuye entre todos los vendedores asociados, a un costo mucho menor que si cada uno pautara por separado. Los compradores ingresan, exploran libremente y dejan su contacto para desbloquear precio y datos del vendedor.</p>
        <div className="mt-10 flex gap-3">
          <Button asChild variant="hero"><Link to="/precios">Ver planes para vendedores</Link></Button>
          <Button asChild variant="outline"><Link to="/contacto">Contáctanos</Link></Button>
        </div>
      </article>
    </SiteShell>
  ),
});
