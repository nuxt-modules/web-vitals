# nuxt-vitals

> Web Vitals: Essential module for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

### Installation

```bash
npm install --save-dev nuxt-vitals # or yarn add --dev nuxt-vitals
```

### Setup

Add `nuxt-vitals` to buildModules section of `nuxt.config.js`

```javascript
export default {
  buildModules: [
    ['nuxt-vitals', { 
      // Tracking ID (required) { string }
      // Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.
      trackingID: 'UA-XXXXXXXX-X',
      // Event Category (optional) { string }, default 'Web Vitals'
      eventCategory: 'Some Category',
      // Multiplier For CLS (optional) { number } default 1000
      // Increase the multiplier for greater precision if needed.
      multiplierForCLS: 10000,
      // Debug (optional) { number } default 0 
      debug: 1,
      disabled: false
    }]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--save-dev` or `--dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Google Analitycs Event Measurement

Behavior > Events > Overview > Event Category > Event Action

![Events Actions](/assets/event-action.png)

### License

[MIT](https://opensource.org/licenses/MIT)
