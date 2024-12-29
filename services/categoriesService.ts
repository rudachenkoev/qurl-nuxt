import type { Category, FormattedResponse } from '~/types'
import { useApiCall } from '~/services/index'

export const getCategories = (query?: Record<string, any>) =>
  useApiCall<FormattedResponse>('api/v1/categories/', { query })

export const getCategory = (id: string | number) => useApiCall<Category>(`api/v1/categories/${id}/`)

export const createBookmark = (data: Partial<Category>) =>
  useApiCall<Category>('api/v1/categories/', { method: 'POST', body: data })

export const updateBookmark = (id: string | number, data: Partial<Category>) =>
  useApiCall<Category>(`api/v1/categories/${id}/`, { method: 'PATCH', body: data })

export const deleteCategory = (id: string | number) => useApiCall<any>(`api/v1/categories/${id}/`, { method: 'DELETE' })
