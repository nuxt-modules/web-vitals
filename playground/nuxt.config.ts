// import { NuxtConfig } from '@nuxt/types'
import webVitals
  from '../src'

export default {
  buildModules: [
    '@nuxt/typescript-build',
    webVitals
  ],

  webVitals: {
    debug: true
  }

  // googleAnalytics: {
  //   id: 'hello'
  // }
}
