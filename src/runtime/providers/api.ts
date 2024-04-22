import { logDebug, send } from '../utils'

export interface Options {
  debug: boolean
  url: string
}

export function sendToAnalytics({ fullPath, href }, metric, options: Options) {
  const body = {
    path: fullPath,
    href,
    ...metric,
  }

  if (options.debug) {
    logDebug(metric.name, JSON.stringify(body, null, 2))
  }

  const blob = new Blob([JSON.stringify(body)], {
    type: 'application/json',
  })

  send(options.url, blob)
}
