import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Award, ArrowRight } from 'lucide-react'

export default function TimelineResult() {
  // Mock data - reemplazar con datos reales
  const results = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster: "/shawshank-redemption-poster.png",
      year: 1994,
      rating: 9.3,
      userPosition: 1,
      correctPosition: 1,
      isCorrect: true
    },
    {
      id: 2,
      title: "The Godfather",
      poster: "/the-godfather-poster.png",
      year: 1972,
      rating: 9.2,
      userPosition: 2,
      correctPosition: 2,
      isCorrect: true
    },
    {
      id: 3,
      title: "Inception",
      poster: "/inception-movie-poster.png",
      year: 2010,
      rating: 8.8,
      userPosition: 3,
      correctPosition: 4,
      isCorrect: false
    },
    {
      id: 4,
      title: "Pulp Fiction",
      poster: "/pulp-fiction-poster.png",
      year: 1994,
      rating: 8.9,
      userPosition: 4,
      correctPosition: 3,
      isCorrect: false
    }
  ]

  const correctCount = results.filter(r => r.isCorrect).length
  const roundPoints = correctCount * 1 // 1 punto por cada correcta

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <Badge className="text-3xl px-8 py-4 bg-gradient-to-r from-primary to-accent relative">
                <Award className="w-8 h-8 mr-2" />
                +{roundPoints} puntos
              </Badge>
            </div>
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {correctCount === 4 ? (
              <span className="text-primary">¡Perfecto! 🎉</span>
            ) : correctCount >= 2 ? (
              <span>¡Bien hecho!</span>
            ) : (
              <span className="text-muted-foreground">Casi...</span>
            )}
          </h1>
          <p className="text-lg text-muted-foreground">
            Acertaste <span className="text-primary font-bold">{correctCount}/4</span> posiciones
          </p>
        </motion.div>

        {/* Results List */}
        <div className="space-y-3 mb-8">
          {results.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card 
                className={`p-4 border-2 transition-colors ${
                  movie.isCorrect 
                    ? 'bg-green-950/20 border-green-500/50' 
                    : 'bg-red-950/20 border-red-500/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    movie.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {movie.isCorrect ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <X className="w-6 h-6 text-red-500" />
                    )}
                  </div>

                  {/* Position Badge */}
                  <div className="flex items-center gap-2">
                    <Badge variant={movie.isCorrect ? "default" : "destructive"} className="text-lg px-3 py-1">
                      {movie.userPosition}
                    </Badge>
                    {!movie.isCorrect && (
                      <>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <Badge variant="outline" className="text-lg px-3 py-1 border-green-500/50 text-green-500">
                          {movie.correctPosition}
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Movie Poster */}
                  <div className="relative w-14 h-20 shrink-0 rounded-md overflow-hidden bg-muted">
                    <img 
                      src={movie.poster || "/placeholder.svg"} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 truncate">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.year}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/20">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-bold text-accent">{movie.rating}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 p-4 bg-muted/50 rounded-lg border border-border"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-semibold">3/10 rondas</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Siguiente Ronda
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
