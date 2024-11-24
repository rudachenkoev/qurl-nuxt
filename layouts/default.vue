<script setup lang="ts"></script>

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
        <main class="overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
