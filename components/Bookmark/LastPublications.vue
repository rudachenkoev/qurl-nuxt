<script setup lang="ts">
import type { TableRow } from '#ui/types'

const { $api } = useNuxtApp()

const { data: lastPublications, status } = await useLazyAsyncData<TableRow[]>('lastPublications', () =>
  $api('api/v1/bookmarks/', { query: { ordering: 'createdAt' } })
)
</script>

<template>
  <h1 class="text-xl font-medium">{{ $t('lastPublications') }}</h1>
  <AppTable :rows="lastPublications || []" :loading="status === 'pending'" />
</template>

<style scoped></style>
