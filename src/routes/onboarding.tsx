import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

const STEPS = ["Cuenta", "Tu primer perfil", "Tu primera oferta", "Listo"];

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Bienvenido — Mi Auto Sustentable" }]}),
  component: Onboarding,
});

function Onboarding() {
  const [step, setStep] = useState(0);
  return (
    <SiteShell>
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <ol className="mb-10 flex items-center justify-between gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden text-sm sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < STEPS.length - 1 && <span className="ml-2 h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-bold">{STEPS[step]}</h1>
          <p className="mt-2 text-muted-foreground">
            {step === 0 && "Confirmamos los datos básicos de tu cuenta."}
            {step === 1 && "Completa tu perfil de vendedor para que los compradores te encuentren."}
            {step === 2 && "Publica tu primera oferta: título, foto y dato de gancho."}
            {step === 3 && "Todo listo. Ya puedes recibir tus primeros leads."}
          </p>
          <div className="mt-8 flex justify-between">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Atrás</Button>
            {step < STEPS.length - 1 ? (
              <Button variant="hero" onClick={() => setStep(step + 1)}>Continuar</Button>
            ) : (
              <Button asChild variant="hero"><Link to="/panel">Ir al panel</Link></Button>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
