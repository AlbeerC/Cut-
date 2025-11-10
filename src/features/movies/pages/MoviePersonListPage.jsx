import MoviesList from "../components/MoviesList";
import { useParams } from "react-router";
import { Award } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { getPersonMoviesById } from "../api/people";

export default function MoviePersonListPage() {
  const { role, personId, name } = useParams();
  const { data: movies, error, loading } = useFetch(() => getPersonMoviesById(personId, role), [personId, role]);

  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6 pt-20">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2 pt-8 max-md:flex-col">
        <Award className="w-7 h-7 text-primary" />
        Películas de{" "}
        <span className="text-primary">{name}</span>
      </h2>
      <MoviesList movies={movies} loading={loading} />
    </div>
  );
}
