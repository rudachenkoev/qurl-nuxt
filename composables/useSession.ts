export function useLogout() {
  const token = useCookie('TOKEN')
  const localeRoute = useLocaleRoute()

  token.value = null
  const route = localeRoute({ name: 'login' })
  return navigateTo(route ? route.fullPath : '/login')
}
