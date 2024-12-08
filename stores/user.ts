export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp()

  interface User {
    email: string
    isActive: boolean
  }
  const user = ref<User | null>(null)
  const getCurrentUser = async () => {
    try {
      user.value = await $api('api/v1/accounts/me/')
      return user.value
    } catch (err) {
      useErrorHandler(err, 'Get current user error')
    }
  }

  interface Contact {
    id: string
    externalId: string
    name: string
    birthday: string
    createdAt: string
    updatedAt: string
  }
  const isContactsLoaded = ref(false)
  const contacts = ref<Contact[]>([])
  const getCurrentUserContacts = async () => {
    try {
      contacts.value = await $api('api/v1/accounts/contacts/')
      isContactsLoaded.value = true
      return contacts.value
    } catch (err) {
      useErrorHandler(err, 'Get current user contacts error')
    }
  }

  return { user, getCurrentUser, contacts, isContactsLoaded, getCurrentUserContacts }
})
