import { logDebug, getConnectionSpeed, send } from '../utils'

export interface Options {
  dsn: string
  debug: boolean
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals?d=1'

export function sendToAnalytics ({ fullPath, href }, metric, options: Options) {
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
    logDebug(metric.name, JSON.stringify(body, null, 2))
  }

  // This content type is necessary for `sendBeacon`
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded'
  })

  send(vitalsUrl, blob)
}
