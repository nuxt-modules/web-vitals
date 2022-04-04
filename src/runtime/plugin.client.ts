import { defineNuxtPlugin, NuxtApp, useRuntimeConfig } from '#app'
import { ModuleOptions } from '../module'
import { RouteContext, WebVitalsMetric } from './types'
import { sendToAnalytics } from '~vitals-provider'

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { $router } = nuxtApp;
  const options = useRuntimeConfig().webVitals

  $router.afterEach(to => measureWebVitals({
    options,
    sendToAnalytics,
    route: to
  }))
})

export const measureWebVitals = async ({ route, options, sendToAnalytics }: { route: any, options: ModuleOptions, sendToAnalytics: Function }) => {
  const context: RouteContext = {
    fullPath: route.fullPath,
    href: location.href
  }

  try {
    const { getCLS, getFID, getLCP, getTTFB, getFCP } = await import('web-vitals').then((r: any) => r.default || r)
    getFID((metric: WebVitalsMetric) => sendToAnalytics(context, metric, options))
    getTTFB((metric: WebVitalsMetric) => sendToAnalytics(context, metric, options))
    getLCP((metric: WebVitalsMetric) => sendToAnalytics(context, metric, options))
    getCLS((metric: WebVitalsMetric) => sendToAnalytics(context, metric, options))
    getFCP((metric: WebVitalsMetric) => sendToAnalytics(context, metric, options))
  } catch (err) {
    console.error('`[@nuxtjs/web-vitals]`', err)
  }
}
