<script setup lang="ts">
import type { DropdownItem, VerticalNavigationLink } from '#ui/types'
import type { Category } from '~/types'
import { deleteCategory } from '~/services/categoriesService'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'
import { useCategoryStore } from '~/stores/category'

const localeRoute = useLocaleRoute()
const route = useRoute()
const { t } = useI18n()
const toast = useToast()

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getCategories, removeCategory } = categoryStore
const { confirmationHandler } = useConfirmationDialogStore()

getCategories()

const categoryFormDialog = ref()

const getCategoryTitle = (category: Category) => {
  if (!category) return ''
  return category.isDefault ? t(`category.default.${category.name}`) : category.name
}

const categoriesLinks = ref<VerticalNavigationLink[]>([])

const updateCategoriesLinks = () => {
  categoriesLinks.value = (categories.value as Category[]).map((category, index) => {
    const link = localeRoute({ name: 'categories-id', params: { id: category.id } })
    return {
      ...category,
      label: getCategoryTitle(category),
      to: link,
      badge: 1,
      showActions: false,
      openActions: false,
      active: index === 1
      // active: link ? route.path.startsWith(link.path) : false
    }
  })
}

watch(categories, updateCategoriesLinks, { immediate: true })

const actions = (link: Category): DropdownItem[][] => {
  const result: DropdownItem[][] = [
    [
      {
        label: t('bookmark.create'),
        icon: 'i-heroicons-plus',
        click: () => navigateTo(localeRoute({ name: 'bookmarks-create', query: { categoryId: link.id } }))
      }
    ]
  ]

  if (!link.isDefault) {
    result.push([
      {
        label: t('btn.edit'),
        icon: 'i-heroicons-pencil-square',
        click: () => categoryFormDialog.value.openDialogWindow(link)
      },
      {
        label: t('btn.delete'),
        icon: 'i-heroicons-trash',
        click: () => handleCategoryDelete(link)
      }
    ])
  }

  return result
}

const handleCategoryDelete = async (category: Category) => {
  const isConfirm = await confirmationHandler({
    title: t('category.deleting'),
    description: t('category.deletingConfirmation', { name: category.name })
  })
  if (!isConfirm) return

  try {
    await deleteCategory(category.id)
    removeCategory(category.id)
    toast.add({ title: t('category.deleted') })
  } catch (err) {
    useErrorHandler(err, 'Error while category deleting')
  }
}
</script>

<template>
  <div class="py-3">
    <div class="mb-2 flex items-center justify-between px-3">
      <p class="text-sm dark:text-gallery-500">
        {{ $t('navigation.categories') }}
        <span class="font-light">({{ categories.length }})</span>
      </p>
      <UButtonGroup size="2xs" orientation="horizontal">
        <UButton icon="i-heroicons-plus" variant="outline" @click="categoryFormDialog.openDialogWindow()" />
        <UButton icon="i-heroicons-chevron-down-20-solid" />
      </UButtonGroup>
    </div>
    <UVerticalNavigation
      :links="categoriesLinks"
      :ui="{ base: 'before:rounded-none', label: 'w-full text-left', icon: { base: 'size-4' }, font: 'font-light' }"
    >
      <template #default="{ link }">
        <div class="relative w-full flex items-center justify-between" @mouseover="link.showActions = true" @mouseleave="link.showActions = false">
          <p class="h-6 flex items-center truncate">{{ link.label }}</p>
          <UDropdown v-show="link.showActions" :items="actions(link)" :popper="{ offsetDistance: 0 }">
            <UButton variant="ghost" size="2xs" icon="i-heroicons-ellipsis-horizontal" />
          </UDropdown>
        </div>
      </template>
    </UVerticalNavigation>

    <CategoryFormDialog ref="categoryFormDialog" />
  </div>
</template>

<style scoped></style>
