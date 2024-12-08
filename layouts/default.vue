<script setup lang="ts">
import { useDirectoryStore } from '~/stores/directory'
import { useUserStore } from '~/stores/user'

const directoryStore = useDirectoryStore()
const { getDirectories } = directoryStore
const { isDirectoriesLoaded } = storeToRefs(directoryStore)

const userStore = useUserStore()
const { getCurrentUserContacts } = userStore
const { isContactsLoaded } = storeToRefs(userStore)

Promise.all([!isDirectoriesLoaded.value && getDirectories(), !isContactsLoaded.value && getCurrentUserContacts()])
</script>

<template>
  <div class="h-screen bg-shark-100 p-6 dark:bg-shark-950">
    <div
      class="container mx-auto flex gap-6 rounded-2xl border border-shark-200 bg-shark-50 p-6 dark:border-shark-600 dark:bg-shark-900"
    >
      <AppNavigation />
      <div
        class="grow overflow-hidden rounded-xl border border-shark-200 bg-white dark:border-shark-600 dark:bg-shark-700"
      >
        <AppHeader />
        <main class="overflow-auto p-3">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
