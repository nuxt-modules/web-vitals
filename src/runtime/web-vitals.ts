import { logError } from './utils'

export async function webVitals({ route, options, sendToAnalytics }) {
  const context = {
    fullPath: route.fullPath,
    href: location.href,
  }

  // TODO: get page path
  // if (route.matched.length) {
  //   context.page = route.matched[route.matched.length - 1].components.default.options.__file || page
  // }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { onCLS, onFID, onLCP, onTTFB, onFCP } = await import('web-vitals').then((r: any) => r.default || r) as typeof import('web-vitals')
    onFID(metric => sendToAnalytics(context, metric, options))
    onTTFB(metric => sendToAnalytics(context, metric, options))
    onLCP(metric => sendToAnalytics(context, metric, options))
    onCLS(metric => sendToAnalytics(context, metric, options))
    onFCP(metric => sendToAnalytics(context, metric, options))
  }
  catch (err) {
    logError(err)
  }
}
