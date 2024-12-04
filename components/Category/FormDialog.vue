<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import type { Category } from '~/types'

const emit = defineEmits<{
  onSuccess: [{ action: 'created' | 'edited'; response: Category }]
}>()

const { $api } = useNuxtApp()
const toast = useToast()
const { t } = useI18n()

const isVisible = ref(false)
const form = ref()
const category = ref<Category | null>(null)

const openDialogWindow = (value?: Category) => {
  if (value) {
    category.value = value
    updateStateFields(state, value)
  }
  isVisible.value = true
}

const handleDialogClose = () => {
  setTimeout(() => {
    category.value = null
    state.name = ''
  }, 300)
}

const schema = useValidationSchema({
  name: Joi.string().required()
})

const state = reactive<Partial<Category>>({
  name: ''
})

const isLoading = ref(false)
async function onSubmit(event: FormSubmitEvent<Partial<Category>>) {
  isLoading.value = true

  const apiPath = category.value ? `api/v1/categories/${category.value.id}/` : 'api/v1/categories/'
  const method = category.value ? 'PATCH' : 'POST'
  const action = category.value ? 'edited' : 'created'

  try {
    const response: Category = await $api(apiPath, { method, body: event.data })
    toast.add({ title: t(`category.${action}`) })
    isVisible.value = false
    emit('onSuccess', { action, response })
  } catch (err) {
    useErrorHandler(err, 'Failed to create/update category')
  } finally {
    isLoading.value = false
  }
}

watch(isVisible, value => {
  if (!value) handleDialogClose()
})

defineExpose({ openDialogWindow })
</script>

<template>
  <AppDialogWindow v-model="isVisible" :title="$t(`category.${category ? 'editing' : 'creating'}`)">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('fields.name.label')" name="name">
        <UInput v-model="state.name" :placeholder="$t('fields.name.placeholder')" autocomplete="off" />
      </UFormGroup>
    </UForm>

    <template #footer>
      <div class="flex justify-end gap-4">
        <UButton
          :label="$t('btn.cancel')"
          variant="outline"
          :ui="{ base: 'min-w-20' }"
          @click.prevent="isVisible = false"
        />
        <UButton
          :loading="isLoading"
          :label="$t('btn.save')"
          :ui="{ base: 'min-w-20' }"
          @click.prevent="form.submit()"
        />
      </div>
    </template>
  </AppDialogWindow>
</template>
