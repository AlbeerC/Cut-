import { Code, Film, Sparkles, Target, Users, Lightbulb, Github, Linkedin, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import bgImage from "@/shared/assets/cinema-film-reels-pattern.png";
import { useEffect } from "react";

export default function AboutPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

  return (
    <section className="relative min-h-screen overflow-hidden py-30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div
        style={{ background: `url(${bgImage})` }}
        className="absolute inset-0 opacity-2 bg-cover bg-center"
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Conocé el proyecto
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Sobre{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
              Cut!
            </span>
          </h2>
        </div>

        {/* About Cut! Section */}
        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-8 md:p-12 shadow-2xl mb-12">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Icon column */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Film className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  <span className="font-bold text-primary">Cut!</span> es una aplicación web pensada para amantes del cine que disfrutan descubrir películas, comparar opiniones y jugar con contenidos interactivos relacionados con el séptimo arte.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  La idea detrás de Cut! es simple: <span className="font-semibold text-foreground">transformar las charlas y debates sobre películas en experiencias lúdicas</span>, a través de juegos, rankings y desafíos que premian tanto el conocimiento como la intuición.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  La plataforma está pensada como un <span className="font-semibold text-foreground">proyecto vivo, en constante evolución</span>, con nuevas ideas y funcionalidades planificadas a futuro. Más allá del entretenimiento, Cut! busca explorar cómo las personas interactúan con el contenido cultural, combinando diversión, competencia y participación de la comunidad.
                </p>
              </div>

              <div className="pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground italic">
                  Toda la información de películas proviene de la API de TMDB y se utiliza exclusivamente con fines recreativos y no comerciales.
                </p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-4 mt-10 pt-10 border-t border-border/40">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Objetivo claro</h4>
                <p className="text-sm text-muted-foreground">
                  Convertir el conocimiento cinematográfico en diversión interactiva
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Comunidad</h4>
                <p className="text-sm text-muted-foreground">
                  Rankings, competencias y participación colectiva
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Evolución continua</h4>
                <p className="text-sm text-muted-foreground">
                  Nuevos juegos y funciones basadas en feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Developer Section */}
        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Icon column */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Code className="w-10 h-10 text-accent" />
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-4">Sobre mí</h3>
                <p className="text-lg text-foreground leading-relaxed">
                  Hola, soy <span className="font-bold text-primary">Alberto</span>, desarrollador de software con un fuerte interés en crear proyectos reales que combinen tecnología, creatividad y experiencia de usuario.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Creé Cut! como una forma de unir dos cosas que realmente disfruto:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">el desarrollo de software</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">el cine y las historias que genera</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Este proyecto me permite practicar y demostrar habilidades como <span className="font-semibold text-foreground">arquitectura frontend, integración con APIs, manejo de estado, decisiones de UI/UX y pensamiento de producto</span>. No se trata solo de escribir código, sino de diseñar experiencias.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Cut! también forma parte de mi objetivo a largo plazo de trabajar en productos tecnológicos donde pueda aportar más allá de la implementación, participando en ideas, decisiones y mejoras continuas.
                </p>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  El proyecto sigue creciendo, y eso es intencional. <span className="font-semibold text-foreground">Cut! es tanto un espacio de experimentación como un paso firme hacia la construcción de software con sentido.</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Conectá conmigo:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a
                      href="https://github.com/AlbeerC"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a
                      href="https://x.com/AlberCaminos03"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <X className="w-4 h-4" />
                      Twitter
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a href="mailto:caminosalbertodev@gmail.com">
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Badge (Optional) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Construido con</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Vite", "TailwindCSS", "Supabase", "TMDB API"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted/50 border border-border/40 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}