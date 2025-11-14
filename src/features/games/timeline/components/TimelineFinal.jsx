import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Award, RotateCcw, Home } from 'lucide-react'
import { Link } from "react-router"

export default function TimelineFinal() {
  // Mock data - reemplazar con datos reales
  const totalPoints = 34
  const maxPoints = 40
  const percentage = Math.round((totalPoints / maxPoints) * 100)
  const correctRounds = 6
  const perfectRounds = 2
  const totalRounds = 10

  // Determinar nivel de desempeño
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { title: "¡Maestro del Cine!", emoji: "🏆", color: "text-primary" }
    if (percentage >= 75) return { title: "¡Excelente!", emoji: "⭐", color: "text-primary" }
    if (percentage >= 60) return { title: "¡Bien hecho!", emoji: "👏", color: "text-accent" }
    return { title: "Sigue practicando", emoji: "💪", color: "text-muted-foreground" }
  }

  const performance = getPerformanceLevel()

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Confetti effect (decorative) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ 
                y: window.innerHeight + 100, 
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 2 + 3, 
                delay: Math.random() * 0.5,
                ease: "linear"
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--muted))'
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${performance.color}`}>
            {performance.title} {performance.emoji}
          </h1>
          <p className="text-lg text-muted-foreground">
            Juego completado
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 mb-6 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-2 border-primary/30">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {totalPoints}
              </div>
              <div className="text-muted-foreground">
                de {maxPoints} puntos posibles
              </div>
              <div className="mt-4">
                <Badge className="text-2xl px-6 py-2 bg-primary/20 text-primary border-primary/50">
                  {percentage}% de precisión
                </Badge>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{correctRounds}</div>
            <div className="text-sm text-muted-foreground">Rondas acertadas</div>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border">
            <Star className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{perfectRounds}</div>
            <div className="text-sm text-muted-foreground">Rondas perfectas</div>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur border-border">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{totalRounds}</div>
            <div className="text-sm text-muted-foreground">Total jugadas</div>
          </Card>
        </motion.div>

        {/* Summary Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 p-6 bg-muted/30 rounded-lg border border-border text-center"
        >
          <p className="text-muted-foreground">
            {percentage >= 90 
              ? "¡Increíble! Eres un verdadero experto en cine. Conoces los ratings mejor que nadie."
              : percentage >= 75
              ? "¡Muy bien! Tienes un gran conocimiento sobre el cine y sus calificaciones."
              : percentage >= 60
              ? "Buen trabajo. Conoces bastante sobre películas, pero siempre hay más por descubrir."
              : "Sigue explorando el mundo del cine. Con práctica mejorarás tus predicciones."}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Volver a Jugar
          </Button>

          <Link to="/games">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold border-2 hover:bg-muted"
            >
              <Home className="w-5 h-5 mr-2" />
              Otros Juegos
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
