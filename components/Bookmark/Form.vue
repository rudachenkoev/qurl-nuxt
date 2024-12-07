<script setup lang="ts">
import Joi from 'joi'
import type { Bookmark, SubmitConfig } from '~/types'
import type { FormSubmitEvent } from '#ui/types'
import { useDirectoryStore } from '~/stores/directory'

const { $api } = useNuxtApp()
const { categories } = storeToRefs(useDirectoryStore())
const route = useRoute()
const localeRoute = useLocaleRoute()
const toast = useToast()
const { t } = useI18n()

const isCreatingRoute = localeRoute({ name: 'bookmarks-create' })?.name === route.name

const bookmark = ref<Bookmark | null>(null)
if (!isCreatingRoute) {
  const { data } = await useAsyncData<Bookmark>(`bookmark-${route.params.id}`, () =>
    $api(`api/v1/bookmarks/${route.params.id}/`)
  )
  bookmark.value = data.value
}

const schema = useValidationSchema({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  url: Joi.string().uri().required(),
  categoryId: Joi.number().required()
})

const state = reactive<Partial<Bookmark>>({
  title: '',
  description: '',
  url: '',
  categoryId: undefined
})

const isUrlAutocompleting = ref(false)
const autocompleteUrlData = async () => {
  isUrlAutocompleting.value = true
  try {
    const data: Partial<Bookmark> = await $api('api/v1/bookmarks/autocomplete-url-data/', {
      method: 'POST',
      body: { url: state.url }
    })
    Object.assign(state, data)
  } catch (err) {
    useErrorHandler(err, 'Failed to autocomplete fields by URL')
  } finally {
    isUrlAutocompleting.value = false
  }
}

const isLoading = ref(false)
const onSubmit = async (event: FormSubmitEvent<Partial<Bookmark>>) => {
  isLoading.value = true

  const id = route.params.id
  const config: SubmitConfig = isCreatingRoute
    ? {
        apiPath: 'api/v1/bookmarks/',
        method: 'POST',
        action: 'created',
        navigateToParams: { name: 'bookmarks' }
      }
    : {
        apiPath: `api/v1/bookmarks/${id}/`,
        method: 'PATCH',
        action: 'edited',
        navigateToParams: { name: 'bookmarks-id', params: { id } }
      }

  try {
    await $api(config.apiPath, { method: config.method, body: event.data })
    toast.add({ title: t(`bookmark.${config.action}`) })
    if (config.navigateToParams) navigateTo(localeRoute(config.navigateToParams))
  } catch (err) {
    useErrorHandler(err, 'Failed to create/update bookmark')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (isCreatingRoute && route.query.categoryId) state.categoryId = +route.query.categoryId
  else if (bookmark.value) updateStateFields(state, bookmark.value)
})
</script>

<template>
  <AppFormWrapper :schema="schema" :state="state" :loading="isLoading" @submit="onSubmit">
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
        :disabled="isUrlAutocompleting"
        autocomplete="off"
      />
    </UFormGroup>
    <UFormGroup :label="$t('fields.description.label')" name="description">
      <UTextarea
        v-model="state.description"
        :placeholder="$t('fields.description.placeholder')"
        :disabled="isUrlAutocompleting"
        autocomplete="off"
        autoresize
      />
    </UFormGroup>
    <UFormGroup :label="$t('fields.category.label')" name="category">
      <USelect
        v-model="state.categoryId as number | undefined"
        :options="categories"
        option-attribute="name"
        value-attribute="id"
        :placeholder="$t('fields.category.placeholder')"
        :disabled="isUrlAutocompleting"
      />
    </UFormGroup>
  </AppFormWrapper>
</template>

<style scoped></style>
