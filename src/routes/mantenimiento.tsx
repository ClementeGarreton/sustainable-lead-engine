import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/mantenimiento")({
  head: () => ({ meta: [{ title: "En mantención — Mi Auto Sustentable" }]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <Wrench className="h-12 w-12 text-primary" />
        <h1 className="mt-6 font-display text-3xl font-bold">Estamos cargando energía</h1>
        <p className="mt-2 text-muted-foreground">Sitio en mantención programada. Volvemos en breve.</p>
      </div>
    </SiteShell>
  ),
});
