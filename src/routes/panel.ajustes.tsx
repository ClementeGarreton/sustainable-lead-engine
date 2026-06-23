import { createFileRoute } from "@tanstack/react-router";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/panel/ajustes")({
  component: () => (
    <PanelShell title="Ajustes">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Ajustes guardados"); }} className="grid max-w-2xl gap-6 rounded-2xl border border-border bg-card p-6">
        <section>
          <h3 className="font-display font-semibold">Cuenta</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div><Label>Correo</Label><Input type="email" defaultValue="hola@evplus.cl" /></div>
            <div><Label>Teléfono</Label><Input defaultValue="+56 9 1111 2222" /></div>
          </div>
        </section>
        <section>
          <h3 className="font-display font-semibold">Datos de facturación</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div><Label>Razón social</Label><Input defaultValue="EV+ Santiago SpA" /></div>
            <div><Label>RUT</Label><Input defaultValue="76.123.456-7" /></div>
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="font-display font-semibold">Notificaciones</h3>
          {[
            ["Avisarme por correo de nuevos leads", true],
            ["Avisarme por WhatsApp de nuevos leads", false],
            ["Resumen semanal de métricas", true],
          ].map(([label, def]) => (
            <div key={label as string} className="flex items-center justify-between">
              <Label>{label as string}</Label>
              <Switch defaultChecked={def as boolean} />
            </div>
          ))}
        </section>
        <Button type="submit" variant="hero" size="lg">Guardar</Button>
      </form>
    </PanelShell>
  ),
});
