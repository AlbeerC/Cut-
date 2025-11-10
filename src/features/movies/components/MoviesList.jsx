import { useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MoviesList({ movies, loading }) {

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {loading && movies?.results?.length === 0 ? (
        Array(20).fill(0).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))
      ) : (
        movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </section>
  );
}
