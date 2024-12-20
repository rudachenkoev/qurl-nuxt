<script setup lang="ts">
import { useDirectoryStore } from '~/stores/directory'
import { useUserStore } from '~/stores/user'

const { currentBreakpoint } = useBreakpoint()
const directoryStore = useDirectoryStore()
const { getDirectories } = directoryStore
const { isDirectoriesLoaded } = storeToRefs(directoryStore)

const userStore = useUserStore()
const { getCurrentUserContacts } = userStore
const { isContactsLoaded } = storeToRefs(userStore)

Promise.all([!isDirectoriesLoaded.value && getDirectories(), !isContactsLoaded.value && getCurrentUserContacts()])
</script>

<template>
  <div class="h-screen bg-shark-100 md:p-4 dark:bg-shark-950">
    <div
      class="container mx-auto flex max-h-full gap-6 border-shark-200 bg-shark-50 md:rounded-xl md:border md:p-4 dark:border-shark-600 dark:bg-shark-900"
    >
      <LazyAppSidebar v-if="['md', 'lg', 'xl', '2xl'].includes(currentBreakpoint)" />
      <div
        class="grow overflow-auto border-shark-200 bg-white md:rounded-xl md:border dark:border-shark-600 dark:bg-shark-700"
      >
        <AppHeader />
        <main class="p-3">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
