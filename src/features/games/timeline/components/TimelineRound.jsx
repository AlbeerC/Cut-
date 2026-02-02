import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { GripVertical, Award, Flame } from "lucide-react";
import { useTimelineContext } from "../context/TimelineContext";
import { useAsyncLock } from "../../hooks/useAsyncLock";

export default function TimelineRound() {
  const navigate = useNavigate();
  const { runSafe } = useAsyncLock();

  const {
    rounds,
    currentRound,
    options,
    setOptions,
    confirmRound,
    isLoading,
    totalPoints,
    currentCombo,
  } = useTimelineContext();

  const handleConfirm = async () => {
    runSafe(async () => {
      await confirmRound();
    });
    navigate("/games/timeline/result");
  };

  return (
    <div className="min-h-screen bg-background pt-30 px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold">
              Ordena de <span className="text-primary">vieja</span> a{" "}
              <span className="text-accent">nueva</span>
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {currentRound}/{rounds}
              </Badge>
              <Badge className="text-xs px-2 py-1 bg-primary">
                <Award className="w-3 h-3 mr-1" />
                {totalPoints}
              </Badge>
              {currentCombo > 0 && (
                <Badge className="text-xs px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
                  <Flame className="w-3 h-3 mr-1" />x{currentCombo}
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        <Reorder.Group
          axis="y"
          values={options}
          onReorder={setOptions}
          className="space-y-2 mb-4"
        >
          {options.map((movie, index) => (
            <Reorder.Item
              key={movie.id}
              value={movie}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card className="p-2 bg-card/80 backdrop-blur border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden bg-muted">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {movie.title}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity w-full"
            onClick={handleConfirm}
          >
            Confirmar Orden
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
