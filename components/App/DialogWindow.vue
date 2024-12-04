<script setup lang="ts">
interface Props {
  title: string
  description?: string
}
const { title, description } = defineProps<Props>()

const isVisible = defineModel({ type: Boolean, default: false })
</script>

<template>
  <UModal v-model="isVisible">
    <UCard :ui="{ divide: 'divide-y divide-shark-200 dark:divide-shark-600' }">
      <template #header>
        <slot name="title">
          <h3 class="text-2xl font-medium">{{ title }}</h3>
        </slot>
      </template>

      <slot>
        <p class="text-base">{{ description }}</p>
      </slot>

      <template #footer>
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>

<style scoped></style>
