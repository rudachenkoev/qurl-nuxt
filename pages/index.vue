<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('navigation.home')
})
definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.home') }}</h1>
  <BookmarkLastPublications />
</template>

<style scoped></style>
