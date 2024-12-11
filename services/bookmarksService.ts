import type { Bookmark, FormattedResponse } from '~/types'
import { useApiCall } from '~/services/index'

export const getBookmarks = (query: Record<string, any>) =>
  useApiCall<FormattedResponse>('api/v1/bookmarks/', { query })

export const getBookmark = (id: string | number) => useApiCall<Bookmark>(`api/v1/bookmarks/${id}/`)

export const createBookmark = (data: Partial<Bookmark>) =>
  useApiCall<Bookmark>('api/v1/bookmarks/', { method: 'POST', body: data })

export const updateBookmark = (id: string | number, data: Partial<Bookmark>) =>
  useApiCall<Bookmark>(`api/v1/bookmarks/${id}/`, { method: 'PATCH', body: data })

export const deleteBookmark = (id: string | number) => useApiCall<any>(`api/v1/bookmarks/${id}/`, { method: 'DELETE' })

export const getBookmarkAutocompleteData = (data: { url: string }) =>
  useApiCall<Partial<Bookmark>>(`api/v1/bookmarks/autocomplete-url-data/`, { method: 'POST', body: data })
