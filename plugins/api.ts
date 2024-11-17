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
        await nuxtApp.runWithContext(() => useLogout())
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
