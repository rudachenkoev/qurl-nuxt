<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'navigation.home' })
const { t } = useI18n()
useHead({
  title: t('navigation.home')
})
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.home') }}</h1>
  <BookmarkLastPublications />
</template>

<style scoped></style>
