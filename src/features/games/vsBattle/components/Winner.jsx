import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Calendar, Play, Share2, RotateCcw } from "lucide-react"
import { useFetch } from "@/features/movies/hooks/useFetch"
import { getMovieByid } from "@/features/movies/api/movies"

export default function VersusWinner({winner}) {

  const navigate = useNavigate()

  if (!winner) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-30">
      <div className="max-w-4xl w-full">
        {/* Confetti Effect Placeholder */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute top-32 right-[15%] w-2 h-2 bg-accent rounded-full animate-ping animation-delay-200" />
          <div className="absolute top-40 left-[20%] w-2 h-2 bg-primary rounded-full animate-ping animation-delay-400" />
          <div className="absolute top-28 right-[25%] w-2 h-2 bg-accent rounded-full animate-ping animation-delay-600" />
        </div>

        {/* Trophy Icon */}
        <div className="text-center mb-4">
          <div className="inline-block relative">
            <Trophy className="w-20 h-20 text-primary mx-auto animate-float" />
            <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
          </div>
        </div>

        {/* Winner Title */}
        <div className="text-center mb-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            ¡Tu ganadora es...!
          </h1>
        </div>

        {/* Winner Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary overflow-hidden mb-8 shadow-2xl shadow-primary/30">
          <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/original${winner.poster_path}`}
                alt={winner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent-foreground text-accent-foreground" />
                  <span className="font-bold text-accent-foreground">{winner.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{winner.title}</h2>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(winner.release_date).getFullYear()}</span>
                  </div>
                </div>

                {winner.tagline && <p className="text-lg text-accent italic">"{winner.tagline}"</p>}

                <p className="text-muted-foreground leading-relaxed">{winner.overview}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Victorias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">32</div>
                  <div className="text-sm text-muted-foreground">Competidoras</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            onClick={() => navigate(`/movies/${winner.id}`)}
            >
            <Play className="w-5 h-5 mr-2" />
            Ver Ficha
          </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary bg-transparent cursor-pointer"
              onClick={() => navigate("/games/versus")}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Volver a Jugar
            </Button>

          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent cursor-pointer">
            <Share2 className="w-5 h-5 mr-2" />
            Compartir
          </Button>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link to="/games" className="text-muted-foreground hover:text-primary transition-colors duration-300">
            ← Volver a juegos
          </Link>
        </div>
      </div>
    </div>
  )
}
