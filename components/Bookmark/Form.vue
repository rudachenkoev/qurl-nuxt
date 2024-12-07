<script setup lang="ts">
import Joi from 'joi'
import type { Bookmark } from '~/types'
import type { FormSubmitEvent } from '#ui/types'

const { $api } = useNuxtApp()

const schema = useValidationSchema({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  url: Joi.string().uri().required(),
  category: Joi.number().required()
})

const state = reactive<Partial<Bookmark>>({
  title: '',
  description: '',
  url: '',
  category: null
})

type URLAutocompleteResponse = {
  originalTitle: string
  extractTitle: string
  category: number | null
}

const isUrlAutocompleting = ref(false)
const autocompleteUrlData = async () => {
  isUrlAutocompleting.value = true
  try {
    const data: URLAutocompleteResponse = await $api('api/v1/bookmarks/autocomplete-url-data/', {
      method: 'POST',
      body: { url: state.url }
    })
    console.log('data', data)
  } catch (err) {
    useErrorHandler(err, 'Failed to autocomplete fields by URL')
  } finally {
    isUrlAutocompleting.value = false
  }
}

const onSubmit = (event: FormSubmitEvent<Partial<Bookmark>>) => {
  console.log('onSubmit', event)
}
</script>

<template>
  <AppFormWrapper :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup :label="$t('fields.url.label')" name="url">
      <UButtonGroup :ui="{ shadow: 'shadow-none' }" class="w-full">
        <UInput
          v-model="state.url"
          :placeholder="$t('fields.url.placeholder')"
          :ui="{ wrapper: 'w-full' }"
          autocomplete="off"
        />
        <UTooltip :text="$t('autocompleteFormFields')">
          <UButton
            icon="i-heroicons-document-check"
            :disabled="!state.url"
            :loading="isUrlAutocompleting"
            color="shark"
            @click="autocompleteUrlData"
          />
        </UTooltip>
      </UButtonGroup>
    </UFormGroup>
    <UFormGroup :label="$t('fields.title.label')" name="title">
      <UInput
        v-model="state.title"
        :placeholder="$t('fields.title.placeholder')"
        :disabled="!isUrlAutocompleting"
        autocomplete="off"
      />
    </UFormGroup>
    <UFormGroup :label="$t('fields.description.label')" name="description">
      <UTextarea
        v-model="state.description"
        :placeholder="$t('fields.description.placeholder')"
        :disabled="!isUrlAutocompleting"
        autocomplete="off"
        autoresize
      />
    </UFormGroup>
  </AppFormWrapper>
</template>

<style scoped></style>
