import { webVitals } from './web-vitals'
import { sendToAnalytics } from '~web-vitals-provider'
// @ts-expect-error
import webVitalsOptions from '#build/web-vitals-config.mjs'

const sendVitals = to => webVitals({
  options: webVitalsOptions,
  sendToAnalytics,
  route: to,
})

export default function (ctx) {
  const router = (ctx.app && ctx.app.router) || ctx.$router
  if (!router) { return }
  router.onReady((to) => {
    sendVitals(to)
    router.afterEach(to => sendVitals(to))
  })
}
