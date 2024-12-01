<script setup lang="ts"></script>

<template>
  <header class="flex h-16 flex-col justify-center border-b border-shark-200 px-3 dark:border-shark-600">
    <p class="text-sm font-medium text-shark-950 dark:text-shark-50">{{ $t('greeting', { name: 'John' }) }}</p>
    <p class="text-xs capitalize text-shark-800 dark:text-shark-300">
      {{ useFormatDate(new Date(), { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) }}
    </p>
  </header>
</template>

<style scoped></style>
