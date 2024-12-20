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
  <div class="h-screen bg-shark-100 md:p-3 dark:bg-shark-950">
    <div
      class="container mx-auto flex h-full max-h-full gap-6 border-shark-200 bg-shark-50 md:h-auto md:rounded-xl md:border md:p-3 dark:border-shark-600 dark:bg-shark-900"
    >
      <LazyAppSidebar v-if="checkBreakpoint('md')" />
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
