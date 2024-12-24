<script lang="ts" setup>
import type { BreadcrumbLink } from '#ui/types'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const breadcrumbs = computed<BreadcrumbLink[]>(() => {
  const requestPath = route.path.startsWith('/') ? route.path.substring(1) : route.path
  const crumbs = requestPath.split('/')

  let path = ''
  return crumbs.reduce<BreadcrumbLink[]>((acc, crumb) => {
    if (crumb) {
      path = `${path}/${crumb}`
      const routeMatch = router.getRoutes().find(r => r.path === path)
      if (routeMatch) {
        acc.push({
          label: routeMatch.meta.title ? t(routeMatch.meta.title as string) : crumb,
          to: routeMatch.path,
          disabled: routeMatch.path === route.path
        })
      }
    }
    return acc
  }, [])
})
</script>

<template>
  <UBreadcrumb v-if="breadcrumbs.length > 1" :links="breadcrumbs" />
  <div v-else>
    <p class="text-sm font-medium text-gallery-950 dark:text-gallery-50">{{ $t('greeting', { name: 'John' }) }}</p>
    <p class="text-xs capitalize text-gallery-800 dark:text-gallery-300">
      {{ useFormatDate(new Date(), { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) }}
    </p>
  </div>
</template>
