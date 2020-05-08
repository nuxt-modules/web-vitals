const KEY = 'ga:user'
const UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

function encode(obj) {
  let k
  let str = 'https://www.google-analytics.com/collect?v=1'
  for (k in obj) {
    if (obj[k]) {
      str += `&${k}=${encodeURIComponent(obj[k])}`
    }
  }
  return str
}

async function sendToAnalytics(fullPath, metric) {
  const { name, delta, entries } = metric
  let opts = {
    ec: 'Web Vitals',
    ea: name,
    el: fullPath,
    // Google Analytics metrics must be integers, so the value is rounded.
    ev: parseInt(delta),
    ni: false
  }

  // For CLS the value is first multiplied by 1000 for greater precision
  // (note: increase the multiplier for greater precision if needed).
  if ('CLS' === name) opts.ev = parseInt(delta * 1000)
  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if ('TTFB' === name) opts.ev = parseInt(delta - entries[0].requestStart)

  const args = Object.assign({ tid: '<%= options.trackingID %>', cid: UID }, opts)
  const obj = Object.assign({ t: 'event' }, args, opts, { z: Date.now() })
  const URL = encode(obj)

  if (process.browser && navigator.sendBeacon)
    navigator.sendBeacon(URL, null)
  else
    fetch(URL, { method: 'POST', keepalive: true })
}

async function webVitals(fullPath) {
  await import('web-vitals').then(
    ({ getCLS, getFID, getLCP, getTTFB, getFCP }) => {
      getFID(metric => sendToAnalytics(fullPath, metric))
      getTTFB(metric => sendToAnalytics(fullPath, metric))
      getLCP(metric => sendToAnalytics(fullPath, metric))
      getCLS(metric => sendToAnalytics(fullPath, metric))
      getFCP(metric => sendToAnalytics(fullPath, metric))
    }
  )
}

export default async function ({ app: { router } }) {
  router.onReady(async to => {
    await webVitals(to.fullPath)
    router.afterEach(async to => await webVitals(to.fullPath))
  })
}
