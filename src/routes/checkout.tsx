import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PLANS, formatCLP } from "@/lib/mock-data";

const searchSchema = z.object({ plan: z.string().optional() });

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Contratar plan — Mi Auto Sustentable" }, { name: "description", content: "Activa tu plan publicitario." }]}),
  component: Checkout,
});

function Checkout() {
  const { plan } = Route.useSearch();
  const nav = useNavigate();
  const selected = PLANS.find((p) => p.id === plan) ?? PLANS[1];
  const [submitting, setSubmitting] = useState(false);

  return (
    <SiteShell>
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-bold">Contratar {selected.name}</h1>
          <p className="text-sm text-muted-foreground">Pasarela de pago en integración. Por ahora simulamos el flujo para que puedas probar la experiencia.</p>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitting(true); setTimeout(() => { toast.success("Pago aprobado. Bienvenido a " + selected.name); nav({ to: "/gracias" }); }, 900); }} className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Datos de facturación</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Razón social</Label><Input required /></div>
              <div><Label>RUT</Label><Input required placeholder="12.345.678-9" /></div>
            </div>
            <div><Label>Correo de facturación</Label><Input required type="email" /></div>
            <h2 className="pt-4 font-display text-lg font-semibold">Tarjeta</h2>
            <div><Label>Número de tarjeta</Label><Input required placeholder="4242 4242 4242 4242" /></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Vencimiento</Label><Input required placeholder="MM/AA" /></div>
              <div><Label>CVV</Label><Input required placeholder="123" /></div>
            </div>
            <Button type="submit" disabled={submitting} variant="hero" size="lg" className="w-full">
              <CreditCard className="h-4 w-4" /> {submitting ? "Procesando..." : `Pagar ${formatCLP(selected.monthly)}`}
            </Button>
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> Conexión cifrada · facturación electrónica chilena
            </p>
          </form>
        </div>
        <aside className="space-y-3 rounded-2xl border border-border bg-card p-6 h-fit">
          <h3 className="font-display text-lg font-semibold">Resumen</h3>
          <div className="flex justify-between"><span>Plan {selected.name}</span><span>{formatCLP(selected.monthly)}/mes</span></div>
          <div className="flex justify-between text-sm text-muted-foreground"><span>Leads incluidos</span><span>{selected.leads}</span></div>
          <div className="flex justify-between text-sm text-muted-foreground"><span>Lead extra</span><span>{formatCLP(selected.extra)}</span></div>
          <div className="my-3 border-t border-border" />
          <div className="flex justify-between font-display text-lg font-bold"><span>Total hoy</span><span>{formatCLP(selected.monthly)}</span></div>
        </aside>
      </div>
    </SiteShell>
  );
}
