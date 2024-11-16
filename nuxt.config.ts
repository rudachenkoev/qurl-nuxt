// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/',
      pusherKey: process.env.NUXT_PUBLIC_PUSHER_KEY
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxt/image', '@nuxt/fonts'],
  css: ['~/assets/sass/main.sass'],
  fonts: {
    families: [{ name: 'Nunito', provider: 'google' }]
  },
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'uk', file: 'uk.json' }
    ],
    defaultLocale: 'en'
  }
})
