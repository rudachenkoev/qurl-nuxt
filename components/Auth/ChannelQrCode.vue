<script setup lang="ts">
import Pusher from 'pusher-js'
import type { Channel } from '~/types'
import { getAuthChannel } from '~/services/authService'

const config = useRuntimeConfig()
const localeRoute = useLocaleRoute()

let pusher: Pusher | null = null
// Function to initialize Pusher only once
const initPusher = () => {
  if (!pusher) {
    pusher = new Pusher(config.public.pusherKey, {
      cluster: 'eu'
    })
  }
}

const channel = ref('')
// Function to fetch and update the channel
const getChannel = async () => {
  try {
    handleChannelUnsubscribe()
    const response: Channel = await getAuthChannel()
    channel.value = response.channel
    return response
  } catch (err) {
    useErrorHandler(err, 'Error getting channel')
  }
}

// Function to handle login events
type LoginEventResponse = {
  token: string
}
const handleLogin = (data: LoginEventResponse) => {
  console.log('Login data:', data)
  const token = useCookie('TOKEN')
  token.value = `Bearer ${data.token}`

  const route = localeRoute({ name: 'index' })
  navigateTo(route ? route.fullPath : '/')
}

// Subscribe to a new channel and bind the login event
const handleChannelSubscribe = () => {
  if (!pusher) return
  const subscribedChannel = pusher.subscribe(channel.value)
  subscribedChannel.bind('login-event', handleLogin)
}

// Unsubscribe from a current channel
const handleChannelUnsubscribe = () => {
  if (pusher && channel.value) {
    pusher.unsubscribe(channel.value)
    channel.value = ''
  }
}

watch(channel, () => handleChannelSubscribe())

const channelUpdateInterval = ref()
onMounted(() => {
  initPusher()
  getChannel()
  channelUpdateInterval.value = setInterval(() => getChannel(), 20000)
})

onUnmounted(() => {
  if (channelUpdateInterval.value) {
    clearInterval(channelUpdateInterval.value)
  }
  handleChannelUnsubscribe()
})
</script>

<template>
  <QrCode :data="channel" />
</template>
