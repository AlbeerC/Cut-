import { useState, useEffect } from "react"

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!fetchFunction || typeof fetchFunction !== "function") return

    const controller = new AbortController()
    const signal = controller.signal

    setLoading(true)
    setError(null)

    const fetchData = async () => {
      try {
        const result = await fetchFunction(signal)
        setData(result)
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message || "Unknown error")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, dependencies)

  return { data, error, loading }
}
