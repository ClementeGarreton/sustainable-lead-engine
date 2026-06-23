import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/ingresar")({
  head: () => ({ meta: [{ title: "Ingresar — Mi Auto Sustentable" }, { name: "description", content: "Inicia sesión en tu cuenta." }]}),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  return (
    <SiteShell>
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="text-center">
            <Logo />
            <h1 className="mt-4 font-display text-2xl font-bold">Bienvenido de vuelta</h1>
            <p className="text-sm text-muted-foreground">Ingresa a tu panel</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitting(true); setTimeout(() => { toast.success("Sesión iniciada"); nav({ to: "/panel" }); }, 600); }} className="space-y-3">
            <div><Label>Correo</Label><Input type="email" required placeholder="tu@correo.cl" /></div>
            <div><Label>Contraseña</Label><Input type="password" required /></div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              <Zap className="h-4 w-4" /> {submitting ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
          <div className="flex items-center justify-between text-xs">
            <Link to="/recuperar" className="text-muted-foreground hover:text-foreground">¿Olvidaste tu contraseña?</Link>
            <Link to="/registro" className="text-primary hover:underline">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
