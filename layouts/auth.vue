<script setup lang="ts">
const colorMode = useColorMode()
const changeColor = () => (colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light')
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-shark-100 p-4 md:p-0 dark:bg-shark-950">
    <slot />
  </div>
</template>

<style scoped></style>
