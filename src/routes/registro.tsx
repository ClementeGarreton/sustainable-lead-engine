import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SELLER_LABEL, type SellerType } from "@/lib/mock-data";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Crear cuenta — Mi Auto Sustentable" }, { name: "description", content: "Regístrate como vendedor o comprador." }]}),
  component: Register,
});

function Register() {
  const [tab, setTab] = useState<"vendedor" | "comprador">("vendedor");
  const [subtype, setSubtype] = useState<SellerType>("concesionario");
  const nav = useNavigate();

  return (
    <SiteShell>
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="text-center"><Logo /><h1 className="mt-4 font-display text-2xl font-bold">Crea tu cuenta</h1></div>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
            {(["vendedor", "comprador"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-lg py-2 text-sm font-medium transition-all ${tab === t ? "bg-background shadow-card text-foreground" : "text-muted-foreground"}`}>
                {t === "vendedor" ? "Soy vendedor" : "Soy comprador"}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Cuenta creada. Revisa tu correo."); nav({ to: "/verificar-correo" }); }} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Nombre</Label><Input required placeholder={tab === "vendedor" ? "Tu negocio" : "Tu nombre"} /></div>
              <div><Label>Teléfono</Label><Input required type="tel" placeholder="+56 9 1234 5678" /></div>
            </div>
            <div><Label>Correo</Label><Input required type="email" /></div>
            <div><Label>Contraseña</Label><Input required type="password" minLength={8} /></div>
            {tab === "vendedor" && (
              <div>
                <Label>Tipo de vendedor</Label>
                <select value={subtype} onChange={(e) => setSubtype(e.target.value as SellerType)} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {Object.entries(SELLER_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            )}
            <Button type="submit" variant="hero" size="lg" className="w-full">Crear cuenta</Button>
            <p className="text-center text-xs text-muted-foreground">
              ¿Ya tienes cuenta? <Link to="/ingresar" className="text-primary hover:underline">Ingresar</Link>
            </p>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
