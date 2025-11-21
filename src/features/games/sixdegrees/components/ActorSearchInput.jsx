"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, User } from "lucide-react"

export default function ActorSearchInput() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  // Mock search results
  const searchResults = searchQuery
    ? [
        { id: 1, name: "Leonardo DiCaprio", profile_path: "/leonardo.jpg" },
        { id: 2, name: "Brad Pitt", profile_path: "/brad-pitt.jpg" },
        { id: 3, name: "Matt Damon", profile_path: "/matt-damon.jpg" },
      ]
    : []

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar actor por nombre..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(e.target.value.length > 0)
          }}
          className="pl-10 bg-background/50"
        />
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full z-10"
          >
            <Card className="p-2 bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {searchResults.map((actor) => (
                  <motion.div
                    key={actor.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2 hover:bg-primary/10 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{actor.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
