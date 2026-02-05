import { useRouteError, useNavigate } from "react-router-dom"
import { Home, SearchX, AlertCircle, Film, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.error(error)

  const is404 = error?.status === 404 || error?.statusText === "Not Found"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <div className="relative w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              {is404 ? (
                <SearchX className="w-12 h-12 text-primary" />
              ) : (
                <AlertCircle className="w-12 h-12 text-primary" />
              )}
            </div>
          </div>
        </div>

        {/* Error Content */}
        {is404 ? (
          <>
            {/* 404 Specific */}
            <div className="space-y-2">
              <h1 className="text-8xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold">
                Página no encontrada
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Esta página no existe o fue movida. Parece que te perdiste en el set de filmación.
            </p>

            {/* Movie References */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
              <Film className="w-4 h-4" />
              <span>Error 404: Esta escena fue cortada en la edición final</span>
            </div>
          </>
        ) : (
          <>
            {/* General Error */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                ¡Ups! Algo salió mal
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Ocurrió un error inesperado. No te preocupes, nuestro equipo ya está trabajando en solucionarlo.
            </p>

            {/* Error Details (solo en desarrollo) */}
            {import.meta.env.DEV && error?.message && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                <p className="text-xs font-mono text-red-400 mb-2">
                  <strong>Error (solo visible en desarrollo):</strong>
                </p>
                <pre className="text-xs text-red-300 overflow-x-auto whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300">
                      Ver stack trace
                    </summary>
                    <pre className="text-xs text-red-300/70 mt-2 overflow-x-auto whitespace-pre-wrap break-words">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            ¿Necesitás ayuda?{" "}
            <button 
              onClick={() => navigate("/contact")}
              className="text-primary hover:underline font-medium"
            >
              Contactanos
            </button>
          </p>
        </div>
      </div>

      {/* Decorative Film Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
    </div>
  )
}