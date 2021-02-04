// import { NuxtConfig } from '@nuxt/types'
import nuxtVitals from '../src'

export default {
  buildModules: [
    '@nuxt/typescript-build',
    nuxtVitals
  ],

  vitals: {
    provider: 'log'
  },

  // googleAnalytics: {
  //   id: 'hello'
  // }
}
