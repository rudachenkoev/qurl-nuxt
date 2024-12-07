<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { type ObjectSchema } from 'joi'
import { useConfirmationDialogStore } from '~/stores/confirmationDialog'

interface Props {
  schema: ObjectSchema
  state: Record<string, any>
  loading?: boolean
}

const { schema, state, loading = false } = defineProps<Props>()
defineEmits<{
  submit: [event: FormSubmitEvent<any>]
}>()

const { t } = useI18n()
const { confirmationHandler } = useConfirmationDialogStore()

const initialState = reactive({ ...toRaw(state) })
const onClear = async () => {
  const isConfirm = await confirmationHandler({ description: t('clearFormConfirmation') })
  if (!isConfirm) return

  Object.assign(state, initialState)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="event => $emit('submit', event)">
    <slot />
    <UDivider />
    <div class="flex justify-end gap-4">
      <slot name="actions">
        <UButton variant="outline" :disabled="loading" :label="$t('btn.clear')" class="min-w-20" @click="onClear" />
        <UButton type="submit" :loading="loading" :label="$t('btn.save')" class="min-w-20" />
      </slot>
    </div>
  </UForm>
</template>

<style scoped></style>
