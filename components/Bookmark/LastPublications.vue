<script setup lang="ts">
import { getBookmarks } from '~/services/bookmarksService'
import type { FormattedResponse } from '~/types'

const { data: lastPublications, status } = await useLazyAsyncData<FormattedResponse>('lastPublications', () =>
  getBookmarks({ ordering: 'createdAt' })
)
</script>

<template>
  <h1 class="text-xl font-medium">{{ $t('lastPublications') }}</h1>
  <AppTable :rows="isNotPaginatedResponse(lastPublications) ? lastPublications : []" :loading="status === 'pending'" />
</template>

<style scoped></style>
