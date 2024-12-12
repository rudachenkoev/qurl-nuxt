<script setup lang="ts">
import Joi from 'joi'
import type { Bookmark, Category } from '~/types'
import type { FormSubmitEvent } from '#ui/types'
import { useDirectoryStore } from '~/stores/directory'
import { useUserStore } from '~/stores/user'
import { createBookmark, getBookmark, getBookmarkAutocompleteData, updateBookmark } from '~/services/bookmarksService'

const directoryStore = useDirectoryStore()
const { categories } = storeToRefs(directoryStore)
const { getDirectoryByKey } = directoryStore
const { contacts } = storeToRefs(useUserStore())
const route = useRoute()
const localeRoute = useLocaleRoute()
const toast = useToast()
const { t } = useI18n()

const isCreatingRoute = localeRoute({ name: 'bookmarks-create' })?.name === route.name

const bookmark = ref<Bookmark | null>(null)
if (!isCreatingRoute) {
  const { data } = await useAsyncData<Bookmark>(
    `bookmark:${route.params.id}`,
    () => getBookmark(route.params.id as string),
    {
      transform: value => {
        if (value.contacts?.length) {
          return {
            ...value,
            contacts: value.contacts.map(contact => contact.contactId)
          }
        } else return value
      }
    }
  )
  bookmark.value = data.value
}

const schema = useValidationSchema({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  url: Joi.string().uri().required(),
  categoryId: Joi.number().required(),
  contacts: Joi.array().items(Joi.string()).optional()
})

const state = reactive<Partial<Bookmark>>({
  title: '',
  description: '',
  url: '',
  categoryId: undefined,
  contacts: []
})
const categoriesSuggestion = ref<Category[]>([])

const isUrlAutocompleting = ref(false)
const autocompleteUrlData = async () => {
  if (!state.url) return

  isUrlAutocompleting.value = true
  try {
    const data = await getBookmarkAutocompleteData({ url: state.url })

    state.title = data.title
    state.description = data.description

    const highScoreLabelIndex = data.classification.scores.findIndex((score: number) => score > 0.7)
    if (highScoreLabelIndex !== -1) {
      categoriesSuggestion.value = []
      state.categoryId = getDirectoryByKey('categories', data.classification.labels[highScoreLabelIndex], 'name')?.id
    } else {
      state.categoryId = undefined
      categoriesSuggestion.value = data.classification.labels.map(label => {
        return getDirectoryByKey('categories', label, 'name') as Category
      })
    }
  } catch (err) {
    useErrorHandler(err, 'Failed to autocomplete fields by URL')
  } finally {
    isUrlAutocompleting.value = false
  }
}

const isLoading = ref(false)
const onSubmit = async (event: FormSubmitEvent<Partial<Bookmark>>) => {
  isLoading.value = true
  const id = route.params.id as string

  try {
    if (isCreatingRoute) {
      await createBookmark(event.data)
      toast.add({ title: t('bookmark.created') })
      navigateTo(localeRoute({ name: 'bookmarks' }))
    } else {
      await updateBookmark(id, event.data)
      toast.add({ title: t('bookmark.edited') })
      navigateTo(localeRoute({ name: 'bookmarks-id', params: { id } }))
    }
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
      <USelectMenu
        v-model="state.categoryId"
        :options="categories"
        option-attribute="name"
        value-attribute="id"
        :placeholder="$t('fields.category.placeholder')"
        :disabled="isUrlAutocompleting"
      />
      <div v-if="categoriesSuggestion.length" class="mt-2 flex flex-wrap items-center gap-3">
        <p class="text-sm text-shark-800 dark:text-shark-300">{{ $t('possibleOptions') }}:</p>
        <UButton
          v-for="suggestion in categoriesSuggestion"
          :label="suggestion.name"
          size="2xs"
          :disabled="state.categoryId === suggestion.id"
          :ui="{ rounded: 'rounded-full' }"
          @click="state.categoryId = suggestion.id"
        />
      </div>
    </UFormGroup>
    <UFormGroup :label="$t('fields.contact.label')" name="contacts">
      <USelectMenu
        v-model="state.contacts"
        :options="contacts"
        option-attribute="name"
        value-attribute="id"
        :placeholder="$t('fields.contact.placeholder')"
        :searchable-placeholder="$t('fields.contact.searchPlaceholder')"
        :search-attributes="['name']"
        multiple
        searchable
      />
    </UFormGroup>
  </AppFormWrapper>
</template>

<style scoped></style>
