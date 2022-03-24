import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import defu from 'defu'


interface ModuleOptions {
  provider: 'log' | 'vercel' | 'ga';
  debug: boolean;
  disabled: boolean;
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    webVitals: ModuleOptions
  }
}

// export * from './types'

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
    let defaultProvider: string;

    if (!options.provider || (options.provider !== 'ga' && options.provider !== 'vercel')) {
      defaultProvider = 'log'
      console.warn('`[@nuxtjs/web-vitals]` No Analytics providers selected. Using built in `log`')
    }

    if (options.disabled) {
      return
    }

    nuxt.options.publicRuntimeConfig.webVitals = defu(nuxt.options.publicRuntimeConfig.webVitals, {
      provider: defaultProvider || options.provider,
      debug: options.debug,
      disabled: options.disabled,
    })

    nuxt.options.alias.ufo = 'ufo/dist/index.mjs'

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin.client'))

    console.log('`[@nuxtjs/web-vitals]` Module loaded correctly 🚀')
  }
})
