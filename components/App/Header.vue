<script setup lang="ts">
const { locale, locales } = useI18n()
const currentLocale = computed(() => locales.value.find(item => item.code === locale.value))
</script>

<template>
  <header class="flex h-16 flex-col justify-center border-b border-shark-200 px-3 dark:border-shark-600">
    <p class="text-sm font-medium text-shark-950 dark:text-shark-50">{{ $t('greeting', { name: 'John' }) }}</p>
    <p class="text-xs capitalize text-shark-800 dark:text-shark-300">
      {{ formatDate(new Date(), currentLocale.language) }}
    </p>
  </header>
</template>

<style scoped></style>
