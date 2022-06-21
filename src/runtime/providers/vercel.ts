import { RouteContext, WebVitalsMetric } from "../types"
import { send, getConnectionSpeed } from "../utils"
import type { ModuleOptions } from '../../module'

const VERCEL_ANALYTICS_URL: string = 'https://vitals.vercel-analytics.com/v1/vitals'

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

  send(VERCEL_ANALYTICS_URL, blob)
}
