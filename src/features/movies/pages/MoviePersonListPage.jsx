import MoviesList from "../components/MoviesList";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Award } from "lucide-react";

export default function MoviePersonListPage() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const { role, personId, name } = useParams();

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function filterOfficialMovies(movies) {
    return movies
      .filter(
        (movie) =>
          movie.media_type === "movie" || // asegurarte que sea película
          (!movie.media_type && movie.title) // algunos no traen media_type pero sí title
      )
      .filter(
        (movie) =>
          !movie.genre_ids?.includes(99) && // 99 = Documental
          !movie.genre_ids?.includes(10770) && // 10770 = Película de TV
          movie.vote_count > 50 && // tiene cierta relevancia
          movie.release_date && // tiene fecha de lanzamiento
          new Date(movie.release_date) < new Date() // ya se estrenó
      );
  }

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const rawMovies =
          role === "actor"
            ? data.cast
            : data.crew.filter((c) => c.job === "Director");

        const filtered = filterOfficialMovies(rawMovies);

        // opcional: ordenarlas por año
        setMovies(filtered);
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [personId]);

  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6 pt-20">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2 py-5 max-md:flex-col">
        <Award className="w-7 h-7 text-primary" />
        Películas de{" "}
        <span className="text-primary">{name}</span>
      </h2>
      <MoviesList movies={movies} loading={loading} />
    </div>
  );
}
