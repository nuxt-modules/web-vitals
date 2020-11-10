export const PROVIDERS = [
  {
    name: 'log',
    runtime: require.resolve('./runtime/providers/log'),
    autoDetect: false,
    defaults: () => ({}),
    validate: () => {},
  },
  {
    name: 'ga',
    runtime: require.resolve('./runtime/providers/ga'),
    defaults: (nuxtOptions) => ({
      eventCategory: 'Web Vitals',
      id: nuxtOptions.googleAnalytics && nuxtOptions.googleAnalytics.id
    }),
    validate({ id }) {
      if (!id) {
        throw new Error('[@nuxtjs/vitals] googleAnalytics.id is required for Google Analytics integration')
      }
    }
  },
  {
    name: 'vercel',
    runtime: require.resolve('./runtime/providers/vercel'),
    defaults: (nuxtOptions) => ({
      dns: process.env.VERCEL_DSN
    }),
    validate({ dsn }) {
      if (!dsn) {
        throw new Error('[@nuxtjs/vitals] vercel.dsn or VERCEL_DSN environment is required for Vercel integration')
      }
    }
  },
]
