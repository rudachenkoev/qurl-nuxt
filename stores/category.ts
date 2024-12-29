import { getCategories as getCategoriesList } from '~/services/categoriesService'
import type { Category } from '~/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const getCategories = async (query?: Record<string, string | string[] | undefined>) => {
    try {
      categories.value = await getCategoriesList(query)
      return categories.value
    } catch (err) {
      useErrorHandler(err, 'Failed to fetch categories')
    }
  }

  const addCategory = (category: Category) => category && categories.value.push(category)

  const updateCategory = (category: Category) => {
    const index = categories.value.findIndex(value => value.id === category.id)
    if (index !== -1) categories.value.splice(index, 1, category)
  }

  const removeCategory = (id: number) => {
    const index = categories.value.findIndex(value => value.id === id)
    if (index !== -1) categories.value.splice(index, 1)
  }

  return { categories, getCategories, addCategory, updateCategory, removeCategory }
})
