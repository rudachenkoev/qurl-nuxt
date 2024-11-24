export const useDirectoryStore = defineStore('directory', () => {
  const { $api } = useNuxtApp()

  const isDirectoriesLoaded = ref(false)
  const categories = ref([])

  const directories = [{ url: 'api/v1/categories', state: categories }]

  const getDirectories = async () => {
    try {
      const fetchPromises = directories.map(async ({ url, state }) => {
        state.value = await $api(url)
      })

      await Promise.all(fetchPromises)
    } catch (err) {
      useErrorHandler(err, 'Get directories error')
    } finally {
      isDirectoriesLoaded.value = true
    }
  }

  return { categories, getDirectories, isDirectoriesLoaded }
})
