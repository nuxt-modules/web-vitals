import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],
  webVitals: {
    debug: true
  }
  // googleAnalytics: {
  //   id: 'hello'
  // }
})
