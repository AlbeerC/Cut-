import { createContext, useContext, useState } from "react"

const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {
  const [moviesState, setMoviesState] = useState({
    endpoint: "top_rated",
    page: 1,
    movies: { results: [] },
    scrollY: 0
  })

  return (
    <MoviesContext.Provider value={{ moviesState, setMoviesState }}>
      {children}
    </MoviesContext.Provider>
  )
}

export const useMoviesContext = () => useContext(MoviesContext)
