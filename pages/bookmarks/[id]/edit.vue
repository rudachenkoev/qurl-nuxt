<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('bookmark.editing')
})
definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('bookmark.editing') }}</h1>
  <BookmarkForm />
</template>

<style scoped></style>
