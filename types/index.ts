import type { TableRow } from '#ui/types'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD'

export type SubmitAction = 'created' | 'edited'

export type PaginatedResponse = {
  totalCount: number
  totalPages: number
  results: TableRow[]
}

export type FormattedResponse = TableRow[] | PaginatedResponse

export type Category = {
  id: number
  icon: string
  createdAt: string
  isDefault: boolean
  name: string
  updatedAt: string
}

export type Bookmark = {
  id: number
  title: string
  description: string
  url: string
  categoryId: number | string | undefined
  createdAt: string
  updatedAt: string
  contacts: string[]
}

export type Channel = {
  channel: string
}

export type User = {
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  contactsSyncAt: string
}

export type Contact = {
  id: string
  externalId: string
  name: string
  birthday: string
  createdAt: string
  updatedAt: string
}
