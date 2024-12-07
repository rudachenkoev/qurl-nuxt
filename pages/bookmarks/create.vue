<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('bookmark.creating')
})
definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('bookmark.creating') }}</h1>
  <BookmarkForm />
</template>

<style scoped></style>
