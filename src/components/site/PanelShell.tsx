import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Inbox, Megaphone, Plus, CreditCard, Bell, Settings, User, LogOut,
} from "lucide-react";
import { Logo } from "./Logo";

const ITEMS = [
  { to: "/panel", label: "Resumen", icon: LayoutDashboard, exact: true },
  { to: "/panel/leads", label: "Bandeja de leads", icon: Inbox },
  { to: "/panel/oferta", label: "Mi oferta", icon: Megaphone },
  { to: "/panel/publicar", label: "Publicar", icon: Plus },
  { to: "/panel/facturacion", label: "Facturación", icon: CreditCard },
  { to: "/panel/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/panel/perfil", label: "Perfil", icon: User },
  { to: "/panel/ajustes", label: "Ajustes", icon: Settings },
];

export function PanelShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid md:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-border bg-sidebar md:flex md:flex-col">
          <div className="flex h-16 items-center border-b border-border px-4">
            <Logo />
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {ITEMS.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                activeOptions={{ exact: it.exact }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm bg-primary/10 text-primary" }}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border p-3">
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" /> Salir
            </Link>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-8">
            <div>
              <h1 className="font-display text-xl font-bold leading-none">{title}</h1>
              {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Volver al sitio</Link>
          </header>
          <div className="p-4 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
