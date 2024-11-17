<script setup lang="ts">
const localeRoute = useLocaleRoute()
const route = useRoute()
const { t } = useI18n()

type Link = {
  icon: string
  text: string
  to: ReturnType<typeof localeRoute>
}
const links = computed<Link[]>(() => [
  { icon: 'home', text: t('navigation.home'), to: localeRoute({ name: 'index' }) },
  { icon: 'link', text: t('navigation.links'), to: localeRoute({ name: 'link' }) },
  { icon: 'cog-6-tooth', text: t('navigation.settings'), to: localeRoute({ name: 'settings' }) }
])

const currentRouteName = computed(() => route.name)
const checkIsCurrentRoute = (to: Link['to']) => to?.name === currentRouteName.value
</script>

<template>
  <div
    class="fixed flex h-[calc(100vh-64px)] w-32 flex-col items-center justify-between rounded-3xl bg-black px-4 py-8 shadow"
  >
    <NuxtLink :to="localeRoute({ name: 'index' })">
      <NuxtImg src="./images/favicon.png" width="48" height="48" alt="logo" />
    </NuxtLink>

    <nav>
      <ul class="flex flex-col space-y-4">
        <UTooltip v-for="link in links" :key="link.icon" :text="link.text" :popper="{ placement: 'right' }">
          <UButton
            :to="link.to"
            :ui="{ rounded: 'rounded-lg' }"
            :icon="`i-heroicons-${link.icon}${checkIsCurrentRoute(link.to) ? '-solid' : ''}`"
            :variant="checkIsCurrentRoute(link.to) ? 'outline' : 'ghost'"
            color="white"
            size="xl"
          />
        </UTooltip>
      </ul>
    </nav>

    <UTooltip :text="$t('auth.logout')" :popper="{ placement: 'right' }">
      <UButton
        icon="i-heroicons-arrow-left-end-on-rectangle"
        size="xl"
        color="white"
        variant="ghost"
        @click="useLogout()"
      />
    </UTooltip>
  </div>
</template>
