import type { TableRow } from '#ui/types'

export type Category = {
  id: number
  createdAt: string
  isDefault: boolean
  name: string
  updatedAt: string
}

export type PaginatedResponse = {
  totalCount: number
  totalPages: number
  results: TableRow[]
}
