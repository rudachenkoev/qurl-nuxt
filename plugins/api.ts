export default defineNuxtPlugin(nuxtApp => {
  // const { session } = useUserSession()
  const config = useRuntimeConfig()
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    // onRequest({ request, options, error }) {
    //   if (session.value?.token) {
    //     options.headers.set('Authorization', `Bearer ${session.value?.token}`)
    //   }
    // },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    }
  })
  return {
    provide: {
      api
    }
  }
})
