export type DirectoryItem = {
  id: number
  [key: string]: any
}

export const useDirectoryStore = defineStore('directory', () => {
  const directoryExample = ref<DirectoryItem[]>([
    { id: 1, name: '' }
  ])

  const directories = {
    directoryExample
  }

  const getDirectoryByKey = <T extends keyof typeof directories>(
    directoryName: T,
    value: any,
    key = 'id'
  ): DirectoryItem | null => {
    const directoryRef = directories[directoryName]

    if (!directoryRef) {
      console.error(`Directory with name ${directoryName} not found`)
      return null
    }

    return directoryRef.value.find(item => item[key] === value) || null
  }

  return { ...directories, getDirectoryByKey }
})
