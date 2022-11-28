import { webVitals } from './web-vitals'
import { defineNuxtPlugin, useRouter } from '#imports'
import { sendToAnalytics } from '~web-vitals-provider'
// @ts-ignore
import webVitalsOptions from '#build/web-vitals-config.mjs'

const sendVitals = to => webVitals({
  options: webVitalsOptions,
  sendToAnalytics,
  route: to
})

export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.afterEach(to => sendVitals(to))
  router.isReady().then(() => { sendVitals(router.currentRoute) })
})
