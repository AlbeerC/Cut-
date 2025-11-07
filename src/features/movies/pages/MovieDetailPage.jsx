import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";

export default function MovieDetailPage() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const [esRes, enRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,images&language=es-MX`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=en-US`
          ),
        ]);

        if (!esRes.ok || !enRes.ok)
          throw new Error(`HTTP Error: ${esRes.status} / ${enRes.status}`);

        const [esData, enData] = await Promise.all([
          esRes.json(),
          enRes.json(),
        ]);

        // Combinamos: datos generales en español, pero título, póster y videos en inglés
        setMovie({
          ...esData,
          title: enData.title,
          original_title: enData.original_title,
          poster_path: enData.poster_path,
          videos: enData.videos, // 👈 videos en inglés
        });
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, apiKey]);

  if (loading) return <MovieDetailSkeleton />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return <MovieDetail movie={movie} error={error} />;
}
