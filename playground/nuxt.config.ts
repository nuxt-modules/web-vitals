import { NuxtConfig } from '@nuxt/types'
import nuxtVitals from '../src/module'

export default {
  buildModules: [
    '@nuxt/typescript-build',
    nuxtVitals
  ],

  vitals: {
    // provider: 'log'
    vercel: {
      dns: 'hello'
    }
  },

  // googleAnalytics: {
  //   id: 'hello'
  // }
}
