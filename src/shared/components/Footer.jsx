import { Link } from "react-router-dom";
import { Film, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Cut!
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma definitiva para fanáticos del cine. Juega, compite y
              descubre.
            </p>
          </div>

          {/* Juegos */}
          <div className="space-y-4">
            <h4 className="font-semibold">Juegos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/games/versus"
                  className="hover:text-foreground transition-colors"
                >
                  Versus de Películas
                </Link>
              </li>
              <li>
                <Link
                  to="/games/director"
                  className="hover:text-foreground transition-colors"
                >
                  Quien la dirigió
                </Link>
              </li>
              <li>
                <Link
                  to="/games/timeline"
                  className="hover:text-foreground transition-colors"
                >
                  Línea del tiempo
                </Link>
              </li>
              <li>
                <Link
                  to="/games/movieclues"
                  className="hover:text-foreground transition-colors"
                >
                  Adivina la película
                </Link>
              </li>
              <li>
                <Link
                  to="/games/sixdegrees"
                  className="hover:text-foreground transition-colors"
                >
                  Conectados
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div className="space-y-4">
            <h4 className="font-semibold">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  className="hover:text-foreground transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="hover:text-foreground transition-colors"
                >
                  Centro de juegos
                </Link>
              </li>
              <li>
                <Link
                  to="/movies?endpoint=top_rated&page=1"
                  className="hover:text-foreground transition-colors"
                >
                  Explorar películas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Nosotros</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  className="hover:text-foreground transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Cut! Todos los derechos reservados.
            <span className="pl-4">
              {" "}
              Desarrollado por{" "}
              <a
                className="text-primary"
                href="https://github.com/AlbeerC"
                target="_blank"
              >
                Alberto Caminos
              </a>
            </span>
          </p>

          {/* Social links */}
          {/*           <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
