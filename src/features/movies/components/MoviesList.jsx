import { useEffect } from "react";
import { useApi } from "../context/ApiContext";

export default function MoviesList () {

    const { fetchMovies, movies, error, loading } = useApi()

    useEffect(() => {
        fetchMovies("top_rated", 1)
    }, [])

    return (
        <section className="pt-20">
            {movies?.results?.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                </div>
            ))}
        </section>
    )
}