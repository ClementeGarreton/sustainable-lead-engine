import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, TrendingUp, ListChecks, Mail, Sparkles, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CALC, formatCLP } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/herramientas")({
  head: () => ({
    meta: [
      { title: "Herramientas — Calcula tu ahorro y compatibilidad EV" },
      { name: "description", content: "Calculadora de ahorro mensual, recuperación de inversión y test de compatibilidad. Resultado gratis, sin formularios bloqueantes." },
      { property: "og:title", content: "Herramientas EV — Mi Auto Sustentable" },
      { property: "og:description", content: "Tres calculadoras honestas. El resultado se ve siempre. El correo es opcional." },
    ],
  }),
  component: Tools,
});

function Tools() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-xs uppercase tracking-wider text-primary">Herramientas gratis</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Calcula sin entregar datos</h1>
          <p className="mt-4 text-muted-foreground">
            Estas tres herramientas muestran el resultado completo en pantalla. El correo solo se pide después, y solo para enviar un PDF más detallado. <strong>Es opcional.</strong>
          </p>
        </div>
      </section>
      <section className="container mx-auto grid gap-8 px-4 py-12">
        <Ahorro />
        <Recuperacion />
        <Compatibilidad />
      </section>
    </SiteShell>
  );
}

function Card({ icon: Icon, title, subtitle, children }: { icon: typeof Calculator; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function PdfOptIn({ origen }: { origen: string }) {
  const [email, setEmail] = useState("");
  const [acepta, setAcepta] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!acepta) return;
        toast.success("Listo. Te enviaremos el PDF detallado a tu correo.");
        setEmail("");
        setAcepta(false);
        void origen;
      }}
      className="mt-6 rounded-2xl border border-dashed border-border bg-background/40 p-4"
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        <Mail className="h-4 w-4 text-primary" />
        ¿Quieres el informe en PDF? <span className="text-muted-foreground">(opcional)</span>
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <Input type="email" placeholder="tu@correo.cl" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" variant="hero" disabled={!email || !acepta}>Enviar PDF</Button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
        <Checkbox checked={acepta} onCheckedChange={(v) => setAcepta(v === true)} className="mt-0.5" />
        <span>Acepto recibir el PDF por correo. No envíamos publicidad sin tu permiso. Puedes darte de baja con un clic.</span>
      </label>
    </form>
  );
}

function Ahorro() {
  const [km, setKm] = useState(1500);
  const [rend, setRend] = useState(12);
  const [precioB, setPrecioB] = useState(CALC.precioBencina);

  const r = useMemo(() => {
    const gastoBencina = (km / rend) * precioB;
    const gastoElec = km * CALC.consumoKwhPorKm * CALC.precioKwh;
    const ahorro = gastoBencina - gastoElec;
    return { gastoBencina, gastoElec, ahorro, anual: ahorro * 12 };
  }, [km, rend, precioB]);

  return (
    <Card icon={Calculator} title="1. Ahorro mensual" subtitle="Cuánto gastas hoy en bencina vs cuánto gastarías en electricidad.">
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Kilómetros al mes" value={km} onChange={setKm} />
        <Field label="Rendimiento (km / litro)" value={rend} onChange={setRend} />
        <Field label="Precio bencina (CLP / litro)" value={precioB} onChange={setPrecioB} />
      </div>
      <div className="mt-6 grid gap-3 rounded-2xl bg-background/60 p-5 md:grid-cols-3">
        <Stat label="Hoy (bencina)" value={formatCLP(Math.round(r.gastoBencina))} />
        <Stat label="Con eléctrico" value={formatCLP(Math.round(r.gastoElec))} />
        <Stat label="Ahorro / mes" value={formatCLP(Math.round(r.ahorro))} highlight />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Eso son <strong className="text-foreground">{formatCLP(Math.round(r.anual))}</strong> al año. Valores promedio editables: {CALC.consumoKwhPorKm} kWh/km y {formatCLP(CALC.precioKwh)} / kWh.
      </p>
      <PdfOptIn origen="ahorro" />
    </Card>
  );
}

