<script setup lang="ts">
const { currentBreakpoint } = useBreakpoint()

const isOpenNavigationMenu = ref(false)
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-shark-200 px-3 dark:border-shark-600">
    <AppBreadcrumbs />
    <template v-if="['xs', 'sm'].includes(currentBreakpoint)">
      <UButton icon="i-heroicons-bars-3" size="sm" variant="ghost" @click="isOpenNavigationMenu = true" />
      <USlideover v-model="isOpenNavigationMenu" side="left" :ui="{ base: 'p-6', width: 'max-w-60' }">
        <LazyAppSidebar />
      </USlideover>
    </template>
  </header>
</template>

<style scoped></style>
