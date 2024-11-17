<script setup lang="ts"></script>

<template>
  <UContainer
    :ui="{
      base: 'mx-auto flex relative bg-shark-100 dark:bg-shark-950',
      padding: 'p-4 sm:p-6 lg:p-8',
      constrained: 'max-w-full h-screen overflow-auto'
    }"
  >
    <AppNavigation />
    <UContainer>
      <slot />
    </UContainer>
  </UContainer>
</template>

<style scoped></style>
