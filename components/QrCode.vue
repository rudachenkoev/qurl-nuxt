<script setup lang="ts">
import QRCodeStyling, { type Options } from 'qr-code-styling'
import Logo from '../public/images/facebook_logo.svg'

const props = defineProps({
  data: { type: String, default: '' },
  size: { type: Number, default: 300 }
})

const qrCodeStyling = ref()
const qrCode = ref<HTMLElement | null>(null)
const options = computed<Partial<Options>>(() => ({
  width: props.size,
  height: props.size,
  type: 'svg',
  data: props.data,
  image: Logo,
  dotsOptions: {
    color: '#000',
    type: 'rounded'
  },
  backgroundOptions: {
    color: '#fff'
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 10
  }
}))

onMounted(() => {
  qrCodeStyling.value = new QRCodeStyling(options.value)
  qrCodeStyling.value.append(qrCode.value)
})

watch(options, value => qrCodeStyling.value.update(value))
</script>

<template>
  <div ref="qrCode"></div>
</template>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
