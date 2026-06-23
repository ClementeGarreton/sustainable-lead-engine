import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({ meta: [
    { title: "Contacto — Mi Auto Sustentable" },
    { name: "description", content: "Conversemos. Escríbenos, te respondemos hoy." },
  ]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold">Conversemos</h1>
          <p className="mt-3 text-muted-foreground">Atendemos consultas de vendedores, compradores y prensa.</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" />Santiago, Chile</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" />{SITE.email}</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" />{SITE.phonePrefix} 9 1234 5678</li>
          </ul>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Mensaje enviado, te respondemos hoy."); (e.target as HTMLFormElement).reset(); }} className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Nombre</Label><Input required /></div>
            <div><Label>Correo</Label><Input required type="email" /></div>
          </div>
          <div><Label>Asunto</Label><Input required /></div>
          <div><Label>Mensaje</Label><Textarea required rows={5} /></div>
          <Button type="submit" variant="hero" size="lg" className="w-full">Enviar mensaje</Button>
        </form>
      </div>
    </SiteShell>
  ),
});
