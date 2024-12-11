import type { Contact, User } from '~/types'
import { useApiCall } from '~/services/index'

export const getAccountInformation = () => useApiCall<User>('api/v1/accounts/me/')

export const getAccountContacts = () => useApiCall<Contact[]>('api/v1/accounts/contacts/')
