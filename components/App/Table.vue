<script setup lang="ts">
import type { TableRow, TableColumn, DropdownItem } from '#ui/types'
import { useDirectoryStore } from '~/stores/directory'

interface Props<RowType extends TableRow = TableRow> {
  rows: TableRow[]
  columns?: TableColumn[]
  loading?: boolean
  actions?: (row: RowType) => DropdownItem[][]
  totalCount?: number
}
const { rows = [], columns, loading = false, totalCount = 0 } = defineProps<Props>()

const route = useRoute()
const localeRoute = useLocaleRoute()
const { getDirectoryByKey } = useDirectoryStore()

const page = ref(route.query.page ? +route.query.page : 1)
const pageCount = ref(route.query.pageCount ? +route.query.pageCount : 10)

const getFaviconUrl = (url: string) => {
  try {
    const { host } = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${host}&sz=32`
  } catch (err) {
    console.error('Invalid URL provided:', url, err)
    return undefined
  }
}

watch(pageCount, value => {
  page.value = 1
  navigateTo(localeRoute({ query: { ...route.query, page: 1, pageCount: value } }))
})
</script>

<template>
  <UTable
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :empty-state="{ icon: 'i-heroicons-circle-stack', label: $t('noItems') }"
  >
    <template #bookmarkTitle-data="{ row }">
      <div class="flex items-center gap-x-2">
        <NuxtImg :src="getFaviconUrl(row.url)" width="24" height="24" :alt="`${row.title}-favicon`" />
        <span>{{ row.title }}</span>
      </div>
    </template>

    <template #categoryId-data="{ row }">
      {{ getDirectoryByKey('categories', row.categoryId)?.name || '--' }}
    </template>

    <template #categoryName-data="{ row }">
      {{ row.isDefault ? $t(`category.default.${row.name}`) : row.name }}
    </template>

    <template #createdAt-data="{ row }">{{ useFormatDate(new Date(row.createdAt)) }}</template>

    <template #actions-data="{ row }">
      <UDropdown v-if="actions && actions(row).length" :items="actions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>

  <div class="flex flex-wrap items-center justify-between">
    <div class="flex items-center gap-1.5">
      <span class="text-sm leading-5">{{ $t('rowsPerPage') }}:</span>

      <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2" size="xs" />
    </div>
    <UPagination
      v-if="totalCount"
      v-model="page"
      :page-count="+pageCount"
      :total="totalCount"
      :to="(page: number) => ({ query: { ...$route.query, page } })"
    />
  </div>
</template>

<style scoped></style>
