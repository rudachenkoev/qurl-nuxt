export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp()

  const user = ref(null)
  const getCurrentUser = async () => {
    try {
      user.value = await $api('api/v1/accounts/me/')
      return user.value
    } catch (err) {
      useErrorHandler(err, 'Get current user error')
    }
  }

  return { user, getCurrentUser }
})
