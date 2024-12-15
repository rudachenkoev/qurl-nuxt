import type { Contact, User } from '~/types'
import { getAccountContacts, getAccountInformation } from '~/services/accountService'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const getCurrentUser = async () => {
    try {
      user.value = await getAccountInformation()
      return user.value
    } catch (err) {
      useErrorHandler(err, 'Get current user error')
    }
  }

  const isContactsLoaded = ref(false)
  const contacts = ref<Contact[]>([])
  const getCurrentUserContacts = async () => {
    try {
      contacts.value = await getAccountContacts()
      isContactsLoaded.value = true
      return contacts.value
    } catch (err) {
      useErrorHandler(err, 'Get current user contacts error')
    }
  }

  return { user, getCurrentUser, contacts, isContactsLoaded, getCurrentUserContacts }
})
