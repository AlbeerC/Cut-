import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
import logo from "../assets/logo.png"

export default function Navbar() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Cut! Logo" className="w-18 h-18" />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="#juegos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Juegos
          </Link>
          <Link
            to="/movies"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Explorar
          </Link>
          <Link
            to="#torneos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Torneos
          </Link>
          <Link
            to="#favoritos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Favoritos
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Login
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Comenzar
          </Button>
        </div>
      </nav>
    </header>
  )
} 

