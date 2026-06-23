import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit, EyeOff, Trash2, Plus } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { OFFERS, formatCLP } from "@/lib/mock-data";

export const Route = createFileRoute("/panel/oferta")({
  component: () => (
    <PanelShell title="Mi oferta" subtitle="Edita, pausa o elimina tus publicaciones">
      <div className="mb-4 flex justify-end">
        <Button asChild variant="hero"><Link to="/panel/publicar"><Plus className="h-4 w-4" />Nueva oferta</Link></Button>
      </div>
      <div className="grid gap-3">
        {OFFERS.map((o) => (
          <div key={o.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <img src={o.image} alt="" width={80} height={80} className="h-20 w-20 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{o.title}</p>
              <p className="text-xs text-muted-foreground">{o.views} vistas · {o.unlocks} desbloqueos · {formatCLP(o.price)}</p>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline"><Edit className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="outline"><EyeOff className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="outline"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  ),
});
