import { createContext, useContext, useState } from "react"

const ApiContext = createContext()

export default function ApiProvider ( {children} ) {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchMovies = async (endpoint, page) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&api_key=${apiKey}&page=${page}`)

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }

            const result = await response.json()
            setMovies(result)
        } catch (error) {
            setError(error.message || "Uknkown error")
        } finally {
            setLoading(false)
        }
    }

    const value = {
        fetchMovies,
        movies, error, loading
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi () {
    const context = useContext(ApiContext)

    if (!context) {
        throw new Error ('UseTheme must be used inside <ApiProvider>')
    }

    return context
}