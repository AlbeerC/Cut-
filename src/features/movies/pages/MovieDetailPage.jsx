import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";
import { useFetch } from "../hooks/useFetch";
import { getMovieByid } from "../api/movies";
import { getReviewsById } from "../api/reviews";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";

export default function MovieDetailPage() {
  const { id } = useParams();

  const { data: movie, error, loading } = useFetch(() => getMovieByid(id), [id]);

  const { data: reviews, error: reviewsError, loading: reviewsLoading } = useFetch(() => getReviewsById(id), [id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  if (loading) return <MovieDetailSkeleton />
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found</p>;

  return <MovieDetail movie={movie} reviews={reviews} reviewsLoading={reviewsLoading} reviewsError={reviewsError} />;
}
