const eventListeners = []
// @ts-ignore
window.onVitalEvent = (listener) => {
  eventListeners.push(listener)
}

export function sendToAnalytics (context, metric, options: any) {
  const event = {
    date: new Date(),
    context,
    metric,
    options
  }
  eventListeners.forEach((listener) => {
    listener(event)
  })

  // eslint-disable-next-line no-console
  console.log('[nuxt vitals]', metric.name, metric.value, context, {
    context,
    metric,
    options
  })
}
