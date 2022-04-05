import { ModuleOptions } from "../../module"
import { RouteContext, WebVitalsMetric } from "../types"
import { withQuery } from 'ufo'
import { send } from "../utils"

export const KEY = 'ga:user'
export const UID: string = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())


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

  const url = withQuery('https://www.google-analytics.com/collect', {
    v: '1',
    t: 'event',
    tid: options.options.googleMeasurementId,
    cid: UID,
    ...opts,
    z: Date.now() + ''
  })

  send(url)
}
