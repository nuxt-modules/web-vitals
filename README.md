# nuxt-vitals

> Web Vitals: Essential metrics for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

### Setup

- Add `nuxt-vitals` as dependency to your project
- Add `nuxt-vitals` to modules section of `nuxt.config.js`

```javascript
export default {
  modules: [
    // Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.
    [ 'nuxt-vitals', { trackingID: 'UA-XXXXXXXX-X' }]
  ]
}
```

### License

[MIT](https://opensource.org/licenses/MIT)
