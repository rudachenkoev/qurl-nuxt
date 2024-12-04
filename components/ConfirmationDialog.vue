<script setup>
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'

const confirmationDialog = useConfirmationDialogStore()
const { isVisible, options } = storeToRefs(confirmationDialog)
const { confirm, cancel } = confirmationDialog
</script>

<template>
  <AppDialogWindow v-model="isVisible" :title="options.title" :description="options.description">
    <template #footer>
      <div class="flex gap-4">
        <UButton :label="options.cancelButton" variant="outline" class="grow" @click="cancel" />
        <UButton :label="options.confirmButton" class="grow" @click="confirm" />
      </div>
    </template>
  </AppDialogWindow>
</template>

<style scoped></style>
