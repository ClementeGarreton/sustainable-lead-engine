import { createFileRoute } from "@tanstack/react-router";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/panel/perfil")({
  component: () => (
    <PanelShell title="Perfil público" subtitle="Lo que los compradores ven en tu página">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Perfil actualizado"); }} className="grid max-w-2xl gap-4 rounded-2xl border border-border bg-card p-6">
        <div><Label>Nombre comercial</Label><Input defaultValue="EV+ Santiago" /></div>
        <div><Label>Ciudad</Label><Input defaultValue="Santiago" /></div>
        <div><Label>Descripción</Label><Textarea rows={4} defaultValue="Concesionario multimarca con stock de autos 100% eléctricos importados directos." /></div>
        <Button variant="hero" size="lg" type="submit">Guardar cambios</Button>
      </form>
    </PanelShell>
  ),
});
