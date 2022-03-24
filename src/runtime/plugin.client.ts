import { defineNuxtPlugin, NuxtApp, useRuntimeConfig } from '#app'
import { withQuery } from 'ufo'

export const KEY = 'ga:user'
export const UID: string = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

const getConnectionSpeed = (): string => {
  // @ts-ignore
  return (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || ''
}

type WebVitalsMetric = {
  delta: number;
  value: number;
  id: string;
  name: 'TTFB' | 'FID' | 'LCP' | 'CLS' | 'FCP';
  entries: any[];
}

type RouteContext = {
  fullPath: string;
  href: string;
}

type GoogleAnalyticsOptions = {
  debug: boolean
  eventCategory: string
  id: string
}

type VercelAnalyticsOptions = {
  dsn: string
  debug: boolean
}

const eventListeners = []
// @ts-ignore
window.onVitalEvent = (listener) => {
  eventListeners.push(listener)
}

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { $router } = nuxtApp;
  const options = useRuntimeConfig().webVitals

  $router.afterEach(to => measureWebVitals({
    options,
    sendToAnalytics: analyticsProviders[options.provider].sendToAnalytics,
    route: to
  }))
})

export const measureWebVitals = async ({ route, options, sendToAnalytics }) => {
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

const analyticsProviders = {
  log: {
    sendToAnalytics: (context: RouteContext, metric: WebVitalsMetric, options: any) => {
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
  },
  vercel: {
    sendToAnalytics: ({ fullPath, href }, metric, options: VercelAnalyticsOptions) => {
      const body = {
        dsn: options.dsn,
        id: metric.id,
        page: fullPath,
        href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed()
      }

      if (options.debug) {
        console.log(metric.name, JSON.stringify(body, null, 2))
      }

      // This content type is necessary for `sendBeacon`
      const blob = new Blob([new URLSearchParams(body).toString()], {
        type: 'application/x-www-form-urlencoded'
      })

      send('https://vitals.vercel-analytics.com/v1/vitals', blob)
    }
  },
  ga: {
    sendToAnalytics: ({ fullPath, href }, metric, options: GoogleAnalyticsOptions) => {
      const opts = {
        ec: options.eventCategory,
        ea: metric.name as string,
        el: metric.id as string,
        // Google Analytics metrics must be integers, so the value is rounded.
        ev: parseInt(metric.delta) + '',
        dl: fullPath as string,
        dh: href as string,
        ni: 'true'
      }

      // Calculate the request time by subtracting from TTFB
      // everything that happened prior to the request starting.
      if (metric.name === 'TTFB') {
        // @ts-ignore
        opts.ev = parseInt(metric.delta - metric.entries[0].requestStart)
      }

      const url = withQuery('https://www.google-analytics.com/collect', {
        v: '1',
        t: 'event',
        tid: options.id,
        cid: UID,
        ...opts,
        z: Date.now() + ''
      })

      send(url)
    }
  }
}

const send = (url: string, body?) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
    return
  }

  fetch(url, {
    body,
    method: 'POST',
    credentials: 'omit',
    keepalive: true
  }).catch(err => {
    console.error('`[@nuxtjs/web-vitals]`', err)
  })
}

