import { UID, encodeParams, send } from '../utils'

const googleAnalyticsURL = 'https://www.google-analytics.com/collect?v=1&'

export interface Options {
  debug: boolean
  eventCategory: string
  id: string
}

// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dl

export function sendToAnalytics ({ fullPath, href }, metric, options: Options) {
  const opts = {
    ec: options.eventCategory,
    ea: metric.name,
    el: metric.id,
    // Google Analytics metrics must be integers, so the value is rounded.
    ev: parseInt(metric.delta),
    dl: fullPath,
    dh: href,
    ni: true
  }

  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if (metric.name === 'TTFB') {
    // @ts-ignore
    opts.ev = parseInt(metric.delta - metric.entries[0].requestStart)
  }

  const url = googleAnalyticsURL + encodeParams({
    t: 'event',
    tid: options.id,
    cid: UID,
    ...opts,
    z: Date.now()
  })

  send(url)
}
