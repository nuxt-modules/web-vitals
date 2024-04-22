const eventListeners: Array<(event: unknown) => unknown> = []
// @ts-expect-error untyped window global
window.onVitalEvent = (listener) => {
  eventListeners.push(listener)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendToAnalytics(context, metric, options: any) {
  const event = {
    date: new Date(),
    context,
    metric,
    options,
  }
  eventListeners.forEach((listener) => {
    listener(event)
  })

  console.log('[nuxt vitals]', metric.name, metric.value, context, {
    context,
    metric,
    options,
  })
}
