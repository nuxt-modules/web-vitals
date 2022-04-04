import { RouteContext, WebVitalsMetric } from "../types"
import { send } from "../utils"
import { ModuleOptions } from '../../module'

const getConnectionSpeed = (): string => {
  // @ts-ignore
  return (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || ''
}

export const sendToAnalytics = ({ fullPath, href }: RouteContext, metric: WebVitalsMetric, options: ModuleOptions) => {
  const body = {
    dsn: options.options.vercelAnalyticsDsn,
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
