import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
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

    const { resolve } = createResolver(import.meta.url)

    let defaultProvider: AnalyticsProvider;

    if (!options.provider || (options.provider !== 'ga' && options.provider !== 'vercel')) {
      console.warn('`[@nuxtjs/web-vitals]` No Analytics providers selected. Using built in `log`')
    }

    if (options.provider === 'ga' && !options.options.googleMeasurementId) {
      throw new Error('`[@nuxtjs/web-vitals]` Missing Google Measurement ID in module configuration')
    }

    if (options.provider === 'vercel' && !options.options.vercelAnalyticsDsn) {
      throw new Error('`[@nuxtjs/web-vitals]` Missing Vercel Analytics DSN in module configuration')
    }

    nuxt.options.runtimeConfig.public.webVitals = defu(nuxt.options.runtimeConfig.public.webVitals, {
      provider: defaultProvider || options.provider,
      debug: options.debug,
      disabled: options.disabled,
      options: options.options
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    const providerRuntime = resolve(`./runtime/providers/${options.provider}`)

    nuxt.options.alias['#web-vitals-provider'] = providerRuntime
    nuxt.options.build.transpile.push(dirname(providerRuntime))

    addPlugin(resolve(runtimeDir, 'plugin.client'))
  }
})
