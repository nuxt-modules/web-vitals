const KEY = 'ga:user'
const UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

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
  const opts = {
    ec: 'Web Vitals',
    ea: name,
    el: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    ev: parseInt(delta),
    dp: fullPath,
    ni: true
  }

  // For CLS the value is first multiplied by 1000 for greater precision
  // (note: increase the multiplier for greater precision if needed).
  if (name === 'CLS') {
    opts.ev = parseInt(delta * 1000)
  }

  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if (name === 'TTFB') {
    opts.ev = parseInt(delta - entries[0].requestStart)
  }

  const args = { tid: '<%= options.trackingID %>', cid: UID, ...opts }
  const obj = { t: 'event', ...args, ...opts, z: Date.now() }
  const url = encode(obj)

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

function onError (err) {
  console.error('[nuuxt vitals]', err) // eslint-disable-line no-console
}

export default function ({ app: { router } }) {
  router.onReady((to) => {
    webVitals(to.fullPath)
    router.afterEach(to => webVitals(to.fullPath))
  })
}
