<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'navigation.home' })
const { t } = useI18n()
useHead({
  title: t('navigation.home')
})
</script>

<template>
  <h1 class="mb-3 font-medium ~text-xl/2xl">{{ $t('navigation.home') }}</h1>
  <div class="divide-shark-200 xl:flex xl:divide-x dark:divide-shark-600">
    <DashboardLastPublications />
    <div
      class="divide-y divide-shark-200 md:flex md:min-w-80 md:divide-y-0 lg:divide-y-0 xl:flex-col xl:divide-y dark:divide-shark-600"
    >
      <DashboardEventsCalendar />
      <DashboardNotifications />
    </div>
  </div>
</template>

<style scoped></style>
