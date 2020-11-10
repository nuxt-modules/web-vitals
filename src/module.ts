import { resolve, dirname} from 'path'
import defu from 'defu'
import { PROVIDERS } from './providers'

function vitalsModule() {
  const { nuxt } = this

  const options = defu(this.options.vitals, {
    provider: '',
    debug: false,
    disabled: false
  })

  if (options.disabled) {
    return
  }

  const resolveProvider = (providerName, userOptions = {}) => {
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
        console.info('[@nuxtjs/vitals] Auto detected provider:', provider.name)
        break
      } catch (err) {
        // Ignore error on auto detection
      }
    }
  }

  if (!provider) {
     console.warn('[@nuxtjs/vitals] Please define a provider to activate this module')
    return
  }

  const runtimeDir = resolve(__dirname, 'runtime')
  nuxt.options.build.transpile.push(runtimeDir)
  nuxt.options.alias['~nuxtVitals'] = runtimeDir

  nuxt.options.build.transpile.push(dirname(provider.runtime))
  nuxt.options.alias['~nuxtVitalsProvider'] = provider.runtime

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'vitals.client.js',
    options: {
      debug: options.debug,
      ...provider.options
    }
  })
}


vitalsModule.meta = require('../package.json')

export default vitalsModule
