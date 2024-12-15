<script setup lang="ts">
import { Calendar as VCalendar } from 'v-calendar'
import 'v-calendar/style.css'

const colorMode = useColorMode()
const { locale } = useI18n()

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
    <div class="grid grid-cols-7 gap-4 p-3">
      <div v-for="i in 38" :key="i" class="size-7 animate-pulse rounded-full bg-gray-200"></div>
    </div>

    <VCalendar
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
  </div>
</template>

<style scoped></style>
