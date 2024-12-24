<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - Qurl Web` : 'Qurl Web')
})
</script>

<template>
  <NuxtLayout class="font-sans text-gallery-950 dark:text-gallery-50">
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
  <ConfirmationDialog />
</template>
