<script setup lang="ts">
import type { DropdownItem } from '#ui/types'
import { useUserStore } from '~/stores/user'

const localeRoute = useLocaleRoute()
const { t } = useI18n()

const { user } = storeToRefs(useUserStore())

const userFullName = computed(() => `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim())

const openProfileDropdown = ref(false)
const profileDropdownItems: DropdownItem[][] = [
  [{ label: '', slot: 'account', to: localeRoute({ name: 'index' }) }],
  [
    { icon: 'i-heroicons-cog-6-tooth', label: t('navigation.settings'), to: localeRoute({ name: 'settings' }) },
    {
      label: t('btn.logout'),
      icon: 'i-heroicons-arrow-left-start-on-rectangle'
    }
  ]
]
</script>

<template>
  <div class="flex w-72 flex-col divide-y border-r dark:divide-gallery-600 dark:border-gallery-700 dark:bg-gallery-950">
    <div class="flex items-center justify-between p-3">
      <UDropdown
        v-model:open="openProfileDropdown"
        :items="profileDropdownItems"
        :popper="{ placement: 'bottom-start' }"
      >
        <div class="flex items-center gap-2">
          <UAvatar :alt="userFullName" />
          <p class="truncate whitespace-nowrap font-medium">{{ userFullName }}</p>
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="h-5 w-5 transform transition-transform duration-200"
            :class="[openProfileDropdown && 'rotate-180']"
          />
        </div>

        <template #account>
          <div class="w-full text-left">
            <p class="truncate whitespace-nowrap text-sm">{{ userFullName }}</p>
            <p class="truncate whitespace-nowrap text-xs text-gallery-800 dark:text-gallery-300">{{ user?.email }}</p>
          </div>
        </template>
      </UDropdown>
    </div>

    <AppSidebarCategories />
  </div>
</template>
