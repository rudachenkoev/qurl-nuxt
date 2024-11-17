import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('TOKEN')

  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const localeRoute = useLocaleRoute()
  const loginRoute = localeRoute({ name: 'login' })
  const indexRoute = localeRoute({ name: 'index' })

  if (!loginRoute || !indexRoute) {
    return abortNavigation('Error: Failed to resolve routes for "login" or "index".')
  }

  if (token.value) {
    // Redirect logged-in users away from the login page
    if (user.value && to.name === loginRoute.name) {
      return navigateTo(indexRoute.fullPath)
    }
    if (!user.value) {
      // Fetch user data if not already loaded
      await userStore.getCurrentUser()
    }
  } else if (to.name !== loginRoute.name) {
    // Redirect to login page if no token is present
    return navigateTo(loginRoute.fullPath)
  }
})
