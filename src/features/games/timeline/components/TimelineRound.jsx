import { motion, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Star, Award } from 'lucide-react'
import { useState } from "react"

export default function TimelineRound() {
  // Mock data - reemplazar con datos reales
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster: "/shawshank-redemption-poster.png",
      year: 1994,
      rating: 9.3
    },
    {
      id: 2,
      title: "The Godfather",
      poster: "/the-godfather-poster.png",
      year: 1972,
      rating: 9.2
    },
    {
      id: 3,
      title: "Pulp Fiction",
      poster: "/pulp-fiction-poster.png",
      year: 1994,
      rating: 8.9
    },
    {
      id: 4,
      title: "Inception",
      poster: "/inception-movie-poster.png",
      year: 2010,
      rating: 8.8
    }
  ])

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              Ronda 3/10
            </Badge>
            <Badge className="text-sm px-4 py-1.5 bg-primary">
              <Award className="w-4 h-4 mr-1" />
              28 puntos
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
            Ordena de <span className="text-primary">mayor</span> a <span className="text-accent">menor</span> rating
          </h1>
          <p className="text-muted-foreground">
            Arrastra las películas para ordenarlas correctamente
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 bg-muted/50 rounded-lg border border-border"
        >
          <div className="flex items-start gap-2 text-sm">
            <Star className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Tip:</span> Usa el ícono de las barras para arrastrar las películas. 
              La primera posición debe ser la de mayor rating.
            </div>
          </div>
        </motion.div>

        {/* Draggable Movies List */}
        <Reorder.Group 
          axis="y" 
          values={movies} 
          onReorder={setMovies}
          className="space-y-3 mb-8"
        >
          {movies.map((movie, index) => (
            <Reorder.Item 
              key={movie.id} 
              value={movie}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-4 bg-card/80 backdrop-blur border-2 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-6 h-6 text-muted-foreground" />
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Movie Poster */}
                    <div className="relative w-16 h-24 shrink-0 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={movie.poster || "/placeholder.svg"} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.year}</p>
                    </div>

                    {/* Hidden Rating (revelar después de confirmar) */}
                    <div className="hidden items-center gap-1 px-3 py-1.5 rounded-full bg-muted">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-bold">?</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Confirm Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Confirmar Orden
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
