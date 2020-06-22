import { resolve } from 'path'

export default function (moduleOptions) {
  const options = { ...moduleOptions }

  if (!options.eventCategory) {
    options.eventCategory = 'Web Vitals'
  }
  if (!options.debug) {
    options.debug = 0
  }
  
  // Don't add plugin if disabled
  if (this.options.disabled) {
    return;
  }  

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-vitals.js',
    options,
    ssr: false
  })
}

module.exports.meta = require('./package.json')
