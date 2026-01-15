import { Card, CardContent } from "@/components/ui/card"
import { Swords, Brain, Trophy } from "lucide-react"

const features = [
  {
    icon: Swords,
    title: "Versus de Películas",
    description: "Dos películas se enfrentan… y vos tenés la última palabra. Votá, descubrí joyas ocultas y compará tus gustos con otros fans",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Trivia Cinematográfica",
    description: "Demuestra tu conocimiento con preguntas sobre directores, actores, y escenas icónicas.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Trophy,
    title: "Ranking de Fans",
    description: "Sumá puntos, subí de nivel y ganá tu lugar entre los fans más cinéfilos. ¡Cada partida cuenta!",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export default function FeaturesSection() {
  return (
    <section id="juegos" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Viví el cine {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              jugando
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Explorá distintos juegos y desafíos pensados para verdaderos amantes del cine.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-8 space-y-4">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
