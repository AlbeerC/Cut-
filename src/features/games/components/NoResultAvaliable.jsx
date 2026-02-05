import { AlertCircle, Gamepad2, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NoResultAvaliable() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              No hay partida en progreso
            </h2>
            <p className="text-muted-foreground">
              Parece que intentaste acceder a los resultados directamente.
              Primero tenés que jugar una partida.
            </p>
          </div>

          {/* Icon Decoration */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-2 h-2 rounded-full bg-primary/30" />
            <Gamepad2 className="w-5 h-5 text-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => navigate("/games")}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              Ir a Juegos
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
              >
                <Home className="w-4 h-4" />
                Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
