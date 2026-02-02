import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import demo1 from "../../../shared/assets/demo1.png";
import demo2 from "../../../shared/assets/demo2.png";
import demo3 from "../../../shared/assets/demo3.png";
import demo4 from "../../../shared/assets/demo4.png";

// Datos de ejemplo para las slides - reemplaza con tus imágenes reales
const demoSlides = [
  {
    title: "Batalla de películas",
    description: "Enfrenta películas en duelos épicos. Elige tu favorita en cada ronda hasta coronar a la ganadora definitiva.",
    image: demo1,
    step: "01"
  },
  {
    title: "Cuanto conoces sobre directores?",
    description: "Adivina quién está detrás de cámara. Conecta películas icónicas con sus directores.",
    image: demo2,
    step: "02"
  },
  {
    title: "Línea del tiempo",
    description: "Ordena 4 películas según su año de estreno. ¿Cuánto conoces sobre la historia del cine?",
    image: demo3,
    step: "03"
  },
  {
    title: "Conecta actores",
    description: "Conecta dos actores a través de películas compartidas. ¿Cómo se conectan los actores?",
    image: demo4,
    step: "04"
  }
];

export default function GameDemoModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10 flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Slides Container */}
              <div className="relative flex-1 overflow-hidden min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex flex-col"
                  >
                    {/* Image Side */}
                    <div className="relative w-full h-48 md:h-80 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <img
                        src={demoSlides[currentSlide].image}
                        alt={demoSlides[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                      {/* Step Number Overlay */}
                      <div className="absolute top-6 left-6">
                        <div className="text-8xl md:text-9xl font-black text-white/10 select-none">
                          {demoSlides[currentSlide].step}
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-6 flex flex-col justify-center overflow-y-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Step Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Juego {demoSlides[currentSlide].step}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                          {demoSlides[currentSlide].title}
                        </h2>

                        {/* Description */}
                        <p className="text-md md:text-lg text-slate-300 leading-relaxed">
                          {demoSlides[currentSlide].description}
                        </p>

                        {/* Progress Indicator */}
                        <div className="flex gap-2 mt-8">
                          {demoSlides.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className="group relative"
                            >
                              <div
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  index === currentSlide
                                    ? "w-12 bg-primary"
                                    : "w-8 bg-white/20 group-hover:bg-white/40"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-4 md:p-6 flex items-center justify-between shrink-0">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={prevSlide}
                  className="text-white hover:bg-white/10 gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Anterior</span>
                </Button>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 font-medium">
                    {currentSlide + 1} / {demoSlides.length}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={nextSlide}
                  className="text-white hover:bg-white/10 gap-2"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}