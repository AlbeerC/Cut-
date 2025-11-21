"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Film } from "lucide-react"

export default function ActorChain({ chain, targetActor }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">Tu cadena ({chain.length} pasos):</h3>

      <div className="relative">
        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {chain.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 shrink-0"
            >
              {/* Actor Card */}
              <Card className="p-3 bg-card/80 backdrop-blur border-primary/30 w-32">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 ring-2 ring-primary/50">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.actor.profile_path}`}
                    alt={item.actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-semibold text-center truncate">{item.actor.name}</p>
              </Card>

              {/* Arrow with movie info */}
              {item.movie && (
                <div className="flex flex-col items-center gap-1 px-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    <Film className="w-3 h-3 mr-1" />
                    {item.movie.title}
                  </Badge>
                </div>
              )}
            </motion.div>
          ))}

          {/* Target Actor (faded) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="shrink-0">
            <Card className="p-3 bg-card/40 backdrop-blur border-dashed border-accent/50 w-32 opacity-50">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 ring-2 ring-accent/30">
                <img
                  src={`https://image.tmdb.org/t/p/w200${targetActor.profile_path}`}
                  alt={targetActor.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <p className="text-xs font-semibold text-center truncate">{targetActor.name}</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
