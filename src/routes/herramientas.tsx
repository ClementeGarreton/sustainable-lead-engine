import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, Gauge, Stethoscope, ArrowRight, Info } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatCLP } from "@/lib/mock-data";

export const Route = createFileRoute("/herramientas")({
  head: () => ({
    meta: [
      { title: "Herramientas de decisión EV — Mi Auto Sustentable" },
      { name: "description", content: "Calculadora TCO, simulador de autonomía y diagnóstico de compatibilidad EV. Decide con datos, no con miedo." },
      { property: "og:title", content: "Herramientas de decisión EV — Mi Auto Sustentable" },
      { property: "og:description", content: "Calcula tu ahorro real, simula tu autonomía y descubre si un eléctrico es para ti." },
    ],
  }),
  component: Tools,
});

function Tools() {
  return (
    <SiteShell>
      <section className="container mx-auto px-4 py-12">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">Herramientas de decisión</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">Decide con datos, no con miedo.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tres herramientas neutrales para resolver las dudas reales: cuánto ahorrarías, si tu uso diario cabe en una carga y si un eléctrico es para ti hoy.
        </p>

        <Tabs defaultValue="tco" className="mt-10">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="tco"><Calculator className="mr-2 h-4 w-4" /> Calculadora TCO</TabsTrigger>
            <TabsTrigger value="autonomia"><Gauge className="mr-2 h-4 w-4" /> Autonomía</TabsTrigger>
            <TabsTrigger value="diagnostico"><Stethoscope className="mr-2 h-4 w-4" /> Diagnóstico EV</TabsTrigger>
          </TabsList>

          <TabsContent value="tco" className="mt-6"><TCO /></TabsContent>
          <TabsContent value="autonomia" className="mt-6"><Autonomy /></TabsContent>
          <TabsContent value="diagnostico" className="mt-6"><Diagnosis /></TabsContent>
        </Tabs>
      </section>
    </SiteShell>
  );
}

