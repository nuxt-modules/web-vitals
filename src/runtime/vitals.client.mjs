import { webVitals } from '~vitals'
import { sendToAnalytics } from '~vitals-provider'

const options = <%= JSON.stringify(options, null, 2) %>

const sendVitals = (to) => webVitals({
  options,
  sendToAnalytics,
  route: to
})

export default async function (ctx) {
  const router = ctx.app?.router || ctx.$router
  if (!router) { return }

  if ('isReady' in router) {
    // vue-router 4
    await router.isReady()
    sendVitals(router.currentRoute)
    router.afterEach((to) => sendVitals(to))
  } else {
    // vue-router 3
    router.onReady((to) => {
      sendVitals(to)
      router.afterEach((to) => sendVitals(to))
    })
  }
}
