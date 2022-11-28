export const KEY = 'ga:user'
export let UID = "";
try {
  UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())
} catch (err) {
  logError("Web Vitals GA Integration Disabled " + err.message)
}

export function logError (err) {
  console.error('[nuxt vitals]', err) // eslint-disable-line no-console
}

export function logDebug (label, ...args) {
  console.log(label, ...args) // eslint-disable-line no-console
}

export function getConnectionSpeed (): string {
  // @ts-ignore
  return (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || ''
}

export function send (url, body?) {
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
