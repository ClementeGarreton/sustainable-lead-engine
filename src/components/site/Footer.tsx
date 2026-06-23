import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Globe, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-sidebar/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Portal chileno de electromovilidad. Un solo lugar para encontrar tu próximo auto eléctrico o híbrido.
          </p>
          <div className="flex gap-3 pt-2">
            <a href={SITE.ig} aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
            <a href={SITE.tk} aria-label="TikTok" className="text-muted-foreground hover:text-primary"><Music2 className="h-5 w-5" /></a>
            <a href="https://google.com" aria-label="Google" className="text-muted-foreground hover:text-primary"><Globe className="h-5 w-5" /></a>
            <a href={`mailto:${SITE.email}`} aria-label="Correo" className="text-muted-foreground hover:text-primary"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
        <FooterCol title="Explorar" links={[["Oferta", "/oferta"], ["Categorías", "/categorias"], ["Búsqueda", "/buscar"], ["FAQ", "/faq"]]} />
        <FooterCol title="Vendedores" links={[["Publicar", "/registro"], ["Planes", "/precios"], ["Panel", "/panel"], ["Soporte", "/soporte"]]} />
        <FooterCol title="Legal" links={[["Sobre nosotros", "/sobre-nosotros"], ["Contacto", "/contacto"], ["Términos", "/terminos"], ["Privacidad", "/privacidad"], ["Cookies", "/cookies"]]} />
      </div>
      <div className="border-t border-border/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row">
          <p>© {SITE.yr} {SITE.name} — Santiago, Chile.</p>
          <p>Hecho con energía limpia ⚡</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link to={href} className="hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
