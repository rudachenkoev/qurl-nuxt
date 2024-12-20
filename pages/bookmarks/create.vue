<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'bookmark.creating' })
const { t } = useI18n()
useHead({
  title: t('bookmark.creating')
})
</script>

<template>
  <h1 class="mb-3 font-medium ~text-xl/2xl">{{ $t('bookmark.creating') }}</h1>
  <BookmarkForm />
</template>

<style scoped></style>
