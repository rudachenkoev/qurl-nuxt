<script setup lang="ts">
import type { TableRow, TableColumn } from '#ui/types'

interface Props {
  rows: TableRow[]
  columns: TableColumn[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <UTable :rows="rows" :columns="columns" :loading="loading"/>
</template>

<style scoped></style>
