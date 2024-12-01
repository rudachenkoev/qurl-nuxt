<script setup lang="ts">
import type { TableRow, DropdownItem } from '#ui/types'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'

const { t } = useI18n()
useHead({
  title: t('navigation.bookmarks')
})
definePageMeta({ middleware: ['auth'] })

const { $api } = useNuxtApp()
const route = useRoute()
const localeRoute = useLocaleRoute()
const toast = useToast()

const { confirmationHandler } = useConfirmationDialogStore()

const {
  data: categories,
  status,
  refresh: getCategories
} = await useLazyAsyncData<TableRow[]>(
  'categories',
  () => $api('api/v1/categories/', { query: setDefaultQuery(route.query) }),
  {
    watch: [() => route.query]
  }
)

const columns = [
  { key: 'categoryName', label: t('fields.name') },
  { key: 'createdAt', label: t('fields.createdAt') },
  { key: 'actions', class: 'w-9' }
]

const actions = (row: TableRow): DropdownItem[][] => {
  const result: DropdownItem[][] = [
    [
      {
        label: t('bookmark.create'),
        icon: 'i-heroicons-plus'
      }
    ]
  ]

  if (!row.isDefault) {
    result.push([
      {
        label: t('btn.edit'),
        icon: 'i-heroicons-pencil-square'
      },
      {
        label: t('btn.delete'),
        icon: 'i-heroicons-trash',
        click: () => handleCategoryDelete(row)
      }
    ])
  }

  return result
}

const handleCategoryDelete = async (category: TableRow) => {
  const isConfirm = await confirmationHandler({
    title: t('category.deleting'),
    description: t('category.deletingConfirmation', { category: category.name })
  })
  if (!isConfirm) return

  try {
    await $api(`api/v1/categories/${category.id}/`, { method: 'DELETE' })
    toast.add({ title: t('category.deleted') })
    await getCategories()
  } catch (err) {
    useErrorHandler(err, 'Error while category deleting')
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.bookmarks') }}</h1>
    <UButton
      :label="$t('category.create')"
      icon="i-heroicons-plus"
      :to="localeRoute({ name: 'bookmarks-categories-create' })"
    />
  </div>
  <AppTable :rows="categories || []" :columns="columns" :loading="status === 'pending'" :actions="actions" />
</template>

<style scoped></style>
