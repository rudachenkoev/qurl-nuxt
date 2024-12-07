<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { type ObjectSchema } from 'joi'

interface Props {
  schema: ObjectSchema
  state: Record<string, any>
  loading?: boolean
}

const { schema, state, loading = false } = defineProps<Props>()
defineEmits<{
  submit: [event: FormSubmitEvent<any>]
}>()
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="event => $emit('submit', event)">
    <slot />
    <UDivider />
    <div class="flex justify-end gap-4">
      <slot name="actions">
        <UButton variant="outline" :disabled="loading" :label="$t('btn.clear')" :ui="{ base: 'min-w-20' }" />
        <UButton type="submit" :loading="loading" :label="$t('btn.save')" :ui="{ base: 'min-w-20' }" />
      </slot>
    </div>
  </UForm>
</template>

<style scoped></style>
