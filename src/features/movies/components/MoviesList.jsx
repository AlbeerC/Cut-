import { useEffect } from "react";
import { useApi } from "../context/ApiContext";
import MovieCard from "./MovieCard";

export default function MoviesList () {

    const { fetchMovies, movies, error, loading } = useApi()

    useEffect(() => {
        fetchMovies("top_rated", 1)
    }, [])

    if (loading && movies.length === 0) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <section className="pt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </section>
    )
}