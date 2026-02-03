import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPoints } from "@/shared/utils/formatPoints";
import { useNavigate } from "react-router";
import { getAvatarPublicUrl } from "@/features/auth/api/profile.api";

const USERS_PER_PAGE = 10;

export default function FullRankingModal({ isOpen, onClose, ranking }) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Calcular paginación
  const totalPages = Math.ceil(ranking.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentRanking = ranking.slice(startIndex, endIndex);

  const handlePlayerClick = (username) => {
    navigate(`/profile/${username}`);
    onClose(); // Cerrar modal después de navegar
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Generar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10 flex flex-col max-h-[calc(100vh-2rem)] md:h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="flex-shrink-0 p-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Ranking Completo
                  </h2>
                  <p className="text-sm text-slate-400">
                    Top {ranking.length} jugadores esta semana
                  </p>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {currentRanking.map((player) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (player.rank - startIndex - 1) * 0.05 }}
                    onClick={() => handlePlayerClick(player.username)}
                    className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
                  >
                    {/* Rank Badge */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        player.rank === 1
                          ? "bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/50"
                          : player.rank === 2
                            ? "bg-slate-400/20 text-slate-300 border-2 border-slate-400/50"
                            : player.rank === 3
                              ? "bg-amber-600/20 text-amber-500 border-2 border-amber-600/50"
                              : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {player.rank}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-white/10">
                      <AvatarImage src={getAvatarPublicUrl(player.avatar_url)} alt={player.username} />
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {player.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm group-hover:text-primary transition-colors truncate">
                        {player.username}
                      </div>
                      <div className="text-xs text-slate-400">
                        {formatPoints(player.points)} puntos
                      </div>
                    </div>

                    {/* Medal for Top 3 */}
                    {player.rank <= 3 && (
                      <Award
                        className={`w-5 h-5 flex-shrink-0 ${
                          player.rank === 1
                            ? "text-yellow-400"
                            : player.rank === 2
                              ? "text-slate-300"
                              : "text-amber-500"
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {ranking.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Trophy className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400 text-center mb-1">
                    El ranking semanal está vacío por ahora.
                  </p>
                  <p className="text-slate-500 text-sm text-center">
                    Jugá y estrená la tabla esta semana 🎬
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div className="flex-shrink-0 border-t border-white/10 bg-black/20 backdrop-blur-md p-4">
                <div className="flex items-center justify-between">
                  {/* Previous Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === "number" && goToPage(page)}
                        disabled={page === "..."}
                        className={`min-w-[32px] h-8 rounded-md text-sm font-medium transition-all ${
                          page === currentPage
                            ? "bg-primary text-primary-foreground"
                            : page === "..."
                              ? "text-slate-500 cursor-default"
                              : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-2">
                  <span className="text-xs text-slate-400">
                    Página {currentPage} de {totalPages} • Mostrando {startIndex + 1}-
                    {Math.min(endIndex, ranking.length)} de {ranking.length} jugadores
                  </span>
                </div>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}