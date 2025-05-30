// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@tresjs/nuxt'],
  runtimeConfig: {
    public: {
      email: 'placeholder',
      linkedIn: 'placeholder',
      github: 'placeholder'
    }
  }
})