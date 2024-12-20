<script setup lang="ts">
const { currentBreakpoint } = useBreakpoint()

const isOpenNavigationMenu = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-shark-200 bg-white px-3 dark:border-shark-600 dark:bg-shark-700"
  >
    <AppBreadcrumbs />
    <template v-if="['xs', 'sm'].includes(currentBreakpoint)">
      <UButton icon="i-heroicons-bars-3" size="sm" variant="ghost" @click="isOpenNavigationMenu = true" />
      <USlideover v-model="isOpenNavigationMenu" side="left" :ui="{ base: 'p-4', width: 'max-w-56' }">
        <LazyAppSidebar />
      </USlideover>
    </template>
  </header>
</template>

<style scoped></style>
