import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroImage from "@/shared/assets/cinema-movie-popcorn-film-camera.png";
import bgImage from "@/shared/assets/cinema-film-reels-pattern.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div
        style={{ background: `url(${bgImage})` }}
        className={`absolute inset-0 opacity-2 bg-cover bg-center`}
      />

      <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                La nueva forma de vivir el cine
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              ¡Descubrí, jugá y compartí tu{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                pasión por el cine!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              Participá en desafíos, descubrí nuevas películas y conectá con
              otros fans del cine. Todo desde un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-14 px-8 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explorar juegos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 border-border hover:bg-secondary bg-transparent"
              >
                Ver Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">+100</div>
                <div className="text-sm text-muted-foreground">
                  jugadores que ya probaron Cut!
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted-foreground">Películas disponibles</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Cut! App Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Nuevo Torneo</div>
                    <div className="text-xs text-muted-foreground">
                      Comienza en 2h
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">+250 puntos</div>
                    <div className="text-xs text-muted-foreground">
                      ¡Racha perfecta!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
