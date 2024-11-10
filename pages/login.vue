<script setup lang="ts">
interface ChannelHashResponse {
  channelHash: string
}

const { data, refresh: getChannelHash } = await useApi<ChannelHashResponse>('api/v1/auth/channel-hash')

const channelHashUpdateInterval = ref()

onMounted(() => {
  channelHashUpdateInterval.value = setInterval(getChannelHash, 20000)
})
onUnmounted(() => {
  clearInterval(channelHashUpdateInterval.value)
})
</script>

<template>
  <QrCode :data="data?.channelHash || ''" />
</template>

<style scoped></style>
