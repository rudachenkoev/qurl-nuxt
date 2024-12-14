<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import type { Category, SubmitAction } from '~/types'
import { createBookmark, updateBookmark } from '~/services/categoriesService'

const emit = defineEmits<{
  onSuccess: [{ action: SubmitAction; response: Category }]
}>()

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
  name: Joi.string().required(),
  icon: Joi.string().optional()
})

const state = reactive<Partial<Category>>({
  name: '',
  icon: 'i-heroicons-question-mark-circle'
})

const isLoading = ref(false)
async function onSubmit(event: FormSubmitEvent<Partial<Category>>) {
  isLoading.value = true

  try {
    if (category.value) {
      const response = await updateBookmark(category.value.id, event.data)
      toast.add({ title: t('category.edited') })
      emit('onSuccess', { action: 'edited', response })
    } else {
      const response = await createBookmark(event.data)
      toast.add({ title: t('category.created') })
      emit('onSuccess', { action: 'created', response })
    }
    isVisible.value = false
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
    <UForm ref="form" :schema="schema" :state="state" class="flex space-x-4" @submit="onSubmit">
      <UFormGroup :label="$t('fields.name.label')" name="name" class="grow">
        <UInput v-model="state.name" :placeholder="$t('fields.name.placeholder')" autocomplete="off" />
      </UFormGroup>
      <IconsPicker v-model="state.icon" class="mt-6" />
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
