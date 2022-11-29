import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],
  webVitals: {
    // provider: 'log',
    debug: true
  }
  // googleAnalytics: { id: '123' }
})
