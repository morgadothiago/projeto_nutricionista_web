import { useState, useEffect } from "react"
import { AxiosError } from "axios"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  skip?: boolean
}

export function useApi<T>(
  apiFunction: () => Promise<any>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: !options.skip,
    error: null,
  })

  const fetchData = async () => {
    if (options.skip) return

    setState({ data: null, loading: true, error: null })

    try {
      const response = await apiFunction()
      setState({ data: response.data, loading: false, error: null })
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao carregar dados"

      setState({ data: null, loading: false, error: errorMessage })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { ...state, refetch: fetchData }
}
