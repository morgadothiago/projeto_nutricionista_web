import { useState, useEffect, useRef } from "react"
import { AxiosError, AxiosResponse } from "axios"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  skip?: boolean
}

export function useApi<T>(
  apiFunction: () => Promise<AxiosResponse<T>>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: !options.skip,
    error: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = async () => {
    if (options.skip) return

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new AbortController
    abortControllerRef.current = new AbortController()

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiFunction()

      // Only update state if not aborted
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setState({ data: response.data, loading: false, error: null })
      }
    } catch (err) {
      // Don't update state if request was aborted
      if (abortControllerRef.current && abortControllerRef.current.signal.aborted) {
        return
      }

      const error = err as AxiosError<{ message?: string }>
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao carregar dados"

      setState({ data: null, loading: false, error: errorMessage })
    }
  }

  useEffect(() => {
    if (!options.skip) {
      fetchData()
    }

    // Cleanup: abort on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.skip])

  return { ...state, refetch: fetchData }
}
