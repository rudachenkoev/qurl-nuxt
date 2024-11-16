<script setup lang="ts">
import QRCodeStyling, { type Options } from 'qr-code-styling'
import Logo from './public/images/favicon.png'
import tailwindConfig from '~/tailwind.config'

const props = defineProps({
  data: { type: String, default: '' },
  size: { type: Number, default: 256 }
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
    color: tailwindConfig.theme.extend.colors.shark[950],
    type: 'extra-rounded'
  },
  backgroundOptions: {
    color: tailwindConfig.theme.extend.colors.shark[50]
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 10
  },
  cornersSquareOptions: {
    type: 'extra-rounded'
  }
}))

onMounted(() => {
  qrCodeStyling.value = new QRCodeStyling(options.value)
  qrCodeStyling.value.append(qrCode.value)
})

watch(options, value => qrCodeStyling.value.update(value))
</script>

<template>
  <div ref="qrCode" class="overflow-hidden rounded-xl" />
</template>
