import { useRef } from "react"

export function useAsyncLock() {
  const lockedRef = useRef(false)

  const runSafe = async (fn) => {
    if (lockedRef.current) return
    lockedRef.current = true

    try {
      await fn()
    } catch (err) {
      console.error("[useAsyncLock] Error:", err)
      throw err
    } finally {
      lockedRef.current = false
    }
  }

  return { runSafe }
}
