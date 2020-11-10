# nuxt-vitals

> Web Vitals: Essential module for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

[Web Vitals](https://web.dev/vitals) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

## Installation

```bash
# yarn
yarn add --dev @nuxtjs/vitals

# npm
npm install --save-dev @nuxtjs/vitals
```

Add `@nuxtjs/vitals` to the `buildModules` section of your `nuxt.config.js`

```javascript
export default {
  buildModules: [
    '@nuxtjs/vitals'
  }
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--save-dev` or `--dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

## With Google Analytics

Create a GA property and get `trackingID`

In nuxt.config:

```js
export default {
  googleAnalytics: { 
    id: 'UA-XXXXXXXX-X'
  }
}
```

## With Vercel

Comming soon...

### Providers

#### Google Analitycs Event Measurement

Behavior > Events > Overview > Event Category > Event Action

![Events Actions](/assets/event-action.png)

#### Vercel Analytics


### License

[MIT](https://opensource.org/licenses/MIT)
