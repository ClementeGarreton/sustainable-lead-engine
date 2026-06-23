import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "mas:cookies";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="container mx-auto flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-popover/95 p-4 shadow-card backdrop-blur md:flex-row md:items-center">
        <p className="text-sm text-muted-foreground">
          Usamos cookies para medir el origen del tráfico desde Instagram, TikTok y Google. Lee nuestra{" "}
          <Link to="/cookies" className="text-primary hover:underline">política de cookies</Link>.
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => { localStorage.setItem(KEY, "no"); setShow(false); }}>
            Solo esenciales
          </Button>
          <Button size="sm" variant="hero" onClick={() => { localStorage.setItem(KEY, "yes"); setShow(false); }}>
            Aceptar todas
          </Button>
        </div>
      </div>
    </div>
  );
}
