import { logError, logDebug, getConnectionSpeed } from '../utils'

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export interface Options {
  debug: boolean
}

export function sendToAnalytics ({ fullPath, href }, metric, options: Options) {
  if (!window.dataLayer) {
    logError('window.dataLayer is undefined, probably GTM is not installed')
    return
  }

  const event = {
    event: 'webVitals',
    webVitalsMeasurement: {
      page: fullPath,
      href,
      name: metric.name,
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      valueRounded: metric.valueRounded,
      deltaRounded: metric.deltaRounded,
      speed: getConnectionSpeed()
    }
  }

  if (options.debug) {
    logDebug(metric.name, JSON.stringify(event, null, 2))
  }

  window.dataLayer.push(event)
}
