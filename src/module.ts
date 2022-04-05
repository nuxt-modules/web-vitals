import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import defu from 'defu'

type AnalyticsProvider = 'log' | 'vercel' | 'ga'

export interface ModuleOptions {
  provider: AnalyticsProvider;
  debug: boolean;
  disabled: boolean;
  options?: {
    googleMeasurementId: string;
    vercelAnalyticsDsn: string;
  }
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    webVitals: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/web-vitals',
    configKey: 'webVitals'
  },
  defaults: {
    provider: 'log',
    debug: false,
    disabled: false
  },
  setup (options, nuxt) {
    if (options.disabled) {
      return
    }

    let defaultProvider: AnalyticsProvider;

    if (!options.provider || (options.provider !== 'ga' && options.provider !== 'vercel')) {
      defaultProvider = 'log'
      console.warn('`[@nuxtjs/web-vitals]` No Analytics providers selected. Using built in `log`')
    }

    if (options.provider === 'ga' && !options.options.googleMeasurementId) {
      throw new Error('`[@nuxtjs/web-vitals]` Missing Google Measurement ID in module configuration')
    }

    if (options.provider === 'vercel' && !options.options.vercelAnalyticsDsn) {
      throw new Error('`[@nuxtjs/web-vitals]` Missing Vercel Analytics DSN in module configuration')
    }

    nuxt.options.publicRuntimeConfig.webVitals = defu(nuxt.options.publicRuntimeConfig.webVitals, {
      provider: defaultProvider || options.provider,
      debug: options.debug,
      disabled: options.disabled,
      options: options.options
    })

    nuxt.options.alias.ufo = 'ufo/dist/index.mjs'


    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    const providerRuntime = require.resolve(`./runtime/providers/${options.provider}`)

    nuxt.options.alias['~vitals-provider'] = providerRuntime
    nuxt.options.build.transpile.push(dirname(providerRuntime))

    addPlugin(resolve(runtimeDir, 'plugin.client'))

    console.log('`[@nuxtjs/web-vitals]` Module loaded correctly 🚀')
  }
})
