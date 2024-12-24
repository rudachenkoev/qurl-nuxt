<script setup lang="ts">
import { useDirectoryStore } from '~/stores/directory'
import { useUserStore } from '~/stores/user'

const { checkBreakpoint } = useBreakpoint()
const directoryStore = useDirectoryStore()
const { getDirectories } = directoryStore
const { isDirectoriesLoaded } = storeToRefs(directoryStore)

const userStore = useUserStore()
const { getCurrentUserContacts } = userStore
const { user, isContactsLoaded } = storeToRefs(userStore)

Promise.all([
  !isDirectoriesLoaded.value && getDirectories(),
  user.value?.contactsSyncAt && !isContactsLoaded.value && getCurrentUserContacts()
])
</script>

<template>
  <div class="h-screen bg-gallery-100 md:p-3 dark:bg-gallery-950">
    <div
      class="container mx-auto flex h-full max-h-full gap-4 border-gallery-200 bg-gallery-50 md:h-auto md:rounded-xl md:border md:p-3 dark:border-gallery-600 dark:bg-gallery-900"
    >
      <LazyAppSidebar v-if="checkBreakpoint('md')" />
      <div
        class="grow overflow-auto border-gallery-200 bg-white md:rounded-xl md:border dark:border-gallery-600 dark:bg-gallery-700"
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
