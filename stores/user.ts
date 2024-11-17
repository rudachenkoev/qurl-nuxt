export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp()

  const user = ref(null)
  const getCurrentUser = async () => {
    try {
      user.value = await $api('api/v1/accounts/me/')
      return user.value
    } catch (err) {
      console.error('Get current user error:', err)
    }
  }

  return { user, getCurrentUser }
})
