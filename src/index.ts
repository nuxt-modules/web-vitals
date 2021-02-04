import { resolve, dirname } from 'path'
import defu from 'defu'
import { PROVIDERS } from './providers'

function webVitalsModule () {
  const { nuxt } = this

  const options = defu(nuxt.options.webVitals, {
    provider: '',
    debug: false,
    disabled: false
  })

  if (options.disabled) {
    return
  }

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

  if (options.provider) {
    provider = resolveProvider(options.provider, options[options.provider])
  } else {
    // Auto detect provider
    for (const _provider of PROVIDERS) {
      if (_provider.autoDetect === false) {
        continue
      }
      try {
        provider = resolveProvider(_provider.name, options[_provider.name])
        // eslint-disable-next-line no-console
        console.info('[@nuxtjs/web-vitals] Auto detected provider:', provider.name)
        break
      } catch (err) {
        // Ignore error on auto detection
      }
    }
  }

  if (!provider) {
    if (nuxt.options.dev && options.debug) {
      provider = resolveProvider('log')
    } else {
      // eslint-disable-next-line no-console
      console.warn('[@nuxtjs/web-vitals] Please define a provider to activate this module')
      return
    }
  }

  const runtimeDir = resolve(__dirname, 'runtime')
  nuxt.options.build.transpile.push(runtimeDir)
  nuxt.options.alias['~vitals'] = runtimeDir

  nuxt.options.build.transpile.push(dirname(provider.runtime))
  nuxt.options.alias['~vitals-provider'] = provider.runtime

  this.addPlugin({
    src: resolve(__dirname, './runtime/vitals.client.js'),
    fileName: 'vitals.client.js',
    options: {
      debug: options.debug,
      ...provider.options
    }
  })
}

webVitalsModule.meta = require('../package.json')

export default webVitalsModule
