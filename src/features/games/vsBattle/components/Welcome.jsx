import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swords, Calendar, Film, User, Theater, Drama } from "lucide-react";
import { useEffect } from "react";
import { useConfigContext } from "../context/ConfigContext";
import { DECADES } from "../config/decades";
import { GENRES } from "../config/genres";
import { VERSUS_CATEGORIES, VERSUS_SIZES } from "../config/options";

export default function VersusWelcome() {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      resetConfig();
    };
  }, []);

  const {
    category,
    setCategory,
    size,
    setSize,
    decade,
    setDecade,
    genre,
    setGenre,
    resetConfig,
  } = useConfigContext();

  const isValidConfig = () => {
    if (!size || !category) return false;

    if (category.value === "decade" && !decade) return false;
    if (category.value === "genre" && !genre) return false;

    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-30">
      <div className="max-w-2xl w-full">
        {/* Title Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <Swords className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Movie Versus
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Elegí entre dos películas hasta que quede tu favorita
          </p>
        </div>

        {/* Configuration Options */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 mb-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              Configuración del torneo
            </h3>

            {/* Tournament Size */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Número de películas
              </label>
              <div className="grid grid-cols-3 gap-3">
                {VERSUS_SIZES.map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium ${
                      size === num ? "bg-primary" : ""
                    }`}
                    onClick={() => setSize(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Categoría</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {VERSUS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    className={`px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium flex items-center justify-center gap-2 ${
                      category?.value === cat.value ? "bg-primary" : ""
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    <Film className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Details config */}
            <div className="mt-5">
              {category?.value === "decade" && (
                <div className="flex flex-wrap gap-2 items-center">
                  {DECADES.map((dec) => (
                    <button
                      key={dec.label}
                      className={`px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium ${
                        decade?.label === dec.label ? "bg-primary" : ""
                      }`}
                      onClick={() => setDecade(dec)}
                    >
                      {dec.label}
                    </button>
                  ))}
                </div>
              )}

              {category?.value === "genre" && (
                <div className="flex flex-wrap gap-2 items-center">
                  {GENRES.map((gen) => {
                    const Icon = gen.icon;
                    return (
                      <button
                        key={gen.value}
                        className={`px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium flex items-center gap-2 ${
                          genre?.value === gen.value ? "bg-primary" : ""
                        }`}
                        onClick={() => setGenre(gen)}
                      >
                        <Icon className="w-4 h-4" />
                        {gen.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Link
          className={`text-black cursor-pointer ${
            !isValidConfig() ? "pointer-events-none opacity-70" : ""
          }`}
          to="/games/versus/play"
        >
          <Button
            size="lg"
            disabled={!isValidConfig()}
            className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Comenzar
          </Button>
        </Link>
        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/games"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            ← Volver a juegos
          </Link>
        </div>
      </div>
    </div>
  );
}
