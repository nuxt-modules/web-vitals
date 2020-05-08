# nuxt-vitals

> Web Vitals: Essential metrics for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.

### Setup

- Add `nuxt-vitals` as dependency to your project
- Add `nuxt-vitals` to modules section of `nuxt.config.js`

```javascript
export default {
  modules: [
    [ 'nuxt-vitals', { trackingID: 'UA-XXXXXXXX-X' }]
  ]
}
```

### License

[MIT](https://opensource.org/licenses/MIT)
