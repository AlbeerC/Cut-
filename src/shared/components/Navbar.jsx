import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ProfileButton } from "@/features/auth/components/ProfileButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (profile?.username) {
      navigate(`/profile/${profile.username}`);
    } else {
      navigate("/login");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/games"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Juegos
          </Link>
          <Link
            to="/movies?endpoint=top_rated&page=1"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Explorar
          </Link>
          {/*           <Link
            to="#torneos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Torneos
          </Link> */}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            // Skeleton loading state - evita el flicker
            <div className="flex items-center gap-3">
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
              <div className="h-9 w-9 bg-muted animate-pulse rounded-full" />
            </div>
          ) : profile ? (
            // Usuario autenticado
            <>
              <ProfileButton onClick={handleProfileClick} />
            </>
          ) : (
            // Usuario no autenticado
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Login
              </Button>
              {/*               <Button
                size="sm"
                onClick={() => navigate("/register")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Comenzar
              </Button> */}
            </>
          )}
        </div>

        {/* Mobile: Profile Button + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {!loading && <ProfileButton onClick={handleProfileClick} />}

          <button
            className="p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg border-t border-border/40">
          <div className="flex flex-col gap-4 p-4">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              Inicio
            </Link>
            <Link
              to="/games"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              Juegos
            </Link>
            <Link
              to="/movies?endpoint=top_rated&page=1"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              Explorar
            </Link>
            {/*             <Link
              to="#torneos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeMobileMenu}
            >
              Torneos
            </Link> */}

            {/* Separador visual */}
            <div className="border-t border-border/40 my-2" />

            {loading ? (
              // Loading state en mobile
              <div className="flex flex-col gap-2">
                <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
                <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
              </div>
            ) : profile ? (
              // Usuario autenticado
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigate("/profile");
                    closeMobileMenu();
                  }}
                >
                  Mi Perfil
                </Button>
              </>
            ) : (
              // Usuario no autenticado
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                >
                  Login
                </Button>
                {/*                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  onClick={() => {
                    navigate("/register");
                    closeMobileMenu();
                  }}
                >
                  Comenzar
                </Button> */}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
