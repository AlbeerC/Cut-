import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Lightbulb, Undo2, Search, Target } from "lucide-react"
import ActorChain from "./ActorChain"
import ActorSearchInput from "./ActorSearchInput"

export default function SixDegreesGame() {
  // Mock data para visualización
  const actorA = {
    id: 1,
    name: "Tom Hanks",
    profile_path: "/tom-hanks.jpg",
  }

  const actorB = {
    id: 2,
    name: "Scarlett Johansson",
    profile_path: "/scarlett-johansson.jpg",
  }

  const chain = [
    {
      actor: actorA,
      movie: null,
    },
    {
      actor: {
        id: 3,
        name: "Bill Murray",
        profile_path: "/bill-murray.jpg",
      },
      movie: { title: "Lost in Translation", year: 2003 },
    },
  ]

  const hints = 2
  const timeRemaining = 142 // segundos

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs px-2 py-1">
                <Target className="w-3 h-3 mr-1" />
                Dificultad: Media
              </Badge>
              <Badge className="text-xs px-2 py-1 bg-primary">
                <Lightbulb className="w-3 h-3 mr-1" />
                {hints} hints
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tiempo: 2:22</span>
            </div>
          </div>
          <Progress value={65} className="h-2" />
        </motion.div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Objective */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actorA.profile_path}`}
                      alt={actorA.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Desde</p>
                    <p className="font-semibold">{actorA.name}</p>
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-primary" />

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Hasta</p>
                    <p className="font-semibold">{actorB.name}</p>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actorB.profile_path}`}
                      alt={actorB.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Actor Chain */}
          <ActorChain chain={chain} targetActor={actorB} />

          {/* Search Actor */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Buscar siguiente actor
              </h3>
              <ActorSearchInput />
            </Card>
          </motion.div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" disabled={chain.length <= 1}>
                <Undo2 className="w-4 h-4 mr-2" />
                Deshacer
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" disabled={hints <= 0}>
                <Lightbulb className="w-4 h-4 mr-2" />
                Pista ({hints})
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
