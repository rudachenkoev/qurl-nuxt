<script setup lang="ts">
const { checkBreakpoint } = useBreakpoint()

const route = useRoute()

const isOpenNavigationMenu = ref(false)

watch(
  () => route.name,
  () => (isOpenNavigationMenu.value = false)
)
</script>

<template>
  <header
    class="sticky top-0 z-10 flex h-16 items-center justify-between border-b shadow-sm md:shadow-none border-shark-200 bg-white px-3 dark:border-shark-600 dark:bg-shark-700"
  >
    <AppBreadcrumbs />
    <template v-if="checkBreakpoint(['xs', 'sm'])">
      <UButton icon="i-heroicons-bars-3" size="sm" variant="ghost" @click="isOpenNavigationMenu = true" />
      <USlideover v-model="isOpenNavigationMenu" side="left" :ui="{ base: 'p-4', width: 'max-w-56' }">
        <LazyAppSidebar />
      </USlideover>
    </template>
  </header>
</template>

<style scoped></style>
