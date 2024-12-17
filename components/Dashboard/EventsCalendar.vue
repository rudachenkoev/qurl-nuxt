<script setup lang="ts">
import { Calendar as VCalendar } from 'v-calendar'
import type AttributeConfig from 'v-calendar'
import 'v-calendar/style.css'
import { useUserStore } from '~/stores/user'

const colorMode = useColorMode()
const { locale, t } = useI18n()

const { user, contacts } = storeToRefs(useUserStore())

const isContactsSynced = computed(() => !!user.value?.contactsSyncAt)

const contactsWithBirthday = computed(() => contacts.value.filter(contact => contact.birthday))

const attributes = computed<Partial<AttributeConfig>[]>(() => {
  return contactsWithBirthday.value.map(contact => {
    const date = new Date(contact.birthday)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return {
      key: 'birthday',
      dot: 'red',
      dates: {
        start: new Date(year, month, day),
        repeat: { every: [12, 'months'], days: day }
      },
      popover: {
        label: `🎉 ${t('fields.birthday.label')}: ${contact.name}`,
        visibility: 'click',
        hideIndicator: true
      }
    }
  })
})
</script>

<template>
  <div class="p-3">
    <h3 class="mb-3 text-xl font-medium">{{ $t('eventsCalendar') }}</h3>

    <VCalendar
      v-if="isContactsSynced"
      :attributes="attributes"
      :initial-page="{ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }"
      :first-day-of-week="2"
      :locale="locale"
      :min-date="getDateOffset(-365)"
      :max-date="getDateOffset(365)"
      :is-dark="colorMode.value === 'dark'"
      title-position="right"
      color="gray"
      borderless
      transparent
      expanded
    />
    <div v-else class="grid grid-cols-7 gap-x-4 gap-y-2 p-3">
      <div class="col-start-1 col-end-3 h-7 w-full animate-pulse rounded bg-gray-200" />
      <div class="col-start-5 col-end-8 h-7 w-full animate-pulse rounded bg-gray-200" />
      <div
        v-for="i in 31"
        :key="i"
        :class="`size-7 animate-pulse rounded-full bg-gray-200 ${i === 1 ? 'col-start-3' : ''}`"
      />
    </div>
  </div>
</template>

<style scoped></style>
