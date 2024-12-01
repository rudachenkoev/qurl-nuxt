<script setup lang="ts">
import type { TableRow, TableColumn, DropdownItem } from '#ui/types'

interface Props {
  rows: TableRow[]
  columns?: TableColumn[]
  loading?: boolean
  actions?: (row: TableRow) => DropdownItem[][]
}
const { rows = [], columns, loading = false } = defineProps<Props>()
</script>

<template>
  <UTable
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :empty-state="{ icon: 'i-heroicons-circle-stack', label: $t('noItems') }"
  >
    <template #categoryName-data="{ row }">{{
      row.isDefault ? $t(`category.default.${row.name}`) : row.name
    }}</template>

    <template #createdAt-data="{ row }">{{ useFormatDate(new Date(row.createdAt)) }}</template>

    <template #actions-data="{ row }">
      <UDropdown v-if="actions && actions(row).length" :items="actions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

<style scoped></style>
