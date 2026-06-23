import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/restablecer")({
  head: () => ({ meta: [{ title: "Nueva contraseña — Mi Auto Sustentable" }]}),
  component: Reset,
});

function Reset() {
  const nav = useNavigate();
  return (
    <SiteShell>
      <div className="container mx-auto flex justify-center px-4 py-16">
        <div className="w-full max-w-sm space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="text-center"><Logo /><h1 className="mt-4 font-display text-2xl font-bold">Define tu nueva contraseña</h1></div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Contraseña actualizada."); nav({ to: "/ingresar" }); }} className="space-y-3">
            <div><Label>Nueva contraseña</Label><Input type="password" required minLength={8} /></div>
            <div><Label>Confirmar</Label><Input type="password" required minLength={8} /></div>
            <Button type="submit" variant="hero" size="lg" className="w-full">Guardar</Button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
