import type { ModuleOptions } from "../../module"
import type { RouteContext, WebVitalsMetric } from "../types"
import { send } from '../utils'

export const KEY = 'ga:user'
export const UID: string = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())
const GOOGLE_ANALYTICS_URL: string = 'https://www.google-analytics.com/collect'


export const sendToAnalytics = ({ fullPath, href }: RouteContext, metric: WebVitalsMetric, options: ModuleOptions) => {
  const opts = {
    ec: 'Web Vitals',
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

  const url = `${GOOGLE_ANALYTICS_URL}?` + new URLSearchParams({
    v: '1',
    t: 'event',
    tid: options.options.googleMeasurementId,
    cid: UID,
    ...opts,
    z: Date.now() + ''
  })

  send(url)
}
