import { useEffect } from "react";
import { useApi } from "../context/ApiContext";
import MovieCard from "./MovieCard";

export default function MoviesList ( {movies} ) {

    return (
        <section className="pt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </section>
    )
}