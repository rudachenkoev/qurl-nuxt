<script setup>
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'

const confirmationDialog = useConfirmationDialogStore()
const { isVisible, options } = storeToRefs(confirmationDialog)
const { confirm, cancel } = confirmationDialog
</script>

<template>
  <UModal v-model="isVisible">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h3 class="text-2xl font-medium">{{ options.title }}</h3>
      </template>

      <p class="text-base">{{ options.description }}</p>

      <template #footer>
        <div class="flex gap-4">
          <UButton :label="options.cancelButton" variant="outline" class="grow" @click="cancel" />
          <UButton :label="options.confirmButton" class="grow" @click="confirm" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped></style>
