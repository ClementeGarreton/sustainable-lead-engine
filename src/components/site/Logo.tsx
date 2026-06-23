import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow transition-transform group-hover:scale-105">
        <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold leading-none">
          Mi Auto<span className="text-primary">.Sustentable</span>
        </span>
      )}
    </Link>
  );
}
