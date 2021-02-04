
export const KEY = 'ga:user'
export const UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

export function logError (err) {
  console.error('[nuxt vitals]', err) // eslint-disable-line no-console
}

export function logDebug (label, ...args) {
  console.log(label, ...args) // eslint-disable-line no-console
}

export function encodeParams (obj) {
  let str = ''
  for (const k in obj) {
    if (obj[k]) {
      str += `${k}=${encodeURIComponent(obj[k])}`
    }
  }
  return str
}

export function getConnectionSpeed (): string {
  // @ts-ignore
  return (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || ''
}

export function send (url, body?) {
  logDebug('Sending event:', url, body)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
    return
  }

  fetch(url, {
    body,
    method: 'POST',
    credentials: 'omit',
    keepalive: true
  }).catch(logError)
}
