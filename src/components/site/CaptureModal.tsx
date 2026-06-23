import { useEffect, useState } from "react";
import { Lock, Zap } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getContact, setContact, unlockAll } from "@/lib/capture-store";

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre, porfa.").max(80),
  email: z.string().trim().email("Correo no válido.").max(120),
  phone: z.string().trim().regex(/^[+]?[0-9 ]{8,15}$/, "Teléfono no válido (ej: +56 9 1234 5678)."),
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  offerId: string;
  offerTitle: string;
  onUnlocked?: () => void;
}

export function CaptureModal({ open, onOpenChange, offerId, offerTitle, onUnlocked }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const c = getContact();
    if (c) setForm(c);
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const map: Record<string, string> = {};
      r.error.issues.forEach((i) => (map[String(i.path[0])] = i.message));
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setContact(r.data);
      unlockAll(offerId);
      setSubmitting(false);
      onOpenChange(false);
      onUnlocked?.();
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-gradient-primary shadow-glow">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center font-display text-2xl">Desbloquea esta oferta</DialogTitle>
          <DialogDescription className="text-center">
            Te contactamos solo por <strong className="text-foreground">{offerTitle}</strong>. Sin spam, palabra de electromovilidad.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="cn">Nombre</Label>
            <Input id="cn" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Camila Pérez" />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="ce">Correo</Label>
            <Input id="ce" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="camila@correo.cl" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="cp">WhatsApp / Teléfono</Label>
            <Input id="cp" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+56 9 1234 5678" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <Button type="submit" disabled={submitting} variant="hero" size="lg" className="mt-2 w-full">
            <Zap className="mr-2 h-4 w-4" />
            {submitting ? "Desbloqueando..." : "Ver contacto y precio"}
          </Button>
          <p className="pt-1 text-center text-[11px] text-muted-foreground">
            Al continuar aceptas nuestros términos y la política de privacidad (Ley 19.628).
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
