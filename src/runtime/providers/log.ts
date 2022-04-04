import { ModuleOptions } from "../../module"
import { RouteContext, WebVitalsMetric } from "../types"

const eventListeners = []
// @ts-ignore
window.onVitalEvent = (listener) => {
  eventListeners.push(listener)
}

export const sendToAnalytics = (context: RouteContext, metric: WebVitalsMetric, options: ModuleOptions) => {
  const event = {
    date: new Date(),
    context,
    metric,
    options
  }
  eventListeners.forEach((listener) => {
    listener(event)
  })

  // eslint-disable-next-line no-console
  console.log('`[@nuxtjs/web-vitals]`', metric.name, metric.value, context, {
    context,
    metric,
    options
  })
}
