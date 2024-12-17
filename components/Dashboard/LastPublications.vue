<script setup lang="ts">
import { deleteBookmark, getBookmarks } from '~/services/bookmarksService'
import type { Bookmark, FormattedResponse } from '~/types'
import type { DropdownItem, TableRow } from '#ui/types'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'

type ExtendedBookmark = Bookmark & TableRow

const { t } = useI18n()
const toast = useToast()
const localeRoute = useLocaleRoute()

const { confirmationHandler } = useConfirmationDialogStore()

const { data: lastPublications, status } = await useLazyAsyncData<FormattedResponse>('lastPublications', () =>
  getBookmarks({ ordering: 'createdAt' })
)

const columns = [
  { key: 'bookmarkTitle', label: t('fields.title.label') },
  { key: 'categoryId', label: t('fields.category.label') },
  { key: 'createdAt', label: t('fields.createdAt.label') },
  { key: 'actions', class: 'w-9' }
]

const actions = (row: ExtendedBookmark): DropdownItem[][] => [
  [
    {
      label: t('btn.edit'),
      icon: 'i-heroicons-pencil-square',
      click: () => navigateTo(localeRoute({ name: 'bookmarks-id-edit', params: { id: row.id } }))
    },
    {
      label: t('btn.delete'),
      icon: 'i-heroicons-trash',
      click: () => handleBookmarkDelete(row)
    }
  ]
]

const handleBookmarkDelete = async (bookmark: ExtendedBookmark) => {
  const isConfirm = await confirmationHandler({
    title: t('bookmark.deleting'),
    description: t('bookmark.deletingConfirmation', { title: bookmark.title })
  })
  if (!isConfirm) return

  try {
    await deleteBookmark(bookmark.id)
    toast.add({ title: t('bookmark.deleted') })
    await refreshBookmarks()
  } catch (err) {
    useErrorHandler(err, 'Error while bookmark deleting')
  }
}
</script>

<template>
  <div class="grow">
    <h3 class="mb-3 text-xl font-medium">{{ $t('lastPublications') }}</h3>
    <AppTable
      :rows="isNotPaginatedResponse(lastPublications) ? lastPublications : []"
      :columns="columns"
      :loading="status === 'pending'"
      :actions="actions"
    />
  </div>
</template>

<style scoped></style>
