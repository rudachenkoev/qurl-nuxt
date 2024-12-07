<script setup lang="ts">
import type { TableRow, DropdownItem } from '#ui/types'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'
import type { Bookmark, PaginatedResponse } from '~/types'

type ExtendedBookmark = TableRow & Bookmark

const { t } = useI18n()
useHead({
  title: t('navigation.bookmarks')
})
definePageMeta({ middleware: ['auth'] })

const { $api } = useNuxtApp()
const route = useRoute()
const toast = useToast()
const localeRoute = useLocaleRoute()

const { confirmationHandler } = useConfirmationDialogStore()

const {
  data: bookmarks,
  status,
  refresh: getBookmarks
} = await useLazyAsyncData<PaginatedResponse>(
  'bookmarks',
  () => $api('api/v1/bookmarks/', { query: setDefaultQuery(route.query) }),
  {
    watch: [() => route.query]
  }
)

const columns = [
  { key: 'title', label: t('fields.title.label') },
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
    await $api(`api/v1/bookmarks/${bookmark.id}/`, { method: 'DELETE' })
    toast.add({ title: t('bookmark.deleted') })
    await getBookmarks()
  } catch (err) {
    useErrorHandler(err, 'Error while bookmark deleting')
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.bookmarks') }}</h1>
    <UButton :label="$t('bookmark.create')" icon="i-heroicons-plus" :to="localeRoute({ name: 'bookmarks-create' })" />
  </div>
  <AppTable
    :rows="bookmarks?.results || []"
    :total-count="bookmarks?.totalCount || 0"
    :columns="columns"
    :loading="status === 'pending'"
    :actions="actions"
  />
</template>
