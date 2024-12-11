import type { NitroFetchOptions } from 'nitropack'
import type { HttpMethod } from '~/types'

export const useApiCall = async <T>(
  endpoint: string,
  options: Partial<NitroFetchOptions<HttpMethod>> = {}
): Promise<T> => {
  const { $api } = useNuxtApp()
  return $api(endpoint, options)
}
