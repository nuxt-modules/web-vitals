import { dirname, join } from 'pathe'
import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addTemplate, createResolver, isNuxt2 } from '@nuxt/kit'
import { PROVIDERS } from './providers'

export interface ModuleOptions {
  provider: 'auto' | 'log' | 'ga' | 'vercel' | 'api'
  debug: boolean
  disabled: boolean
  ga: { id: string }
  vercel: { dsn: string }
  api: { url: string }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    ['googleAnalytics']?: { id?: string }
    ['webVitals']?: Partial<ModuleOptions>
   }
}

export default defineNuxtModule({
  meta: {
    name: 'web-vitals',
    configKey: 'webVitals',
    compatibility: {
      nuxt: '^3.0.0 || ^2.15.0'
    }
  },
  defaults: {
    provider: 'auto',
    debug: false,
    disabled: false
  },
  async setup (options, nuxt) {
    if (options.disabled) {
      return
    }

    const resolver = createResolver(import.meta.url)

    const resolveProvider = (providerName: string, userOptions = {}) => {
      const provider: any = PROVIDERS.find(p => p.name === providerName)
      if (!provider) {
        throw new Error('Provider not found: ' + providerName)
      }
      provider.options = defu(userOptions, provider.defaults(nuxt.options))
      provider.validate(provider.options)
      return provider
    }

    let provider

    // Auto detect provider
    if (options.provider === 'auto') {
      // Try to validate each provider
      for (const _provider of PROVIDERS) {
        if (_provider.autoDetect === false) { continue }
        try {
          provider = resolveProvider(_provider.name, (options as any)[_provider.name])
          // eslint-disable-next-line no-console
          console.info('[@nuxtjs/web-vitals] Auto detected provider:', provider.name)
          break
        } catch (err) {
          // Ignore error on auto detection
        }
      }
      // Fallback
      if (!provider) {
        if (nuxt.options.dev && options.debug) {
          provider = resolveProvider('log')
        } else {
          // eslint-disable-next-line no-console
          console.warn('[@nuxtjs/web-vitals] Please define a provider to activate this module.')
          return
        }
      }
    } else {
      provider = resolveProvider(options.provider, (options as any)[options.provider])
    }

    provider.runtime = resolver.resolve(provider.runtime)
    nuxt.options.build.transpile.push(dirname(provider.runtime))
    nuxt.options.alias['~web-vitals-provider'] = provider.runtime
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    const runtimeOptions = { debug: options.debug, ...provider.options }
    addTemplate({ filename: 'web-vitals-config.mjs', getContents: () => `export default ${JSON.stringify(runtimeOptions, null, 2)}` })

    if (isNuxt2()) {
      nuxt.options.alias['#build/web-vitals-config.mjs'] = join(nuxt.options.buildDir, 'web-vitals-config.mjs')
      nuxt.options.alias.ufo = await resolver.resolvePath('ufo/dist/index.mjs')
      addPlugin(resolver.resolve('./runtime/plugin.nuxt2.client.mjs'))
    } else {
      addPlugin(resolver.resolve('./runtime/plugin.client'))
    }
  }
})
