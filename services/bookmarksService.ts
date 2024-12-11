import type { Bookmark } from '~/types'

export const getBookmark = (id: string | number): Promise<Bookmark> => {
  const { $api } = useNuxtApp()
  return $api(`api/v1/bookmarks/${id}/`)
}
