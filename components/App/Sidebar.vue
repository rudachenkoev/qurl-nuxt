<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'
import { useUserStore } from '~/stores/user'
import type { RouteLocation } from 'vue-router'

const localeRoute = useLocaleRoute()
const { t } = useI18n()
const { user } = storeToRefs(useUserStore())
const route = useRoute()
const { checkBreakpoint } = useBreakpoint()

const isCollapsed = ref(checkBreakpoint(['md']))

const uiSettings = computed(() => ({
  wrapper: 'customNavigationWrapper grow py-3',
  base: isCollapsed.value ? 'justify-center' : 'gap-3',
  padding: 'px-3 py-2',
  rounded: 'rounded-lg',
  active: 'text-shark-950 dark:text-shark-50 before:bg-white dark:before:bg-shark-500 shadow',
  inactive:
    'text-shark-500 dark:text-shark-300 hover:text-shark-800 dark:hover:text-shark-200 hover:before:bg-shark-50 dark:hover:before:bg-shark-900',
  icon: {
    active: 'text-shark-950 dark:text-shark-50',
    inactive: 'text-shark-500 dark:text-shark-300 hover:text-shark-800 dark:hover:text-shark-200'
  }
}))

const isActiveLink = (link: RouteLocation, exact = false) => {
  if (!link) return false
  return exact ? route.path === link.path : route.path.startsWith(link.path)
}

const links = computed<VerticalNavigationLink[]>(() => {
  return [
    { icon: 'home', label: t('navigation.home'), to: localeRoute({ name: 'index' }), exact: true, isShown: true },
    { icon: 'archive-box', label: t('navigation.categories'), to: localeRoute({ name: 'categories' }), isShown: true },
    { icon: 'bookmark', label: t('navigation.bookmarks'), to: localeRoute({ name: 'bookmarks' }), isShown: true },
    { icon: 'cog-6-tooth', label: t('navigation.settings'), to: localeRoute({ name: 'settings' }), isShown: true },
    {
      icon: `chevron-double-${isCollapsed.value ? 'right' : 'left'}`,
      label: t('btn.collapse'),
      isShown: checkBreakpoint('md'),
      click: () => (isCollapsed.value = !isCollapsed.value)
    }
  ]
    .filter(link => link.isShown)
    .map(link => ({
      ...link,
      label: !isCollapsed.value ? link.label : '',
      icon: `i-heroicons-${link.icon}`,
      active: link.to ? isActiveLink(link.to, link.exact) : false
    }))
})
</script>

<template>
  <div class="flex max-w-48 flex-col">
    <div
      class="flex h-16 items-center gap-3 border-y border-b-shark-200 border-t-transparent px-3 dark:border-shark-600"
    >
      <NuxtLink :to="localeRoute({ name: 'index' })">
        <NuxtImg src="./images/favicon.png" width="28" height="28" alt="logo" />
      </NuxtLink>
      <div v-if="!isCollapsed">
        <p class="whitespace-nowrap text-sm font-medium text-shark-950 dark:text-shark-50">John Doe</p>
        <p class="whitespace-nowrap text-xs text-shark-800 dark:text-shark-300">{{ user?.email }}</p>
      </div>
    </div>

    <UVerticalNavigation :links="links" :ui="uiSettings" />
  </div>
</template>

<style lang="sass" scoped>
:deep(.customNavigationWrapper) > ul
    height: 100%
    display: flex
    flex-direction: column
    & > li:last-of-type
      margin-top: auto
</style>
