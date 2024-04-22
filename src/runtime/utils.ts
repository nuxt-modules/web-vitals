export const KEY = 'ga:user'
export const UID = _getUID()

function _getUID() {
  let uid
  // Try to restore from localStorage
  try { uid = localStorage[KEY] }
  catch { }
  if (!uid) {
    uid = Math.random() + '.' + Math.random()
    // Try to save to localStorage
    try { localStorage[KEY] = uid }
    catch { }
  }
  return uid
}

export function logError(err) {
  console.error('[nuxt vitals]', err)
}

export function logDebug(label, ...args) {
  console.log(label, ...args)
}

export function getConnectionSpeed(): string {
  // @ts-expect-error
  return (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || ''
}

export function send(url, body?) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
    return
  }

  fetch(url, {
    body,
    method: 'POST',
    credentials: 'omit',
    keepalive: true,
  }).catch(logError)
}
