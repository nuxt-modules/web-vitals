import { defineNuxtConfig } from 'nuxt'
import webVitalsModule from '../src/module'

export default defineNuxtConfig({
  buildModules: [
    webVitalsModule
  ],

  webVitals: {
    debug: true,
    provider: 'log',
  }
})