function Recuperacion() {
  const [sobreprecio, setSobreprecio] = useState(8000000);
  const [ahorroMes, setAhorroMes] = useState(120000);

  const meses = ahorroMes > 0 ? Math.ceil(sobreprecio / ahorroMes) : 0;
  const anios = Math.floor(meses / 12);
  const mesesResto = meses % 12;

  return (
    <Card icon={TrendingUp} title="2. Recuperación de inversión" subtitle="Cuánto demoras en empatar el sobreprecio del eléctrico con el ahorro mensual.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Sobreprecio del EV (CLP)" value={sobreprecio} onChange={setSobreprecio} step={100000} />
        <Field label="Ahorro mensual (CLP)" value={ahorroMes} onChange={setAhorroMes} step={10000} />
      </div>
      <div className="mt-6 rounded-2xl bg-background/60 p-5">
        {ahorroMes > 0 ? (
          <>
            <p className="font-display text-3xl font-bold text-gradient">
              {anios > 0 && `${anios} ${anios === 1 ? "año" : "años"}`}
              {anios > 0 && mesesResto > 0 && " y "}
              {mesesResto > 0 && `${mesesResto} ${mesesResto === 1 ? "mes" : "meses"}`}
              {anios === 0 && mesesResto === 0 && "menos de 1 mes"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Punto de cruce: tras <strong>{meses} {meses === 1 ? "mes" : "meses"}</strong>, el ahorro acumulado iguala el sobreprecio. Desde ahí, todo lo que ahorras es ganancia neta.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Ingresa un ahorro mensual mayor a cero.</p>
        )}
      </div>
      <PdfOptIn origen="recuperacion" />
    </Card>
  );
}

function Compatibilidad() {
  const [km, setKm] = useState<number | "">("");
  const [estacion, setEstacion] = useState<"si" | "no" | "">("");
  const [cargador, setCargador] = useState<"si" | "no" | "">("");
  const [viajes, setViajes] = useState<"cortos" | "medios" | "largos" | "">("");

  const completo = km !== "" && estacion && cargador && viajes;

  const resultado = useMemo(() => {
    if (!completo) return null;
    const kmN = Number(km);
    // Reglas honestas: si no puede cargar en casa y maneja mucho, "todavía no"
    if (estacion === "no" && cargador === "no" && kmN > 40) {
      return {
        tipo: "todavia",
        titulo: "Todavía no — y esta es la razón",
        detalle: "Sin estacionamiento propio ni opción de instalar cargador, y con uso diario alto, el eléctrico puro hoy te complicaría. Vuelve cuando tengas acceso a carga en casa, o evalúa un híbrido convencional.",
      };
    }
    if (viajes === "largos" && cargador === "no") {
      return {
        tipo: "hibrido",
        titulo: "Te conviene un híbrido (hoy)",
        detalle: "Haces viajes largos sin garantía de cargador en ruta. Un híbrido enchufable (PHEV) te da electricidad para el día a día y bencina para el viaje, sin ansiedad.",
      };
    }
    if (cargador === "si" || estacion === "si") {
      return {
        tipo: "electrico",
        titulo: "Te conviene un eléctrico puro",
        detalle: "Con carga en casa y tu uso actual, el 90% de tu rutina se cubre cargando en la noche. El ahorro es mayor y la mantención más simple.",
      };
    }
    return {
      tipo: "hibrido",
      titulo: "Probablemente un híbrido",
      detalle: "Tu situación está al límite. Un híbrido convencional es la opción segura mientras se completa la infraestructura de carga.",
    };
  }, [completo, km, estacion, cargador, viajes]);

  return (
    <Card icon={ListChecks} title="3. Test de compatibilidad" subtitle="4 preguntas. Respuesta honesta: incluso 'todavía no' si así es.">
      <div className="grid gap-5">
        <Field label="¿Cuántos km manejas al día?" value={km} onChange={(v) => setKm(v as number)} placeholder="ej. 35" />
        <Choice label="¿Tienes estacionamiento propio?" value={estacion} onChange={setEstacion} options={[["si", "Sí"], ["no", "No"]]} />
        <Choice label="¿Puedes instalar un cargador?" value={cargador} onChange={setCargador} options={[["si", "Sí"], ["no", "No"]]} />
        <Choice
          label="¿Cómo son tus viajes habituales?"
          value={viajes}
          onChange={setViajes}
          options={[["cortos", "Cortos urbanos"], ["medios", "Medios (50-150 km)"], ["largos", "Largos / interurbanos"]]}
        />
      </div>
      {resultado && (
        <div className={`mt-6 rounded-2xl border p-5 ${
          resultado.tipo === "electrico" ? "border-primary bg-primary/10" :
          resultado.tipo === "hibrido" ? "border-accent bg-accent/10" :
          "border-border bg-background/60"
        }`}>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-display text-xl font-bold">{resultado.titulo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{resultado.detalle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resultado.tipo === "electrico" && (
                  <Button asChild variant="hero" size="sm"><Link to="/categorias/$slug" params={{ slug: "autos-electricos" }}>Ver oferta eléctrica <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
                )}
                {resultado.tipo === "hibrido" && (
                  <Button asChild variant="hero" size="sm"><Link to="/categorias/$slug" params={{ slug: "autos-hibridos" }}>Ver híbridos <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
                )}
                <Button asChild variant="outline" size="sm"><Link to="/categorias/$slug" params={{ slug: "accesorios" }}>Cargadores</Link></Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <PdfOptIn origen="compatibilidad" />
    </Card>
  );
}

function Field({ label, value, onChange, step = 1, placeholder }: { label: string; value: number | ""; onChange: (v: number) => void; step?: number; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type="number"
        value={value}
        step={step}
        placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1"
      />
    </div>
  );
}

function Choice<T extends string>({ label, value, onChange, options }: { label: string; value: T | ""; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              value === k ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-2xl font-bold ${highlight ? "text-gradient" : ""}`}>{value}</p>
    </div>
  );
}