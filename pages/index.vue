<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'navigation.home' })
const { t } = useI18n()
useHead({
  title: t('navigation.home')
})
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.home') }}</h1>
  <div class="flex divide-x divide-shark-200 dark:divide-shark-600">
    <DashboardLastPublications />
    <div class="flex min-w-96 flex-col divide-y divide-shark-200 dark:divide-shark-600">
      <DashboardEventsCalendar />
      <DashboardNotifications />
    </div>
  </div>
</template>

<style scoped></style>
