import { webVitals } from '~vitals'
import { sendToAnalytics } from '~vitals-provider'

const options = <%= JSON.stringify(options, null, 2) %>

export default function ({ app: { router } }) {
  router.onReady((to) => {
    webVitals({
      options,
      sendToAnalytics,
      route: to
    })
    router.afterEach(to => webVitals({
      options,
      sendToAnalytics,
      route: to
    }))
  })
}
