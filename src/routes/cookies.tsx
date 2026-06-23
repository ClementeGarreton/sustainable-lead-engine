import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Política de cookies — Mi Auto Sustentable" }, { name: "description", content: "Cómo y por qué usamos rastreadores de navegación." }]}),
  component: () => (
    <SiteShell>
      <article className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Política de cookies</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <section><h2 className="font-display text-xl font-semibold text-foreground">Esenciales</h2><p>Mantienen tu sesión, el desbloqueo de oferta y las preferencias del sitio.</p></section>
          <section><h2 className="font-display text-xl font-semibold text-foreground">Medición</h2><p>Píxeles de Instagram, TikTok y Google para medir el origen del tráfico y la efectividad publicitaria.</p></section>
          <section><h2 className="font-display text-xl font-semibold text-foreground">Cómo desactivarlas</h2><p>Desde el banner inferior o las opciones de tu navegador.</p></section>
        </div>
      </article>
    </SiteShell>
  ),
});
