import { getTopRatedMovies } from "./rated"
import { getMoviesByDecade } from "./decades"
import { getMoviesByGenre } from "./genre"
import { pickRandomMovies } from "../utils/pickRandomMovies"

export const getMoviesForVersus = async (category, size, genre, decade) => {
  let pool = []

  switch (category) {

    case "top_rated":
      pool = await getTopRatedMovies(60)
      break

    case "decade":
      pool = await getMoviesByDecade(decade.start, decade.end, 60)
      break

    case "genre":
      pool = await getMoviesByGenre(genre.id, 60)
      break

    default:
      pool = await getTopRatedMovies(60)
      break
  }

  return pickRandomMovies(pool, size)
}