// providers/vercel.js
export default function ({ fullPath, metric }) {
  const url = 'https://vitals.vercel-analytics.com/v1/vitals'

  const body = {
    dsn: process.env.VERCEL_ANALYTICS_ID,
    id: metric.id,
    page: fullPath,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed:
      'connection' in navigator &&
      navigator.connection &&
      'effectiveType' in navigator.connection
        ? navigator.connection.effectiveType
        : ''
  }

  return { url, body }
}
