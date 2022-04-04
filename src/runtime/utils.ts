export const send = (url: string, body?) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
    return
  }

  fetch(url, {
    body,
    method: 'POST',
    credentials: 'omit',
    keepalive: true
  }).catch(err => {
    console.error('`[@nuxtjs/web-vitals]`', err)
  })
}
