import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { PanelShell } from "@/components/site/PanelShell";

const NOTIFS = [
  { id: 1, t: "Nuevo lead recibido", d: "Camila Pérez desbloqueó SUV eléctrico 2024.", at: "Hace 2h", read: false, icon: Bell, c: "text-primary" },
  { id: 2, t: "Pago confirmado", d: "Tu plan Acelera de junio está activo.", at: "Hace 3 días", read: true, icon: CheckCircle2, c: "text-primary" },
  { id: 3, t: "Recordatorio: completa tu perfil público", d: "Aumenta hasta 30% tu tasa de desbloqueo.", at: "Hace 5 días", read: true, icon: AlertCircle, c: "text-accent" },
];

export const Route = createFileRoute("/panel/notificaciones")({
  component: () => (
    <PanelShell title="Notificaciones">
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {NOTIFS.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 p-4 ${!n.read ? "bg-primary/5" : ""}`}>
            <n.icon className={`mt-0.5 h-5 w-5 ${n.c}`} />
            <div className="flex-1">
              <p className="font-medium">{n.t}</p>
              <p className="text-sm text-muted-foreground">{n.d}</p>
            </div>
            <span className="text-xs text-muted-foreground">{n.at}</span>
          </div>
        ))}
      </div>
    </PanelShell>
  ),
});
