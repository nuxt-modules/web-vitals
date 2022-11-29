export const PROVIDERS = [
  {
    name: 'log',
    runtime: './runtime/providers/log',
    autoDetect: false,
    defaults: () => ({}),
    validate: () => {}
  },
  {
    name: 'ga',
    runtime: './runtime/providers/ga',
    defaults: nuxtOptions => ({
      eventCategory: 'Web Vitals',
      id: process.env.GOOGLE_ANALYTICS_ID || (nuxtOptions.googleAnalytics && nuxtOptions.googleAnalytics.id)
    }),
    validate ({ id }) {
      if (!id) {
        throw new Error('[@nuxtjs/web-vitals] `googleAnalytics.id` is required for Google Analytics integration')
      }
    }
  },
  {
    name: 'vercel',
    runtime: './runtime/providers/vercel',
    defaults: _nuxtOptions => ({
      dsn: process.env.VERCEL_ANALYTICS_ID
    }),
    validate ({ dsn }) {
      if (!dsn) {
        throw new Error('[@nuxtjs/web-vitals] `vercel.dsn` or `VERCEL_ANALYTICS_ID` environment is required for Vercel integration')
      }
    }
  },
  {
    name: 'api',
    runtime: require.resolve('./runtime/providers/api'),
    defaults: nuxtOptions => ({
      url: (nuxtOptions.api && nuxtOptions.api.url)
    }),
    validate ({ url }) {
      if(!url) {
        throw new Error('[@nuxtjs/web-vitals] api.url is required for API integration')
      }
    }
  }
]
