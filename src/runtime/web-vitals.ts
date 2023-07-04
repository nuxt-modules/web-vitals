
import { logError } from './utils'

export async function webVitals ({ route, options, sendToAnalytics }) {
  const context = {
    fullPath: route.fullPath,
    href: location.href
  }

  // TODO: get page path
  // if (route.matched.length) {
  //   context.page = route.matched[route.matched.length - 1].components.default.options.__file || page
  // }

  try {
    const { getCLS, getFID, getLCP, getTTFB, getFCP, getINP } = await import('web-vitals').then((r: any) => r.default || r)
    getFID(metric => sendToAnalytics(context, metric, options))
    getTTFB(metric => sendToAnalytics(context, metric, options))
    getLCP(metric => sendToAnalytics(context, metric, options))
    getCLS(metric => sendToAnalytics(context, metric, options))
    getFCP(metric => sendToAnalytics(context, metric, options))
    getINP(metric => sendToAnalytics(context, metric, options))
  } catch (err) {
    logError(err)
  }
}
