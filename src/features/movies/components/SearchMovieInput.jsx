import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

export default function SearchMovieInput() {
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = inputRef.current?.value.trim()
    if (query) {
      navigate(`/movies/search/${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto py-5 px-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar películas, actores o directores..."
        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card/80 border border-border/60 
                   text-foreground placeholder:text-muted-foreground 
                   focus:outline-none focus:ring-2 focus:ring-primary 
                   transition-all duration-300 shadow-sm focus:shadow-md"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
    </form>
  )
}
