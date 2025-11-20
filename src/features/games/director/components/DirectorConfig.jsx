import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clapperboard, Film } from "lucide-react"
import { useEffect, useState } from "react"
import { getMoviesWithDirectors } from "../api/getMoviesPool"
import { useFetch } from "@/features/movies/hooks/useFetch"

export default function DirectorConfig() {
  const navigate = useNavigate()

  const { data: movies, loading, error } = useFetch(() => getMoviesWithDirectors(), [])

  const [localRounds, setLocalRounds] = useState(5)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleStart = () => {
    navigate("/games/director/play")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8 space-y-3">
          <div className="inline-block">
            <Clapperboard className="w-12 h-12 text-primary mx-auto mb-3" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Director Challenge
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto">Adivina quién dirigió cada película</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-5 mb-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" />
              Configuración
            </h3>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Número de rondas</label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    className={`px-3 py-2 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium ${
                      localRounds === num ? "bg-primary border-primary" : ""
                    }`}
                    onClick={() => setLocalRounds(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                10 pts por ronda correcta
              </p>
            </div>
          </div>
        </Card>

        <Button
          size="lg"
          disabled={!localRounds}
          className="w-full text-base py-5 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
          onClick={handleStart}
        >
          Comenzar
        </Button>

        {/* Back Link */}
        <div className="text-center mt-4">
          <Link to="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            ← Volver a juegos
          </Link>
        </div>
      </div>
    </div>
  )
}
