import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Mail, BookOpen } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/soporte")({
  head: () => ({ meta: [{ title: "Soporte — Mi Auto Sustentable" }, { name: "description", content: "Te ayudamos con tu cuenta, oferta o lead." }]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Soporte</h1>
        <p className="mt-2 text-muted-foreground">Respuesta máxima 24 hábiles.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { i: BookOpen, t: "FAQ", d: "Lo más consultado", h: "/faq" },
            { i: MessageCircle, t: "WhatsApp", d: "+56 9 1234 5678", h: "https://wa.me/56912345678" },
            { i: Mail, t: "Correo", d: "soporte@mas.cl", h: "mailto:soporte@mas.cl" },
          ].map((c) => (
            <a key={c.t} href={c.h} className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40">
              <c.i className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display font-semibold">{c.t}</p>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </a>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Recibido. Te respondemos pronto."); (e.target as HTMLFormElement).reset(); }} className="mt-10 grid gap-3 rounded-2xl border border-border bg-card p-6 md:max-w-2xl">
          <h2 className="font-display text-xl font-semibold">Abrir consulta</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Asunto</Label><Input required /></div>
            <div><Label>Correo</Label><Input required type="email" /></div>
          </div>
          <div><Label>Mensaje</Label><Textarea required rows={5} /></div>
          <Button type="submit" variant="hero" size="lg">Enviar</Button>
          <p className="text-xs text-muted-foreground">También puedes <Link to="/contacto" className="text-primary hover:underline">escribirnos por contacto general</Link>.</p>
        </form>
      </div>
    </SiteShell>
  ),
});
