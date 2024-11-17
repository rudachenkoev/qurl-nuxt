export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    async onRequest({ request, options, error }) {
      await nuxtApp.runWithContext(() => {
        const token = useCookie('TOKEN')
        if (token.value) {
          options.headers.set('Authorization', token.value)
        }
      })
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => {
          const token = useCookie('TOKEN')
          token.value = null

          const localeRoute = useLocaleRoute()
          const route = localeRoute({ name: 'login' })
          return navigateTo(route ? route.fullPath : '/login')
        })
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
