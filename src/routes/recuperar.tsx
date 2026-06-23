import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/recuperar")({
  head: () => ({ meta: [{ title: "Recuperar contraseña — Mi Auto Sustentable" }]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto flex justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="text-center"><Logo /><h1 className="mt-4 font-display text-2xl font-bold">Recuperar acceso</h1>
            <p className="text-sm text-muted-foreground">Te enviaremos un enlace para restablecer tu contraseña.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Enlace enviado, revisa tu correo."); }} className="space-y-3">
            <div><Label>Correo</Label><Input type="email" required /></div>
            <Button type="submit" variant="hero" size="lg" className="w-full">Enviar enlace</Button>
            <p className="text-center text-xs"><Link to="/ingresar" className="text-muted-foreground hover:text-foreground">Volver a ingresar</Link></p>
          </form>
        </div>
      </div>
    </SiteShell>
  ),
});
