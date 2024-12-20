<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'bookmark.editing' })
const { t } = useI18n()
useHead({
  title: t('bookmark.editing')
})
</script>

<template>
  <h1 class="mb-3 font-medium ~text-xl/2xl">{{ $t('bookmark.editing') }}</h1>
  <BookmarkForm />
</template>

<style scoped></style>
