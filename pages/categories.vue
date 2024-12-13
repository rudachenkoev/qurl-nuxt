<script setup lang="ts">
import type { TableRow, DropdownItem } from '#ui/types'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'
import type { Category, FormattedResponse, SubmitAction } from '~/types'
import { deleteCategory, getCategories } from '~/services/categoriesService'

type ExtendedCategory = TableRow & Category

definePageMeta({ middleware: ['auth'], title: 'navigation.categories' })
const { t } = useI18n()
useHead({
  title: t('navigation.categories')
})

const route = useRoute()
const toast = useToast()
const localeRoute = useLocaleRoute()

const { confirmationHandler } = useConfirmationDialogStore()

const categoryFormDialog = ref()

const {
  data: categories,
  status,
  refresh: refreshCategories
} = await useLazyAsyncData<FormattedResponse>('categories', () => getCategories(setDefaultQuery(route.query)), {
  watch: [() => route.query]
})

const columns = [
  { key: 'categoryName', label: t('fields.name.label') },
  { key: 'createdAt', label: t('fields.createdAt.label') },
  { key: 'actions', class: 'w-9' }
]

const actions = (row: ExtendedCategory): DropdownItem[][] => {
  const result: DropdownItem[][] = [
    [
      {
        label: t('bookmark.create'),
        icon: 'i-heroicons-plus',
        click: () => navigateTo(localeRoute({ name: 'bookmarks-create', query: { categoryId: row.id } }))
      }
    ]
  ]

  if (!row.isDefault) {
    result.push([
      {
        label: t('btn.edit'),
        icon: 'i-heroicons-pencil-square',
        click: () => categoryFormDialog.value.openDialogWindow(row)
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

const handleCategoryDelete = async (category: ExtendedCategory) => {
  const isConfirm = await confirmationHandler({
    title: t('category.deleting'),
    description: t('category.deletingConfirmation', { name: category.name })
  })
  if (!isConfirm) return

  try {
    await deleteCategory(category.id)
    toast.add({ title: t('category.deleted') })
    await refreshCategories()
  } catch (err) {
    useErrorHandler(err, 'Error while category deleting')
  }
}

const handleCategoryUpdate = ({ action, response }: { action: SubmitAction; response: Category }) => {
  if (action === 'created') {
    refreshCategories()
  } else if (action === 'edited' && categories.value && isPaginatedResponse(categories.value)) {
    const index = categories.value.results.findIndex(category => category.id === response.id)
    if (index !== -1) categories.value.results.splice(index, 1, response)
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.bookmarks') }}</h1>
    <UButton :label="$t('category.create')" icon="i-heroicons-plus" @click="categoryFormDialog.openDialogWindow()" />
    <CategoryFormDialog ref="categoryFormDialog" @onSuccess="handleCategoryUpdate" />
  </div>
  <AppTable
    :rows="isPaginatedResponse(categories) ? categories.results : []"
    :total-count="isPaginatedResponse(categories) ? categories.totalCount : 0"
    :columns="columns"
    :loading="status === 'pending'"
    :actions="actions"
  />
</template>
