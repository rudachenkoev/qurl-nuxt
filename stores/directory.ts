export type DirectoryItem = {
  id: number
  [key: string]: any
}

export const useDirectoryStore = defineStore('directory', () => {
  const { $api } = useNuxtApp()

  const isDirectoriesLoaded = ref(false)
  const categories = ref<DirectoryItem[]>([])

  const directories = {
    categories
  }

  const directoriesInfo = [{ url: 'api/v1/categories', state: categories }]

  const getDirectories = async (): Promise<void> => {
    try {
      const fetchPromises = directoriesInfo.map(async ({ url, state }) => {
        state.value = await $api(url)
      })

      await Promise.all(fetchPromises)
    } catch (err) {
      useErrorHandler(err, 'Get directories error')
    } finally {
      isDirectoriesLoaded.value = true
    }
  }

  const getDirectoryByKey = <T extends keyof typeof directories>(
    directoryName: T,
    value: any,
    key = 'id'
  ): DirectoryItem | null => {
    if (!isDirectoriesLoaded.value) return null

    const directoryRef = directories[directoryName]

    if (!directoryRef) {
      console.error(`Directory with name ${directoryName} not found`)
      return null
    }

    return directoryRef.value.find(item => item[key] === value) || null
  }

  return { categories, getDirectories, getDirectoryByKey, isDirectoriesLoaded }
})
