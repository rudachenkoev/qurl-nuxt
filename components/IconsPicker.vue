<script setup lang="ts">
import { icons } from '@iconify-json/heroicons'

const selected = defineModel<string | undefined>({
  get(value: string | undefined) {
    if (value?.includes('i-heroicons-')) return value.split('i-heroicons-')[1]
    return value
  },
  set(value: string | undefined) {
    if (value && !value.includes('i-heroicons-')) return getIconName(value)
    return value
  }
})

const allowedIconKeys = Object.keys(icons.icons).filter(key => !/-(16|20|solid)$/.test(key))

const getIconName = (name: string) => `i-heroicons-${name}`
</script>

<template>
  <USelectMenu
    v-model="selected"
    :options="allowedIconKeys"
    :ui="{ base: 'w-20' }"
    :uiMenu="{ base: 'grid grid-cols-4 w-48', option: { base: 'justify-center' }, input: 'col-span-4' }"
    searchable
  >
    <template #label>
      <UIcon v-if="selected" :name="getIconName(selected)" class="size-5" />
    </template>
    <template #option="{ option }">
      <UIcon :name="getIconName(option)" class="size-5" />
    </template>
  </USelectMenu>
</template>

<style scoped></style>