/* ---------------- TCO ---------------- */
function TCO() {
  const [km, setKm] = useState(1500); // km / mes
  const [bencina, setBencina] = useState(1280); // CLP / L
  const [kwh, setKwh] = useState(160); // CLP / kWh
  const [consumoGas, setConsumoGas] = useState(12); // L / 100km (gasolina)
  const consumoEV = 16; // kWh / 100km (referencia)

  const r = useMemo(() => {
    const months = 60;
    const litrosMes = (km * consumoGas) / 100;
    const kwhMes = (km * consumoEV) / 100;
    const gastoGasMes = litrosMes * bencina;
    const gastoEvMes = kwhMes * kwh;
    const ahorroCombustible = (gastoGasMes - gastoEvMes) * months;
    const ahorroMantencion = months * 18000; // estimación: EV ~$18k/mes menos en mantenciones
    return { ahorroCombustible: Math.max(0, ahorroCombustible), ahorroMantencion, total: Math.max(0, ahorroCombustible) + ahorroMantencion };
  }, [km, bencina, kwh, consumoGas]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-semibold">Tus datos reales</h2>

        <div>
          <Label>Kilómetros por mes: <span className="font-mono text-primary">{km.toLocaleString("es-CL")} km</span></Label>
          <Slider value={[km]} onValueChange={(v) => setKm(v[0])} min={200} max={4000} step={100} className="mt-3" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="bencina">Precio bencina (CLP/L)</Label>
            <Input id="bencina" type="number" value={bencina} onChange={(e) => setBencina(+e.target.value || 0)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="kwh">Tarifa eléctrica (CLP/kWh)</Label>
            <Input id="kwh" type="number" value={kwh} onChange={(e) => setKwh(+e.target.value || 0)} className="mt-1" />
          </div>
        </div>

        <div>
          <Label>Consumo de tu auto actual: <span className="font-mono text-primary">{consumoGas} L/100km</span></Label>
          <Slider value={[consumoGas]} onValueChange={(v) => setConsumoGas(v[0])} min={5} max={20} step={0.5} className="mt-3" />
        </div>

        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Usamos un consumo EV referencial de 16 kWh/100km. El ahorro real depende del modelo y tus hábitos.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <h2 className="font-display text-xl font-semibold">En 5 años con un auto eléctrico ahorrarías</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <span className="text-muted-foreground">En combustible</span>
            <span className="font-mono text-lg font-semibold">{formatCLP(r.ahorroCombustible)}</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <span className="text-muted-foreground">En mantención (estimado)</span>
            <span className="font-mono text-lg font-semibold">{formatCLP(r.ahorroMantencion)}</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 pt-2">
            <span className="font-semibold">Total estimado</span>
            <span className="font-mono text-2xl font-bold text-primary">{formatCLP(r.total)}</span>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Estos son valores estimados. El ahorro real depende de tus hábitos de uso, el modelo que elijas y las tarifas vigentes.
        </p>
        <Button asChild variant="hero" size="lg" className="w-full">
          <Link to="/oferta">Ver autos eléctricos que se ajustan a tu ahorro <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ---------------- AUTONOMÍA ---------------- */
function Autonomy() {
  const [city, setCity] = useState("Santiago");
  const [daily, setDaily] = useState(45);

  const MODELS = [
    { name: "Dongfeng Box", range: 310 },
    { name: "BYD Dolphin", range: 405 },
    { name: "MG4", range: 425 },
    { name: "BYD Atto 3", range: 510 },
    { name: "Tesla Model 3", range: 580 },
    { name: "Volvo EX30", range: 480 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-semibold">Tu uso diario</h2>
        <div>
          <Label htmlFor="city">Ciudad</Label>
          <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {["Santiago", "Viña del Mar", "Concepción", "Antofagasta", "La Serena", "Temuco", "Puerto Montt"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Distancia diaria: <span className="font-mono text-primary">{daily} km</span></Label>
          <Slider value={[daily]} onValueChange={(v) => setDaily(v[0])} min={5} max={200} step={5} className="mt-3" />
        </div>
        <p className="text-xs text-muted-foreground">
          Considera ida y vuelta + recorridos cortos. La autonomía real en ciudad varía con el clima y el aire acondicionado.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-semibold">Modelos que cubren tu uso en {city}</h2>
        <ul className="space-y-2 text-sm">
          {MODELS.map((m) => {
            const ok = m.range >= daily * 3; // margen 3x para no cargar todos los días
            return (
              <li key={m.name} className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2">
                <span className="font-medium">{m.name}</span>
                <span className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-muted-foreground">{m.range} km</span>
                  {ok ? (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">✓ Cubre sin problema</span>
                  ) : (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-500">⚠ Carga intermedia</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
        <Button asChild variant="outline" size="sm" className="mt-3 w-full">
          <Link to="/categorias/instalacion-domiciliaria">Cotizar cargador en casa →</Link>
        </Button>
      </div>
    </div>
  );
}

/* ---------------- DIAGNÓSTICO ---------------- */
type Answer = "si" | "no" | "talvez";
const QUESTIONS = [
  { q: "¿Tienes estacionamiento propio en tu casa o edificio?", opts: [["si", "Sí"], ["talvez", "Compartido"], ["no", "No"]] as const },
  { q: "¿Cuántos km recorres habitualmente por día?", opts: [["si", "Menos de 60"], ["talvez", "60–120"], ["no", "Más de 120"]] as const },
  { q: "¿Cuál es tu presupuesto aproximado?", opts: [["no", "Menos de $15M"], ["talvez", "$15M – $25M"], ["si", "Más de $25M"]] as const },
  { q: "¿Usas el auto principalmente en…?", opts: [["si", "Ciudad"], ["talvez", "Mixto"], ["no", "Carretera larga"]] as const },
  { q: "¿Estarías dispuesto a instalar un cargador en casa?", opts: [["si", "Sí"], ["talvez", "Quizás"], ["no", "No"]] as const },
];

function Diagnosis() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Answer[]>([]);

  if (step >= QUESTIONS.length) {
    const score = ans.reduce((a, x) => a + (x === "si" ? 2 : x === "talvez" ? 1 : 0), 0);
    let title = "", body = "", to = "/oferta", cta = "Ver opciones";
    if (score >= 8) { title = "Listo para eléctrico puro"; body = "Tu perfil encaja muy bien con un BEV. Te conviene revisar los modelos eléctricos disponibles."; to = "/categorias/autos-electricos"; cta = "Ver autos eléctricos"; }
    else if (score >= 5) { title = "Eléctrico + cargador domiciliario"; body = "Recomendamos un eléctrico, pero conviene instalar un wallbox en casa primero."; to = "/categorias/instalacion-domiciliaria"; cta = "Cotizar instalación"; }
    else if (score >= 3) { title = "Híbrido enchufable (PHEV) es tu mejor opción ahora"; body = "Mientras la infraestructura crece, un PHEV te da lo mejor de ambos mundos."; to = "/categorias/autos-hibridos"; cta = "Ver híbridos"; }
    else { title = "Mejor esperar 12 meses y reevaluar"; body = "Hoy, un eléctrico podría no calzarte. Aprovecha para entender la tecnología y vuelve a hacer el test el próximo año."; to = "/herramientas"; cta = "Volver a herramientas"; }

    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">Resultado honesto</p>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg"><Link to={to as "/oferta"}>{cta} →</Link></Button>
          <Button variant="outline" size="lg" onClick={() => { setStep(0); setAns([]); }}>Volver a hacerlo</Button>
        </div>
      </div>
    );
  }

  const cur = QUESTIONS[step];
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Pregunta {step + 1} de {QUESTIONS.length}</span>
        <span>{Math.round(((step) / QUESTIONS.length) * 100)}%</span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
      </div>
      <h2 className="font-display text-xl font-semibold">{cur.q}</h2>
      <div className="mt-6 grid gap-2">
        {cur.opts.map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setAns([...ans, val as Answer]); setStep(step + 1); }}
            className="rounded-xl border border-border bg-background/40 px-4 py-3 text-left text-sm transition-all hover:border-primary hover:bg-primary/5"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Este diagnóstico es un asesor neutral. Un resultado "mejor esperar" es válido y honesto.
      </p>
    </div>
  );
}