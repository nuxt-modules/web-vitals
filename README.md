# nuxt-vitals

> Web Vitals: Essential module for a healthy [Nuxt.js](https://github.com/nuxt/nuxt.js)

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

### Setup

- Add `nuxt-vitals` as dependency to your project
- Add `nuxt-vitals` to modules section of `nuxt.config.js`

```javascript
export default {
  modules: [
    [ 'nuxt-vitals', { 
      // Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.
      trackingID: 'UA-XXXXXXXX-X' 
      // Debug { number } default 0 
      debug: 1
    }]
  ]
}
```

### Google Analitycs Event Measurement

Behavior > Events > Overview > Event Category > Event Action

![Events Actions](/assets/event-action.png)

### License

[MIT](https://opensource.org/licenses/MIT)
