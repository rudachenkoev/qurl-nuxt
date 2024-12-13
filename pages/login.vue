<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['auth'], title: 'auth.loginToQurlWeb' })
const { t } = useI18n()
useHead({
  title: t('auth.loginToQurlWeb')
})

const authTabsFlow = ['settings', 'device']
</script>

<template>
  <div
    class="flex flex-col-reverse items-center gap-y-4 rounded-lg border border-shark-200 bg-shark-50 p-3 md:flex-row md:gap-x-8 md:p-5 dark:border-shark-600 dark:bg-shark-900"
  >
    <div>
      <div class="align-center mb-4 flex gap-x-3">
        <UBadge color="shark" variant="subtle" class="rounded-lg">
          <UIcon name="i-heroicons-viewfinder-circle" class="size-6" />
        </UBadge>
        <h1 class="text-2xl font-medium md:text-3xl">{{ $t('auth.loginToQurlWeb') }}</h1>
      </div>

      <ol class="list-inside list-decimal space-y-2">
        <li>{{ $t('auth.openQurlOnPhone') }}</li>
        <li>
          {{ $t('instructions.goTo') }}
          <template v-for="(tab, index) in authTabsFlow" :key="tab">
            <UBadge :label="$t(`navigation.${tab}`)" color="shark" variant="subtle" class="rounded-lg" />
            <span v-if="index !== authTabsFlow.length - 1" class="mx-1">></span>
          </template>
        </li>
        <li>{{ $t('auth.confirmLoginInstruction') }}</li>
      </ol>
    </div>
    <AuthChannelQrCode class="w-64" />
  </div>
</template>
