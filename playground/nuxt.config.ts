// import { NuxtConfig } from '@nuxt/types'
import webVitals
  from '../src'

export default {
  buildModules: [
    'nuxt-swc',
    webVitals
  ],

  webVitals: {
    debug: true
  }

  // googleAnalytics: {
  //   id: 'hello'
  // }

  // api: {
  //   url: '/analytics'
  // },
  // serverMiddleware: ['~/api/analytics'],
}
