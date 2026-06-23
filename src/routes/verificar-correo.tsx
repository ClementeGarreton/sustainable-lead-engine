import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/verificar-correo")({
  head: () => ({ meta: [{ title: "Verifica tu correo — Mi Auto Sustentable" }]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-primary shadow-glow"><Mail className="h-7 w-7 text-primary-foreground" /></div>
        <h1 className="mt-6 font-display text-3xl font-bold">Verifica tu correo</h1>
        <p className="mt-2 text-muted-foreground">Te enviamos un enlace de confirmación. Revisa también tu carpeta de spam.</p>
        <div className="mt-6 flex gap-2">
          <Button asChild variant="hero"><Link to="/onboarding">Ya verifiqué</Link></Button>
          <Button variant="outline">Reenviar correo</Button>
        </div>
      </div>
    </SiteShell>
  ),
});
