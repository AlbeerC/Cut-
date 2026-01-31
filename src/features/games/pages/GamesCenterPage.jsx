import { Link } from "react-router";
import {
  Film,
  Trophy,
  Clock,
  Play,
  Users,
  Gamepad2,
  Star,
  Heart,
  Cog,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import gameicon1 from "@/shared/assets/gameicon1.png";
import gameicon2 from "@/shared/assets/gameicon2.png";
import gameicon3 from "@/shared/assets/gameicon3.png";
import gameicon4 from "@/shared/assets/gameicon4.png";
import gameicon5 from "@/shared/assets/gameicon5.png";

export default function GamesHub() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const carouselRef = useRef(null);
  const autoRotateRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const games = [
    {
      id: 1,
      title: "Batalla de películas",
      subtitle: "Movie Versus",
      description:
        "Enfrenta películas en duelos épicos. Elige tu favorita en cada ronda hasta coronar a la ganadora definitiva.",
      longDescription:
        "El torneo definitivo de películas. Selecciona tu categoría favorita y enfrenta films en duelos cara a cara. Cada victoria te acerca más a descubrir cuál es tu película favorita absoluta.",
      image: gameicon1,
      color: "from-primary to-accent",
      bgImage:
        "https://image.tmdb.org/t/p/original/ii8QGacT3MXESqBckQlyrATY0lT.jpg",
      href: "/games/versus",
      features: [
        "10-30 películas",
        "Torneos por categoría",
        "Comparte resultados",
      ],
      stats: { difficulty: "Baja", avgTime: "3 min" },
    },
    {
      id: 2,
      title: "Quién la Dirigió",
      subtitle: "Director Challenge",
      description:
        "Adivina quién está detrás de cámara. Conecta películas icónicas con sus directores.",
      longDescription:
        "Pon a prueba tu conocimiento sobre los maestros del cine. Identifica al director correcto entre 4 opciones y demuestra que conoces quién está detrás de tus películas favoritas.",
      image: gameicon2,
      color: "from-chart-4 to-chart-2",
      bgImage:
        "https://w0.peakpx.com/wallpaper/16/113/HD-wallpaper-movie-pulp-fiction.jpg",
      href: "/games/director",
      features: ["Directores famosos", "Opciones múltiples", "Aprende jugando"],
      stats: { difficulty: "Media", avgTime: "4 min" },
    },
    {
      id: 3,
      title: "Línea del tiempo",
      subtitle: "Timeline Challenge",
      description:
        "Ordena 4 películas según su año de estreno. ¿Cuánto conoces sobre la historia del cine?",
      longDescription:
        "Viaja a través de décadas de cine. Organiza películas en orden cronológico y demuestra tu dominio de la historia cinematográfica desde los clásicos hasta los estrenos más recientes.",
      image: gameicon3,
      color: "from-chart-3 to-chart-4",
      bgImage:
        "https://media.vanityfair.com/photos/541c841b1019a3955fea0c58/master/w_2560%2Cc_limit/shawshank-redemption-20th-anniversary-01.jpg",
      href: "/games/timeline",
      features: [
        "Orden cronológico",
        "Puntos por acierto",
        "Décadas diferentes",
      ],
      stats: { difficulty: "Alta", avgTime: "5 min" },
    },
    {
      id: 4,
      title: "Adivina la Película",
      subtitle: "Guess the Movie",
      description:
        "Pon a prueba tu conocimiento cinematográfico. Identifica películas a partir de pistas, citas o imágenes.",
      longDescription:
        "El desafío clásico de adivinanzas cinematográficas. Descubre la película correcta usando pistas visuales y contextuales. Menos pistas usadas = más puntos ganados.",
      image: gameicon4,
      color: "from-accent to-primary",
      bgImage:
        "https://c4.wallpaperflare.com/wallpaper/830/369/185/movies-fight-club-screenshots-1600x900-entertainment-movies-hd-art-wallpaper-preview.jpg",
      href: "/games/movieclues",
      features: [
        "Modo rápido 10 rondas",
        "Sistema de puntaje",
        "Múltiples dificultades",
      ],
      stats: { difficulty: "Media", avgTime: "5 min" },
    },
    {
      id: 5,
      title: "Conectados",
      subtitle: "Six degrees",
      description:
        "Conecta dos actores a través de películas compartidas. ¿Cómo se conectan los actores?",
      longDescription:
        "Pon a prueba tu conocimiento del cine conectando dos actores a través de películas compartidas. Cada enlace debe ser real y estratégico: cuantos menos pasos uses, mejor. ¿Puedes encontrar la conexión perfecta?",
      image: gameicon5,
      color: "from-chart-5 to-primary",
      bgImage:
        "https://wallpapers.com/images/hd/heat-movie-mysterious-val-kimer-robert-de-niro-al-pacino-lsbed7icd7wwmhkz.jpg",
      href: "/games/sixdegrees",
      features: ["Actor A, Actor B", "Enlaces múltiples", "Múltiples opciones"],
      stats: { difficulty: "Alta", avgTime: "6 min" },
    },
  ];

  // Auto-rotate featured game
  const startAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    autoRotateRef.current = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % games.length);
    }, 6000);
  };

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const threshold = 50; // Minimum drag distance to trigger change
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Determine direction based on drag distance and velocity
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 500) {
        // Swiped right - go to previous
        setFeaturedIndex((prev) => (prev - 1 + games.length) % games.length);
      } else if (offset < 0 || velocity < -500) {
        // Swiped left - go to next
        setFeaturedIndex((prev) => (prev + 1) % games.length);
      }
    }

    // Reset drag position
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });

    // Restart auto-rotation after manual interaction
    stopAutoRotate();
    setTimeout(() => startAutoRotate(), 6000);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    stopAutoRotate();
  };

  const featuredGame = games[featuredIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Game Hero */}
      <div className="relative overflow-hidden border-b border-border pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${featuredGame.bgImage}')` }}
          />
        </AnimatePresence>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Draggable container for mobile */}
        <motion.div
          ref={carouselRef}
          className="relative max-w-7xl mx-auto px-4 py-20 sm:py-20 min-h-[600px] flex items-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          // Only enable drag on mobile
          dragEnabled={true}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full pointer-events-none">
            {/* Left Content */}
            <motion.div
              key={`content-${featuredIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Juego Destacado
                </span>
              </div>

              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 text-balance">
                  {featuredGame.title}
                </h1>
                <p className="text-xl text-primary font-medium mb-6">
                  {featuredGame.subtitle}
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed text-pretty">
                  {featuredGame.longDescription}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Cog className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {featuredGame.stats.difficulty}
                    </p>
                    <p className="text-xs text-muted-foreground">Dificultad</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">
                      {featuredGame.stats.avgTime}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Duración promedio
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-2">
                {featuredGame.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm text-sm border border-border text-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={featuredGame.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg hover:shadow-[0_0_40px_rgba(255,168,77,0.4)] transition-all duration-300 group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Jugar Ahora
              </Link>
            </motion.div>

            {/* Right - Featured Icon */}
            <motion.div
              key={`icon-${featuredIndex}`}
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="hidden lg:flex items-center justify-center pointer-events-auto"
            >
              <div className="relative">
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${featuredGame.color} blur-3xl opacity-40`}
                />

                {/* Card */}
                <div
                  className={`relative w-64 h-64 rounded-3xl bg-gradient-to-br ${featuredGame.color} p-2 shadow-2xl`}
                >
                  {/* Image wrapper */}
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-black/30">
                    <img
                      src={featuredGame.image}
                      alt={featuredGame.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="relative pb-8 flex justify-center gap-2">
          {games.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFeaturedIndex(idx);
                stopAutoRotate();
                setTimeout(() => startAutoRotate(), 6000);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === featuredIndex
                  ? "w-12 bg-primary"
                  : "w-6 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ver ${games[idx].title}`}
            />
          ))}
        </div>

        {/* Swipe hint for mobile (optional) */}
        <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 0 : 0.5 }}
            className="text-xs text-muted-foreground flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30"
          >
            <span>← Desliza →</span>
          </motion.div>
        </div>
      </div>

      {/* All Games Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Todos los Juegos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Elige tu desafío favorito y demuestra tu conocimiento cinematográfico
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {games.map((game, index) => {
            const isHovered = hoveredGame === game.id;

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredGame(game.id)}
                onHoverEnd={() => setHoveredGame(null)}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Link to={game.href} className="block group h-full">
                  <motion.div
                    className="relative bg-card/60 backdrop-blur-md rounded-3xl border border-border/50 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-500 group"
                    animate={{
                      borderColor: isHovered
                        ? "rgba(255, 168, 77, 0.5)"
                        : "rgba(var(--border), 0.5)",
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated Gradient Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0`}
                      animate={{ opacity: isHovered ? 0.15 : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-br ${game.color} opacity-0 blur-xl`}
                      animate={{ opacity: isHovered ? 0.3 : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: "24px 24px",
                        }}
                      />
                    </div>

                    <div className="relative p-6 flex flex-col h-full min-h-[320px]">
                      {/* Icon Container */}
                      <div className="mb-6 relative">
                        <motion.div
                          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-2xl overflow-hidden`}
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                            rotate: isHovered ? 8 : 0,
                          }}
                          transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {/* Icon Glow */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-60 blur-md`}
                            animate={{ opacity: isHovered ? 0.8 : 0.6 }}
                          />
                          <img
                            src={game.image}
                            alt={game.title}
                            className="relative w-full h-full object-cover"
                            draggable={false}
                          />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <motion.h3
                        className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors duration-300"
                        animate={{
                          color: isHovered ? "rgb(var(--primary))" : "inherit",
                        }}
                      >
                        {game.title}
                      </motion.h3>

                      {/* Subtitle */}
                      <p className="text-xs font-medium text-primary/80 mb-3 uppercase tracking-wider">
                        {game.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-foreground/70 mb-6 flex-grow text-pretty leading-relaxed line-clamp-3">
                        {game.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-5 border-t border-border/50 mt-auto">
                        <motion.div
                          className="flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors"
                          animate={{
                            color: isHovered
                              ? "rgb(var(--foreground))"
                              : "rgb(var(--muted-foreground))",
                          }}
                        >
                          <Cog className="w-4 h-4" />
                          <span>{game.stats.difficulty}</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors"
                          animate={{
                            color: isHovered
                              ? "rgb(var(--foreground))"
                              : "rgb(var(--muted-foreground))",
                          }}
                        >
                          <Clock className="w-4 h-4" />
                          <span>{game.stats.avgTime}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? ["-100%", "200%"] : "-100%",
                      }}
                      transition={{
                        x: {
                          duration: 0.6,
                          ease: "easeInOut",
                        },
                      }}
                      style={{ transform: "skewX(-20deg)" }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Global Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            <Gamepad2 className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">5</p>
            <p className="text-sm text-muted-foreground">Juegos disponibles</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            <Users className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">120+</p>
            <p className="text-sm text-muted-foreground">Desafíos posibles</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-chart-4 mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">∞</p>
            <p className="text-sm text-muted-foreground">Conexiones de cine</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
            <Heart className="w-8 h-8 text-chart-3 mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">100%</p>
            <p className="text-sm text-muted-foreground">
              Hecho con pasión por el cine
            </p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-10 rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-background border border-border backdrop-blur-sm shadow-xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Film className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-3">
                ¿Listo para el desafío?
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
                Cada juego es una nueva oportunidad de demostrar tu pasión por
                el cine. Compite con otros fans, sube en los rankings y
                conviértete en leyenda.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}