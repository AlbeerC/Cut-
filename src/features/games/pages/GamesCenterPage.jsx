import { Film, Trophy, Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router";

export default function GamesCenterPage() {
  const games = [
    {
      id: 1,
      title: "Movie Versus",
      subtitle: "Eliminatoria Clásica",
      description:
        "Enfrenta películas en duelos épicos. Elige tu favorita en cada ronda hasta coronar a la ganadora definitiva.",
      icon: Trophy,
      color: "from-primary to-accent",
      href: "/games/versus",
      features: [
        "10-30 películas",
        "Torneos por categoría",
        "Comparte resultados",
      ],
    },
    {
      id: 2,
      title: "Quién la Dirigió",
      subtitle: "Director Challenge",
      description:
        "Adivina quién está detrás de cámara. Conecta películas icónicas con sus directores.",
      icon: User,
      color: "from-chart-4 to-chart-2",
      href: "/games/director",
      features: ["Directores famosos", "Opciones múltiples", "Aprende jugando"],
    },

    {
      id: 3,
      title: "Timeline Challenge",
      subtitle: "Ordena por año",
      description:
        "Ordena 4 películas según su año de estreno. ¿Cuánto conoces sobre la historia del cine?",
      icon: Calendar,
      color: "from-chart-3 to-chart-4",
      href: "/games/timeline",
      features: [
        "Orden cronológico",
        "Puntos por acierto",
        "Décadas diferentes",
      ],
    },
    {
      id: 4,
      title: "Six degrees",
      subtitle: "Conecta actores",
      description:
        "Conecta dos actores a través de películas compartidas. ¿Cómo se conectan los actores?",
      icon: Film,
      color: "from-accent to-primary",
      href: "/games/sixdegrees",
      features: [
        "2 - 6 pasos",
        "Sistema de puntaje",
        "Múltiples dificultades",
      ],
    },
    {
      id: 5,
      title: "Torneo de Géneros",
      subtitle: "Battle by Genre",
      description:
        "Elige tu género favorito y enfrenta las mejores películas. Las ganadoras compiten entre sí por el título final.",
      icon: Clock,
      color: "from-chart-5 to-primary",
      href: "/games/genres",
      features: [
        "Acción, Drama, Terror",
        "Enfrentamientos por género",
        "Campeón absoluto",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background">
        <div className="absolute inset-0 bg-[url('/cinema-film-reels-pattern.jpg')] bg-cover bg-center opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Centro de Juegos
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Desafía tu{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Conocimiento Cinematográfico
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Cinco juegos únicos para poner a prueba tu pasión por el cine.
            Compite, aprende y descubre nuevas películas.
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="group relative bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,168,77,0.15)] animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {game.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-md text-foreground/80 mb-4 flex-grow text-pretty">
                    {game.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={game.href}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group/btn"
                  >
                    Jugar Ahora
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/20 transition-all pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-card/50 to-background border border-border">
            <Film className="w-12 h-12 text-primary" />
            <div>
              <h3 className="text-2xl font-bold mb-2">
                ¿Listo para el desafío?
              </h3>
              <p className="text-muted-foreground max-w-md text-pretty">
                Cada juego es una nueva oportunidad de demostrar tu amor por el
                cine. Elige tu favorito y comienza a jugar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
