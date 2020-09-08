const KEY = 'ga:user'
const UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

function onError (err) {
  console.error('[nuxt vitals]', err) // eslint-disable-line no-console
}

function onDebug (label, payload) {
  console.log(label, payload) // eslint-disable-line no-console
}

function encode (obj) {
  let k
  let str = 'https://www.google-analytics.com/collect?v=1'
  for (k in obj) {
    if (obj[k]) {
      str += `&${k}=${encodeURIComponent(obj[k])}`
    }
  }
  return str
}

function sendToAnalytics (fullPath, metric) {
  const { name, delta, id, entries } = metric
  const multiplier = parseInt('<%= options.multiplierForCLS %>')
  const opts = {
    ec: '<%= options.eventCategory %>',
    ea: name,
    el: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is multiplied by 1000 by default for greater precision
    ev: Math.round(name === 'CLS' ? delta * multiplier : delta),
    dh: document.location.hostname,
    dp: fullPath,
    ni: true
  }

  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if (name === 'TTFB') {
    opts.ev = parseInt(delta - entries[0].requestStart)
  }

  const args = { tid: '<%= options.trackingID %>', cid: UID, ...opts }
  const obj = { t: 'event', ...args, ...opts, z: Date.now() }
  const url = encode(obj)

  const debug = parseInt('<%= options.debug %>')
  // damn eslint no-constant-condition
  if (debug === 1) {
    onDebug(name, JSON.stringify(obj, null, 2))
    onDebug(name + ' URL', url)
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, null)
  } else {
    fetch(url, { method: 'POST', keepalive: true }).catch(onError)
  }
}

async function webVitals (fullPath) {
  try {
    const { getCLS, getFID, getLCP, getTTFB, getFCP } = await import('web-vitals')
    getFID(metric => sendToAnalytics(fullPath, metric))
    getTTFB(metric => sendToAnalytics(fullPath, metric))
    getLCP(metric => sendToAnalytics(fullPath, metric))
    getCLS(metric => sendToAnalytics(fullPath, metric))
    getFCP(metric => sendToAnalytics(fullPath, metric))
  } catch (err) {
    onError(err)
  }
}

export default function ({ app: { router } }) {
  router.onReady((to) => {
    webVitals(to.fullPath)
    router.afterEach(to => webVitals(to.fullPath))
  })
}
