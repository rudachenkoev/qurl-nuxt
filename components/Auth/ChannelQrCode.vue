<script setup lang="ts">
import Pusher from 'pusher-js'

const { $api } = useNuxtApp()
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
type ChannelResponse = {
  channel: string
}
const getChannel = async () => {
  try {
    handleChannelUnsubscribe()
    const response: ChannelResponse = await $api('api/v1/auth/channel/')
    channel.value = response.channel
    return response
  } catch (err) {
    console.error('Error getting channel:', err)
  }
}

// Function to handle login events
type LoginEventResponse = {
  token: string
}
const handleLogin = (data: LoginEventResponse) => {
  console.log('Login data:', data)
  const token = useCookie('TOKEN', { httpOnly: false, sameSite: 'lax' })
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
