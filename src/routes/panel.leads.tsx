import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";

const LEADS = [
  { id: "l1", name: "Camila Pérez", email: "camila@correo.cl", phone: "+56 9 8765 4321", offer: "SUV eléctrico 2024", at: "Hace 2h", status: "Nuevo" },
  { id: "l2", name: "Diego Soto", email: "diego.soto@gmail.com", phone: "+56 9 1234 5678", offer: "Sedán deportivo eléctrico", at: "Hace 6h", status: "Contactado" },
  { id: "l3", name: "Florencia Bravo", email: "flor.bravo@uc.cl", phone: "+56 9 5566 7788", offer: "SUV híbrido familiar", at: "Ayer", status: "Nuevo" },
];

export const Route = createFileRoute("/panel/leads")({
  component: () => (
    <PanelShell title="Bandeja de leads" subtitle="Contacta a quienes desbloquearon tu oferta">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Oferta</th><th className="px-4 py-3">Recibido</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-right">Acción</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {LEADS.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3"><p className="font-medium">{l.name}</p><p className="text-xs text-muted-foreground">{l.email} · {l.phone}</p></td>
                <td className="px-4 py-3 text-muted-foreground">{l.offer}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.at}</td>
                <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs ${l.status === "Nuevo" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{l.status}</span></td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <Button size="sm" variant="hero" asChild><a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}><MessageCircle className="h-3 w-3" /></a></Button>
                    <Button size="sm" variant="outline" asChild><a href={`mailto:${l.email}`}><Mail className="h-3 w-3" /></a></Button>
                    <Button size="sm" variant="outline" asChild><a href={`tel:${l.phone}`}><Phone className="h-3 w-3" /></a></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  ),
});
