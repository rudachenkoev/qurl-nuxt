<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - Qurl Web` : 'Qurl Web')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
