<script setup lang="ts">
definePageMeta({ middleware: ['auth'], title: 'navigation.home' })
const { t } = useI18n()
useHead({
  title: t('navigation.home')
})
</script>

<template>
  <h1 class="mb-3 text-2xl font-medium md:text-3xl">{{ $t('navigation.home') }}</h1>
  <div class="divide-shark-200 xl:flex xl:divide-x dark:divide-shark-600">
    <DashboardLastPublications />
    <div class="min-w-96 divide-shark-200 md:flex xl:flex-col xl:divide-y dark:divide-shark-600">
      <DashboardEventsCalendar />
      <DashboardNotifications />
    </div>
  </div>
</template>

<style scoped></style>
