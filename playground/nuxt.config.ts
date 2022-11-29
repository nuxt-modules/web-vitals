import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],
  webVitals: {
    // provider: 'log',
    // api: { url: '/api/web-vitals' }
    // ga: { id: 123 },
    debug: true
  }
})
