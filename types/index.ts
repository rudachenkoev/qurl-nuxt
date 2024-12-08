import type { TableRow } from '#ui/types'
import type { RouteLocationAsRelativeGeneric } from 'vue-router'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type SubmitAction = 'created' | 'edited'

export type SubmitConfig = {
  apiPath: string
  method: HttpMethod
  action: SubmitAction
  navigateToParams?:
    | string
    | number
    | symbol
    | (Omit<RouteLocationAsRelativeGeneric, 'path'> & { path?: string | undefined })
}

export type PaginatedResponse = {
  totalCount: number
  totalPages: number
  results: TableRow[]
}

export type Category = {
  id: number
  createdAt: string
  isDefault: boolean
  name: string
  updatedAt: string
}

export type Contact = {
  id: string
  externalId: string
  name: string
  birthday: string
  createdAt: string
  updatedAt: string
}

export type Bookmark = {
  id: number
  title: string
  description: string
  url: string
  categoryId: number | undefined
  createdAt: string
  updatedAt: string
  contacts: number[]
}
