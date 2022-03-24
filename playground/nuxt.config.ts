import { defineNuxtConfig } from 'nuxt3'
import webVitalsModule from '../src/module'

export default defineNuxtConfig({
  buildModules: [
    webVitalsModule
  ],

  webVitals: {
    debug: true
  }

  // googleAnalytics: {
  //   id: 'hello'
  // }
})
