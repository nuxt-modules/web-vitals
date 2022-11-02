# Nuxt Web Vitals

> Web Vitals: Essential module for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

[Web Vitals](https://web.dev/vitals) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.  
This module will gather those metrics on each page view, and send them to a provider using either [`Navigator.sendBeacon()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) or [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Installation

```bash
# yarn
yarn add --dev @nuxtjs/web-vitals

# npm
npm install --save-dev @nuxtjs/web-vitals
```

Add `@nuxtjs/web-vitals` to the `buildModules` section of your `nuxt.config.js`

```javascript
export default {
  buildModules: [
    '@nuxtjs/web-vitals'
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--save-dev` or `--dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

## Options

```js
{
  webVitals: {
    // provider: '', // auto detectd
    debug: false,
    disabled: false
  }
}
```

## Providers

### Google Analytics

_Report WebVitals to GA_

Create a GA property and get `trackingID`

Either provide `GOOGLE_ANALYTICS_ID` environement variable or set inside `nuxt.config`:

```js
export default {
  googleAnalytics: {
    id: 'UA-XXXXXXXX-X'
  }
}
```

Behavior > Events > Overview > Event Category > Event Action

![Events Actions](/assets/event-action.png)


### Vercel Analytics

_Report WebVitals to Vercel_

Works without configuration

### Basic logger

_Report WebVitals to Console_

Output metrics to the console insead of sending them to a remote provider 

```js
{
  webVitals: {
    provider: 'log',
    debug: true, // debug enable metrics reporting on dev environments
    disabled: false
  }
}
```

:warning: this provider does not send WebVitals trough network, issues with navigator extensions can not be deteced with this method.

### License

[MIT](https://opensource.org/licenses/MIT)
