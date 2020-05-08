import { resolve } from 'path'

export default function (moduleOptions) {
  const options = { ...moduleOptions}

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'plugin.js',
    options,
    ssr: false
  })
}

module.exports.meta = require('./package.json')
