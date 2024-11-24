<script setup lang="ts">
import type { TableRow } from '#ui/types'

const { t } = useI18n()
useHead({
  title: t('navigation.bookmarks')
})
definePageMeta({ middleware: ['auth'] })

const { $api } = useNuxtApp()
const route = useRoute()

type Category = TableRow & {
  id: number
  name: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

const { data: lastPublications, status } = await useLazyAsyncData<Category[]>(
  'lastPublications',
  () => $api('api/v1/categories/', { query: setDefaultQuery(route.query) }),
  {
    watch: [() => route.query]
  }
)

const columns = [
  { key: 'name', label: t('fields.name') },
  { key: 'createdAt', label: t('fields.createdAt') }
]
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.bookmarks') }}</h1>
  <AppTable :rows="lastPublications || []" :columns="columns" :loading="status === 'pending'" />
</template>

<style scoped></style>
