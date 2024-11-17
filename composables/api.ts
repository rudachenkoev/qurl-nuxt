import type { UseFetchOptions } from 'nuxt/app'

export function useApi<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch
  })
}

export function useErrorHandler(err: unknown, context: string): void {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`${context}:`, message)
}
