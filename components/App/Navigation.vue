<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'
import { useUserStore } from '~/stores/user'

const localeRoute = useLocaleRoute()
const { t } = useI18n()
const { user } = storeToRefs(useUserStore())

const links = computed<VerticalNavigationLink[]>(() => [
  { icon: 'i-heroicons-home', label: t('navigation.home'), to: localeRoute({ name: 'index' }) },
  { icon: 'i-heroicons-link', label: t('navigation.links'), to: localeRoute({ name: 'link' }) },
  { icon: 'i-heroicons-cog-6-tooth', label: t('navigation.settings'), to: localeRoute({ name: 'settings' }) }
])
</script>

<template>
  <div>
    <div
      class="flex h-16 items-center gap-3 border-y border-b-shark-200 border-t-transparent px-3 dark:border-shark-600"
    >
      <NuxtLink :to="localeRoute({ name: 'index' })">
        <NuxtImg src="./images/favicon.png" width="28" height="28" alt="logo" />
      </NuxtLink>
      <div>
        <p class="whitespace-nowrap text-sm font-medium text-shark-950 dark:text-shark-50">John Doe</p>
        <p class="whitespace-nowrap text-xs text-shark-800 dark:text-shark-300">{{ user?.email }}</p>
      </div>
    </div>

    <UVerticalNavigation :links="links" class="py-3" />
  </div>
</template>
