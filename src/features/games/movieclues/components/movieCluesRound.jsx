"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Search,
  ImageIcon,
  Film,
  ChevronRight,
  Loader2,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMovieCluesContext } from "../context/MovieCluesContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAsyncLock } from "../../hooks/useAsyncLock";

export default function MovieCluesRound() {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    currentRound,
    rounds,
    currentMovie,
    backdrops,
    currentBackdrop,
    currentImageIndex,
    maxImages,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedMovie,
    showResult,
    isCorrect,
    inputLocked,
    score,
    totalPoints,
    roundPoints,
    possiblePoints,
    hasMoreImages,
    isLoadingBackdrops,
    searchMovies,
    selectMovieFromSearch,
    confirmAnswer,
    nextImage,
    nextRound,
    roundData,
    isLastRound,
    giveUp,
  } = useMovieCluesContext();

  const { runSafe } = useAsyncLock();

  useEffect(() => {
    if (!roundData || roundData.length === 0) {
      navigate("/games/movieclues");
    }
  }, [roundData, navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchMovies(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (!currentMovie || isLoadingBackdrops) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Cargando escenas...</p>
        </div>
      </div>
    );
  }

  // Si no hay backdrops, mostrar mensaje
  if (backdrops.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 text-center max-w-md">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            Sin escenas disponibles
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Esta pelicula no tiene escenas disponibles. Pasando a la siguiente
            ronda...
          </p>
          <Button onClick={() => nextRound()} className="bg-primary">
            Siguiente Ronda
          </Button>
        </Card>
      </div>
    );
  }
  const handleNext = async () => {
    if (isLastRound) {
      runSafe(async () => {
        await nextRound();
      });
      navigate("/games/movieclues/finish");
    } else {
      runSafe(async () => {
        await nextRound();
      });
      navigate("/games/movieclues/play");
    }
  };

  const handleConfirm = () => {
    if (!selectedMovie || inputLocked) return;
    runSafe(async () => {
      await confirmAnswer();
    });
  };

  const handleNextImage = () => {
    nextImage();
  };

  // Cantidad real de imagenes disponibles (maximo 3)
  const totalAvailableImages = Math.min(maxImages, backdrops.length);

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden pt-25">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-3 lg:px-6 py-3 pb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground">
              Ronda {currentRound}/{rounds}
            </span>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Badge
                variant="secondary"
                className="text-xs lg:text-sm px-2 py-0.5"
              >
                {score} correctas
              </Badge>
              <Badge className="text-xs lg:text-sm px-2 py-0.5 bg-primary">
                {totalPoints} pts
              </Badge>
            </div>
          </div>
          <Progress value={(currentRound / rounds) * 100} className="h-1.5" />
        </div>

        {/* Main Content - Desktop: grid de 2 columnas, Mobile: vertical */}
        <div className="flex-1 overflow-y-auto px-3 lg:px-6 pb-3">
          <div className="lg:h-full grid lg:grid-cols-2 gap-3 lg:gap-6 lg:items-center">
            {/* Scene Image Section */}
            <div className="flex flex-col lg:justify-center">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <span className="text-sm lg:text-base font-medium">
                    Escena {currentImageIndex + 1}/{totalAvailableImages}
                  </span>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs lg:text-sm px-2 lg:px-3 py-0.5">
                  {possiblePoints} pts
                </Badge>
              </div>

              {/* Scene Image */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full aspect-video rounded-lg lg:rounded-xl overflow-hidden bg-muted shadow-lg"
              >
                {currentBackdrop && (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${currentBackdrop.file_path}`}
                    alt="Escena de la pelicula"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>

              {/* Compact Image Indicators */}
              <div className="flex items-center justify-center gap-1.5 lg:gap-2 mt-2 lg:mt-3">
                {Array.from({ length: totalAvailableImages }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                      idx === currentImageIndex
                        ? "bg-primary text-primary-foreground"
                        : idx < currentImageIndex
                          ? "bg-muted text-muted-foreground line-through"
                          : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {idx === 0 ? 150 : idx === 1 ? 100 : 75}
                  </div>
                ))}
              </div>
            </div>

            {/* Search and Results Section */}
            <div className="flex flex-col gap-2 lg:gap-3 lg:justify-center lg:max-w-xl lg:mx-auto lg:w-full">
              {/* Search Input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Escribe el nombre de la pelicula..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                  disabled={inputLocked || showResult}
                  className="pr-10 h-10 lg:h-12 text-sm lg:text-base"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchFocused &&
                    searchResults.length > 0 &&
                    !selectedMovie && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-xl max-h-48 lg:max-h-64 overflow-y-auto"
                      >
                        {searchResults.map((movie) => (
                          <button
                            key={movie.id}
                            onClick={() => selectMovieFromSearch(movie)}
                            className="w-full p-2 lg:p-3 flex items-center gap-2 lg:gap-3 hover:bg-muted transition-colors text-left bg-background"
                          >
                            <div className="w-7 h-10 lg:w-9 lg:h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                              {movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Film className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm lg:text-base font-medium truncate">
                                {movie.title}
                              </p>
                              <p className="text-xs lg:text-sm text-muted-foreground">
                                {movie.release_date?.slice(0, 4) || "N/A"}
                              </p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              {/* Selected Movie */}
              {selectedMovie && !showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="p-2 lg:p-3 rounded-lg border border-primary/50 bg-primary/5 flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-11 lg:w-10 lg:h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                      {selectedMovie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
                          alt={selectedMovie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm lg:text-base truncate">
                        {selectedMovie.title}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        {selectedMovie.release_date?.slice(0, 4) || "N/A"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Result Message */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className={`p-3 lg:p-4 rounded-lg text-center ${
                        isCorrect
                          ? "bg-green-500/10 border border-green-500/50"
                          : "bg-red-500/10 border border-red-500/50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                        <div
                          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? (
                            <Check
                              className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                              strokeWidth={3}
                            />
                          ) : (
                            <X
                              className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold">
                          {isCorrect ? "¡Correcto!" : "Incorrecto"}
                        </h3>
                      </div>

                      {isCorrect ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xs lg:text-sm text-muted-foreground truncate max-w-[200px] lg:max-w-none">
                            {currentMovie.title}
                          </span>
                          <Badge className="text-sm lg:text-base px-2 lg:px-3 py-0.5 bg-primary">
                            +{roundPoints}
                          </Badge>
                        </div>
                      ) : hasMoreImages ? (
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Intenta con la siguiente escena
                        </p>
                      ) : (
                        <p className="text-xs lg:text-sm">
                          <span className="text-muted-foreground">Era: </span>
                          <span className="font-semibold">
                            {currentMovie.title}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            ({currentMovie.release_date?.slice(0, 4)})
                          </span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Button */}
        <div className="flex-shrink-0 px-3 lg:px-6 py-3 pt-2 border-t border-border/50 bg-background">
          <div className="max-w-xl mx-auto">
            {!showResult ? (
              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={giveUp}
                  className="flex-shrink-0 h-11 px-4 border-muted-foreground/30 bg-red"
                >
                  <Flag className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  disabled={!selectedMovie || inputLocked}
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 h-11"
                >
                  Confirmar Respuesta
                </Button>
              </div>
            ) : isCorrect ? (
              <Button
                size="lg"
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold h-11 lg:h-12 text-sm lg:text-base"
              >
                {currentRound >= rounds ? "Ver Resultados" : "Siguiente Ronda"}
              </Button>
            ) : hasMoreImages ? (
              <Button
                size="lg"
                onClick={handleNextImage}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold h-11 lg:h-12 text-sm lg:text-base"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Ver Siguiente Escena
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold h-11 lg:h-12 text-sm lg:text-base"
              >
                {currentRound >= rounds ? "Ver Resultados" : "Siguiente Ronda"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
