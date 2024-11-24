<script setup lang="ts">
const { $api } = useNuxtApp()

const { data } = await useAsyncData('lastPublications', () =>
  $api('api/v1/bookmarks/', { query: { ordering: 'createdAt' } })
)
</script>

<template>
  <h1 class="text-xl font-medium">{{ $t('lastPublications') }}</h1>
</template>

<style scoped></style>
