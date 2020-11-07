import * as vitals from 'web-vitals'

// eslint-disable-next-line no-console
const onError = err => console.error('[nuxt vitals] ', err)

// eslint-disable-next-line no-console
const onDebug = (label, payload) => console.log('[nuxt vitals] ', label, payload)

async function sendToAnalytics ({ fullPath, metric, trackingID, eventCategory, debug }) {
  let provider

  if (trackingID.startsWith('UA-')) {
    provider = 'ga'
  } else {
    provider = 'vercel'
  }

  try {
    const useProvider = await (await import('nuxt-vitals/providers/' + provider + '.js')).default
    const { url, body } = useProvider({ fullPath, metric, trackingID, eventCategory })

    if (debug === 1) {
      onDebug(name, JSON.stringify({ url, body }, null, 2))
    }

    const blob = new Blob([new URLSearchParams(body).toString()], {
      type: 'application/x-www-form-urlencoded'
    })

    ;(navigator.sendBeacon && navigator.sendBeacon(url, blob)) ||
      fetch(url, {
        body: blob,
        method: 'POST',
        credentials: 'omit',
        keepalive: true
      })
  } catch (err) {
    onError(err)
  }
}

function webVitals (fullPath) {
  Object.keys(vitals).forEach(vital => vitals[vital](async metric => await sendToAnalytics({
    fullPath,
    metric,
    trackingID: '<%= options.trackingID %>',
    eventCategory: '<%= options.eventCategory %>',
    debug: parseInt('<%= options.debug %>')
  })))
}

export default function ({ app: { router } }) {
  router.onReady((to) => {
    webVitals(to.fullPath)
    router.afterEach(to => webVitals(to.fullPath))
  })
}
