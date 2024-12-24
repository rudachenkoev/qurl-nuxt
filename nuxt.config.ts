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
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxt/image', '@nuxt/fonts', '@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  fonts: {
    families: [{ name: 'Raleway', provider: 'google' }]
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'uk', language: 'uk-UA', file: 'uk.json' }
    ],
    // lazy: false,
    defaultLocale: 'en'
  }
})
