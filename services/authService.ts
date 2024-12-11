import type { Channel } from '~/types'
import { useApiCall } from '~/services/index'

export const getAuthChannel = () => useApiCall<Channel>('api/v1/auth/channel/')
