<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'

const { $api } = useNuxtApp()
const localeRoute = useLocaleRoute()
const toast = useToast()
const { t } = useI18n()

const schema = Joi.object({
  name: Joi.string().required()
})

const state = reactive({
  name: ''
})

const isLoading = ref(false)
async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true
  try {
    $api('api/v1/categories/', { method: 'POST', body: event.data })
    toast.add({ title: t('category.created') })
    navigateTo(localeRoute({ name: 'bookmarks' }))
  } catch (err) {
    useErrorHandler(err, 'Error while category creation')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('category.creating') }}</h1>

  <AppFormWrapper :schema="schema" :state="state" :loading="isLoading" @submit="onSubmit">
    <UFormGroup :label="$t('fields.name')" name="name">
      <UInput v-model="state.name" :placeholder="$t('placeholder.name')" autocomplete="off" />
    </UFormGroup>
  </AppFormWrapper>
</template>

<style scoped></style>
