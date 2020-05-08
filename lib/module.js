const { resolve } = require('path')

export default function (moduleOptions) {
  let options = this.options['vitals.js'] || moduleOptions

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'vitals.js',
    options,
    ssr: false
  })

module.exports.meta = require('./package.json')
