import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gracias")({
  head: () => ({ meta: [{ title: "Gracias — Mi Auto Sustentable" }]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-primary shadow-glow"><CheckCircle2 className="h-8 w-8 text-primary-foreground" /></div>
        <h1 className="mt-6 font-display text-3xl font-bold">¡Listo!</h1>
        <p className="mt-2 text-muted-foreground">Tu acción se completó correctamente. Te enviamos un correo con los detalles.</p>
        <div className="mt-6 flex gap-2">
          <Button asChild variant="hero"><Link to="/panel">Ir a mi panel</Link></Button>
          <Button asChild variant="outline"><Link to="/">Volver al inicio</Link></Button>
        </div>
      </div>
    </SiteShell>
  ),
});
