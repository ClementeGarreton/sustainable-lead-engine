import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";
import { Button } from "@/components/ui/button";
import { formatCLP } from "@/lib/mock-data";

const HISTORY = [
  { id: "f-202506", date: "01-06-2026", concept: "Plan Acelera · junio", amount: 89000, status: "Pagado" },
  { id: "f-202505", date: "01-05-2026", concept: "Plan Acelera · mayo", amount: 89000, status: "Pagado" },
  { id: "f-202504", date: "01-04-2026", concept: "Plan Despegue · abril", amount: 39000, status: "Pagado" },
];

export const Route = createFileRoute("/panel/facturacion")({
  component: () => (
    <PanelShell title="Facturación" subtitle="Tus boletas y comprobantes">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Concepto</th><th className="px-4 py-3">Monto</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-right">Comprobante</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {HISTORY.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                <td className="px-4 py-3">{h.concept}</td>
                <td className="px-4 py-3 font-medium">{formatCLP(h.amount)}</td>
                <td className="px-4 py-3"><span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs text-primary">{h.status}</span></td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="outline"><Download className="h-3 w-3" />PDF</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  ),
});
