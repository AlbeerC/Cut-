import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Film } from "lucide-react"
import { useEffect, useState } from "react"
import { useFetch } from "@/features/movies/hooks/useFetch"
import { getPoolMovies } from "../../timeline/api/getPoolMovies"
import { useMovieCluesContext } from "../context/MovieCluesContext"
import { useAuth } from "@/features/auth/context/AuthContext"
import { startMovieCluesGame } from "../db/points.db"

export default function MovieCluesConfig() {
  const navigate = useNavigate()
  const { data: movies, loading, error } = useFetch(() => getPoolMovies(200), [])

  const { setRounds, setMoviePool, generateRounds, resetGame, setGameId } = useMovieCluesContext()
  const [localRounds, setLocalRounds] = useState(5)
  const [isStarting, setIsStarting] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
    resetGame()
  }, [])

  const handleStart = async () => {
    if (!movies || movies.length === 0) {
      alert("No se pudieron cargar las películas. Intenta de nuevo.")
      return
    }

    if (movies.length < localRounds) {
      alert(`Solo hay ${movies.length} películas disponibles. Selecciona menos rondas.`)
      return
    }

    setIsStarting(true)
    setRounds(localRounds)
    setMoviePool(movies)

    const success = generateRounds(movies, localRounds)

    if (success) {
      const gameId = await startMovieCluesGame(user.id)
      console.log("creating gameId", gameId)

      setGameId(gameId)
      navigate("/games/movieclues/play")
    } else {
      alert("Error al generar las rondas. Intenta de nuevo.")
      setIsStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8 space-y-3">
          <div className="inline-block">
            <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Adivina la Película
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Descubre la película a partir del póster
          </p>
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
                    disabled={isStarting}
                    className={`px-3 py-2 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-foreground font-medium disabled:opacity-50 ${
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
                150 pts (sin pistas) • 100 pts (1 pista) • 75 pts (2 pistas) • 25 pts (3 pistas)
              </p>
            </div>
          </div>
        </Card>

        <Button
          size="lg"
          disabled={!localRounds || loading || !movies || isStarting}
          className="w-full text-base py-5 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
          onClick={handleStart}
        >
          {loading ? "Cargando películas..." : isStarting ? "Preparando juego..." : "Comenzar"}
        </Button>

        {error && <p className="text-sm text-red-500 text-center mt-2">Error al cargar películas. Intenta de nuevo.</p>}

        <div className="text-center mt-4">
          <Link to="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            ← Volver a juegos
          </Link>
        </div>
      </div>
    </div>
  )
}
