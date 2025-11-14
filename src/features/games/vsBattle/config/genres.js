import {
  Sword,
  Laugh,
  Drama,
  Heart,
  Ghost,
  Atom,
  Shield,
  Landmark,
  BadgeCent,
} from "lucide-react"

export const GENRES = [
  {
    id: 28,
    label: "Acción",
    value: "action",
    icon: Sword, // peleas, movimiento
  },
  {
    id: 53,
    label: "Thriller",
    value: "thriller",
    icon: Ghost, // tensión, suspenso
  },
  {
    id: 35,
    label: "Comedia",
    value: "comedy",
    icon: Laugh,
  },
  {
    id: 80,
    label: "Crimen",
    value: "crime",
    icon: BadgeCent, // magnifying glass or badge
  },
  {
    id: 27,
    label: "Terror",
    value: "horror",
    icon: Ghost,
  },
  {
    id: 18,
    label: "Drama",
    value: "drama",
    icon: Drama,
  },
  {
    id: 10749,
    label: "Romance",
    value: "romance",
    icon: Heart,
  },
  {
    id: 878,
    label: "Ciencia ficción",
    value: "scifi",
    icon: Atom,
  },
  {
    id: 10752,
    label: "Guerra",
    value: "war",
    icon: Shield,
  },
]
