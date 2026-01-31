import { Sparkles, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bgImage from "@/shared/assets/cinema-film-reels-pattern.png";
import { useEffect } from "react";
import { Link } from "react-router";

const faqCategories = [
  {
    title: "Sobre Cut!",
    faqs: [
      {
        id: "faq-1",
        question: "¿Qué es Cut!?",
        answer:
          "Cut! es una aplicación web para fans del cine que convierte el conocimiento, la memoria y el gusto cinematográfico en juegos interactivos.",
      },
      {
        id: "faq-2",
        question: "¿Quién está detrás de Cut!?",
        answer:
          "Cut! es un proyecto independiente desarrollado por un fan del cine y la programación.",
      },
      {
        id: "faq-3",
        question: "¿Cut! es gratis?",
        answer:
          "Sí. Cut! es completamente gratis en esta etapa. En el futuro podrían agregarse funciones opcionales, pero el acceso básico siempre será libre.",
      },
    ],
  },
  {
    title: "Cuenta y Juego",
    faqs: [
      {
        id: "faq-4",
        question: "¿Necesito crear una cuenta para jugar?",
        answer:
          "No. Podés jugar libremente sin registrarte. Crear una cuenta te permite guardar tu progreso, sumar puntos y aparecer en los rankings.",
      },
      {
        id: "faq-5",
        question: "¿Cómo funciona el sistema de puntos?",
        answer:
          "Los puntos se obtienen por ronda, según la dificultad del juego y el uso de pistas. A mayor dificultad y menos ayudas, mayor puntaje.",
      },
      {
        id: "faq-6",
        question: "¿Puedo perder puntos?",
        answer:
          "No. En Cut! nunca se pierden puntos por jugar. Si fallás una ronda o te rendís, simplemente no sumás puntos.",
      },
      {
        id: "faq-7",
        question: "¿Cómo se calculan los rankings?",
        answer:
          "Los rankings se basan en la suma total de puntos obtenidos jugando. Se irán ajustando a medida que crezca la comunidad.",
      },
    ],
  },
  {
    title: "Datos y Privacidad",
    faqs: [
      {
        id: "faq-8",
        question: "¿De dónde salen los datos de las películas?",
        answer:
          "Cut! utiliza la API de The Movie Database (TMDB) para obtener información actualizada sobre películas y actores.",
      },
      {
        id: "faq-9",
        question: "¿Cut! está afiliado a TMDB?",
        answer:
          "No. Cut! es un proyecto independiente y no está afiliado oficialmente a TMDB.",
      },
      {
        id: "faq-10",
        question: "¿Cut! guarda datos personales?",
        answer:
          "Solo se guardan los datos necesarios para el funcionamiento de la cuenta. No se venden ni se comparten con terceros.",
      },
    ],
  },
  {
    title: "Futuro y Feedback",
    faqs: [
      {
        id: "faq-11",
        question: "¿Va a haber nuevos juegos en el futuro?",
        answer:
          "Definitivamente. Cut! está en constante evolución y puede incorporar nuevos modos de juego según el feedback de los usuarios.",
      },
      {
        id: "faq-12",
        question: "¿Puedo sugerir ideas o reportar errores?",
        answer:
          "Sí. Podés hacerlo desde la sección de contacto. Toda sugerencia ayuda a mejorar la app.",
      },
    ],
  },
];

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div
        style={{ background: `url(${bgImage})` }}
        className="absolute inset-0 opacity-2 bg-cover bg-center"
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Preguntas Frecuentes
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            ¿Tenés{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
              dudas?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Acá están las respuestas a las preguntas más comunes sobre Cut!
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-primary rounded-full" />
                {category.title}
              </h3>

              <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl shadow-lg overflow-hidden">
                <Accordion type="multiple" className="w-full">
                  {category.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border-b border-border/40 last:border-0"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:bg-muted/30 text-left font-semibold text-lg hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 text-muted-foreground md:text-lg leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-12 bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            ¿No encontraste tu respuesta?
          </h3>
          <p className="text-muted-foreground mb-6">
            No te preocupes, podés contactarnos directamente
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </section>
  );
}