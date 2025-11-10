import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";
import { useFetch } from "../hooks/useFetch";
import { getMovieByid } from "../api/movies";

export default function MovieDetailPage() {
  const { id } = useParams();

  const { data: movie, error, loading } = useFetch(() => getMovieByid(id), [id]);

  if (loading) return <MovieDetailSkeleton />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return <MovieDetail movie={movie} error={error} />;
}
