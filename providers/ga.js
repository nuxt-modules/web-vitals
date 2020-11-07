// providers/ga.js
export default function ({ fullPath, metric, trackingID, eventCategory }) {
  const url = 'https://www.google-analytics.com/collect?v=1'
  const KEY = 'ga:user'
  const UID = (localStorage[KEY] = localStorage[KEY] || Math.random() + '.' + Math.random())

  const { name, delta, id, entries } = metric

  const opts = {
    ec: eventCategory,
    ea: name,
    el: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    ev: parseInt(delta),
    dp: fullPath,
    ni: true
  }

  const args = { tid: trackingID, cid: UID, ...opts }
  const body = { t: 'event', ...args, ...opts, z: Date.now() }

  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  if (name === 'TTFB') {
    opts.ev = parseInt(delta - entries[0].requestStart)
  }
  return { url, body }
}
