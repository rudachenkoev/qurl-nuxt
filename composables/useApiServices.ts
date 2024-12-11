import type { UseFetchOptions } from 'nuxt/app'
import type { FormattedResponse, PaginatedResponse } from '~/types'
import type { TableRow } from '#ui/types'

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

export const isPaginatedResponse = (response: FormattedResponse | null | undefined): response is PaginatedResponse => {
  return response !== null && response !== undefined && 'results' in response && Array.isArray(response.results)
}

export const isNotPaginatedResponse = (response: FormattedResponse | null | undefined): response is TableRow[] => {
  return response !== null && response !== undefined && !('results' in response)
}
