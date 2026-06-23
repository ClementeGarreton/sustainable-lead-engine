import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CATEGORY_LABEL } from "@/lib/mock-data";

export const Route = createFileRoute("/panel/publicar")({
  component: Publicar,
});

function Publicar() {
  const nav = useNavigate();
  return (
    <PanelShell title="Publicar oferta" subtitle="Define el gancho visible y el detalle bloqueado">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Oferta publicada"); nav({ to: "/panel/oferta" }); }} className="grid max-w-3xl gap-5 rounded-2xl border border-border bg-card p-6">
        <div><Label>Título</Label><Input required placeholder="Ej: SUV eléctrico 2024 con autonomía extendida" maxLength={120} /></div>
        <div>
          <Label>Imagen</Label>
          <div className="mt-1 flex aspect-[16/8] cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-background/40 text-muted-foreground hover:border-primary/50">
            <div className="text-center"><ImagePlus className="mx-auto h-8 w-8" /><p className="mt-2 text-sm">Sube o arrastra una imagen</p></div>
          </div>
        </div>
        <div><Label>Dato de gancho visible</Label><Textarea required rows={2} placeholder="Lo que verán antes del muro de captura" maxLength={160} /></div>
        <div><Label>Contenido oculto (precio, contacto, detalle)</Label><Textarea required rows={4} placeholder="Lo que se desbloquea al entregar el contacto" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Categoría</Label>
            <select required className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(CATEGORY_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div><Label>Precio (CLP)</Label><Input required type="number" min={0} step={10000} /></div>
        </div>
        <Button type="submit" variant="hero" size="lg">Publicar</Button>
      </form>
    </PanelShell>
  );
}
