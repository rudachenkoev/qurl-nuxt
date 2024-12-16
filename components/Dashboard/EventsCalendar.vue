<script setup lang="ts">
import { Calendar as VCalendar } from 'v-calendar'
import 'v-calendar/style.css'
import { useUserStore } from '~/stores/user'

const colorMode = useColorMode()
const { locale } = useI18n()

const { user } = storeToRefs(useUserStore())

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date()
  }
])
</script>

<template>
  <div class="p-3">
    <h3 class="mb-3 text-xl font-medium">{{ $t('eventsCalendar') }}</h3>

    <VCalendar
      v-if="user?.calendarSyncAt"
      title-position="right"
      :attributes="attrs"
      :first-day-of-week="2"
      color="gray"
      :is-dark="colorMode.value === 'dark'"
      :locale="locale"
      borderless
      transparent
      expanded
    />
    <div v-else class="grid grid-cols-7 gap-x-4 gap-y-2 p-3">
      <div class="col-start-1 col-end-3 w-full h-7 animate-pulse rounded bg-gray-200"/>
      <div class="col-start-5 col-end-8 w-full h-7 animate-pulse rounded bg-gray-200"/>
      <div v-for="i in 31" :key="i" :class="`size-7 animate-pulse rounded-full bg-gray-200 ${i === 1 ? 'col-start-3' : ''}`" />
    </div>
  </div>
</template>

<style scoped></style>
