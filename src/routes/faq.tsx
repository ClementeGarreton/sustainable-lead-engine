import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const QA = [
  ["¿Cómo veo el precio y contacto de una oferta?", "Toca la oferta, deja tu nombre, correo y WhatsApp. Desbloqueas precio y datos al instante. Una vez desbloqueado, no tienes que volver a ingresarlos durante la sesión."],
  ["¿A quién se le entrega mi contacto?", "Tu contacto se ofrece al vendedor de la oferta que desbloqueaste. Vendedores con plan compatible podrán contactarte por correo, SMS, WhatsApp o redes sociales."],
  ["¿Es gratis para los compradores?", "Sí, 100%. Solo te pedimos un correo válido para asegurar contactos reales y proteger a los vendedores de bots."],
  ["¿Cómo cobran a los vendedores?", "Plan mensual con cupo de leads incluidos y, si necesitan más, pagan por lead adicional. Mira planes en /precios."],
  ["¿Tienen autos a la venta o son intermediarios?", "Somos un portal: agrupamos la oferta de concesionarios, vendedores, mecánicos y conversiones. La compra se cierra directo con el vendedor."],
  ["¿Operan en todo Chile?", "Sí. Tenemos vendedores en Santiago, Viña, Concepción y se suman ciudades cada mes."],
  ["¿Qué pasa si me ofrecen algo distinto a lo publicado?", "Reporta el caso a soporte. Moderamos la oferta y podemos suspender al vendedor."],
];

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "Preguntas frecuentes — Mi Auto Sustentable" },
    { name: "description", content: "Cómo funciona el portal, el muro de captura y el modelo de leads." },
  ]}),
  component: () => (
    <SiteShell>
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Preguntas frecuentes</h1>
        <Accordion type="single" collapsible className="mt-8">
          {QA.map(([q, a], i) => (
            <AccordionItem key={i} value={`i${i}`}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteShell>
  ),
});
