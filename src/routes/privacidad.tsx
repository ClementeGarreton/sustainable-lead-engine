import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacidad")({
  head: () => ({ meta: [{ title: "Política de privacidad — Mi Auto Sustentable" }, { name: "description", content: "Cómo tratamos tus datos según la Ley 19.628." }]}),
  component: () => (
    <SiteShell>
      <article className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Política de privacidad</h1>
        <p className="mt-4 text-sm text-muted-foreground">Tratamos tus datos conforme a la Ley 19.628 de Chile.</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <section><h2 className="font-display text-xl font-semibold text-foreground">Datos que recopilamos</h2><p>Nombre, correo, teléfono y datos de navegación (origen, dispositivo, comportamiento de visita).</p></section>
          <section><h2 className="font-display text-xl font-semibold text-foreground">Para qué los usamos</h2><p>Conectarte con vendedores de la oferta desbloqueada, mejorar el sitio y medir la efectividad de nuestra publicidad en Instagram, TikTok y Google.</p></section>
          <section><h2 className="font-display text-xl font-semibold text-foreground">Con quién los compartimos</h2><p>Con vendedores cuya oferta hayas desbloqueado y con proveedores técnicos (correo, métrica, almacenamiento).</p></section>
          <section><h2 className="font-display text-xl font-semibold text-foreground">Tus derechos</h2><p>Acceso, rectificación, cancelación y oposición. Escríbenos a privacidad@mas.cl.</p></section>
        </div>
      </article>
    </SiteShell>
  ),
});
