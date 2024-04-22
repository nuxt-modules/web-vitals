# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.7](https://github.com/nuxt-modules/web-vitals/compare/v0.2.6...v0.2.7) (2024-04-22)


### Features

* track INP vitals ([#73](https://github.com/nuxt-modules/web-vitals/issues/73)) ([99ac126](https://github.com/nuxt-modules/web-vitals/commit/99ac1267cc876eaa0300ebc70afc1dfa36764fd7))


### Bug Fixes

* use non-deprecated `werb-vitals` functions ([eb37fd6](https://github.com/nuxt-modules/web-vitals/commit/eb37fd60c5e668ba5137294da0c49bf2b29dd3bd))

### [0.2.6](https://github.com/nuxt-modules/web-vitals/compare/v0.2.5...v0.2.6) (2023-05-17)


### Features

* add `gtm` provider ([#67](https://github.com/nuxt-modules/web-vitals/issues/67)) ([757bc1f](https://github.com/nuxt-modules/web-vitals/commit/757bc1f810c38b3b18c38f76ba17b4b890ab31ff))


### Bug Fixes

* don't default to `gtm` provider ([9af31c8](https://github.com/nuxt-modules/web-vitals/commit/9af31c81ad741ef185191e6182db235316085b7b))
* only run `sendVitals` once on initial load ([#66](https://github.com/nuxt-modules/web-vitals/issues/66)) ([d0e408d](https://github.com/nuxt-modules/web-vitals/commit/d0e408db294fb032f93c60cb135c24534688cec7))

### [0.2.5](https://github.com/nuxt-modules/web-vitals/compare/v0.2.4...v0.2.5) (2023-04-29)

### [0.2.4](https://github.com/nuxt-modules/web-vitals/compare/v0.2.3...v0.2.4) (2023-03-16)

### [0.2.3](https://github.com/nuxt-modules/web-vitals/compare/v0.2.2...v0.2.3) (2023-03-16)


### Bug Fixes

* pin kit dependency ([#64](https://github.com/nuxt-modules/web-vitals/issues/64)) ([2ad2a97](https://github.com/nuxt-modules/web-vitals/commit/2ad2a97b4b111949d16e59fa2e0a14db79a39087))

### [0.2.2](https://github.com/nuxt-modules/web-vitals/compare/v0.2.1...v0.2.2) (2022-11-29)


### Features

* custom metrics api ([#37](https://github.com/nuxt-modules/web-vitals/issues/37)) ([251a8c6](https://github.com/nuxt-modules/web-vitals/commit/251a8c630bff10489789818da4eea81edca2cd1a))


### Bug Fixes

* handle when localstorage is unavailable ([#58](https://github.com/nuxt-modules/web-vitals/issues/58)) ([0d0c423](https://github.com/nuxt-modules/web-vitals/commit/0d0c42319b04055a9546a4e807eef83c9e784fd4)), closes [#56](https://github.com/nuxt-modules/web-vitals/issues/56)

### [0.2.1](https://github.com/nuxt-modules/web-vitals/compare/v0.2.0...v0.2.1) (2022-11-29)


### Bug Fixes

* resolve `ufo` for nuxt 2 support ([192b409](https://github.com/nuxt-modules/web-vitals/commit/192b409870f0afdb093e0889320e43fb78102f84))

## [0.2.0](https://github.com/nuxt-modules/web-vitals/compare/v0.1.10...v0.2.0) (2022-11-28)


### ⚠ BREAKING CHANGES

* nuxt 3 compatibility (#59)

### Features

* nuxt 3 compatibility ([#59](https://github.com/nuxt-modules/web-vitals/issues/59)) ([b400160](https://github.com/nuxt-modules/web-vitals/commit/b4001603dd9d4e8b482edb56aeda41f10a2f4f1a))


### Bug Fixes

* nuxt 2 plugin syntax usage ([f241654](https://github.com/nuxt-modules/web-vitals/commit/f2416543f7bb8d2332671190c7d297ef30cffa11))

### [0.1.10](https://github.com/nuxt-modules/web-vitals/compare/v0.1.9...v0.1.10) (2022-07-26)


### Bug Fixes

* resolve `ufo` path absolutely ([#51](https://github.com/nuxt-modules/web-vitals/issues/51)) ([31e54ef](https://github.com/nuxt-modules/web-vitals/commit/31e54ef803ed3b76c9559f9f11233f1afa29e6e5))

### [0.1.9](https://github.com/nuxt-modules/web-vitals/compare/v0.1.8...v0.1.9) (2022-07-26)


### Bug Fixes

* handle nuxt 3 and vue-router 4x api ([#49](https://github.com/nuxt-modules/web-vitals/issues/49)) ([a1ac506](https://github.com/nuxt-modules/web-vitals/commit/a1ac506c050c857ef3820845abd567dc76834d86))

### [0.1.8](https://github.com/nuxt-modules/web-vitals/compare/v0.1.7...v0.1.8) (2021-08-24)


### Bug Fixes

* switch to .js context for resolving relative imports ([#32](https://github.com/nuxt-modules/web-vitals/issues/32)) ([158d63f](https://github.com/nuxt-modules/web-vitals/commit/158d63f29f97db14cc0076dcff256d127a2db5ea))

### [0.1.7](https://github.com/nuxt-modules/web-vitals/compare/v0.1.6...v0.1.7) (2021-08-12)


### Bug Fixes

* de-default web-vitals import ([ac169af](https://github.com/nuxt-modules/web-vitals/commit/ac169afaa248bf419b7fc30894e1f93c8f4e9910))

### [0.1.6](https://github.com/nuxt-modules/web-vitals/compare/v0.1.5...v0.1.6) (2021-08-12)


### Bug Fixes

* add esm workaround for nuxt < 2.16 ([42840cc](https://github.com/nuxt-modules/web-vitals/commit/42840ccddbe9ff449c95ca8a9d8297f8a68b6b71))
* use .mjs for vitals.client ([e52e73c](https://github.com/nuxt-modules/web-vitals/commit/e52e73c8f23face06439652c5a38d5168b53ab0c))

### [0.1.5](https://github.com/nuxt-modules/web-vitals/compare/v0.1.4...v0.1.5) (2021-08-12)


### Bug Fixes

* correct url encoding for ga provider ([#26](https://github.com/nuxt-modules/web-vitals/issues/26)) ([945b1cf](https://github.com/nuxt-modules/web-vitals/commit/945b1cf33076f666259855958e75fde0d1721b5a))
* **ga:** use `ufo` to encode params (resolves [#25](https://github.com/nuxt-modules/web-vitals/issues/25)) ([2b5d489](https://github.com/nuxt-modules/web-vitals/commit/2b5d489b159389813d351099910c84b320510845))

### [0.1.4](https://github.com/nuxt-modules/web-vitals/compare/v0.1.3...v0.1.4) (2021-02-25)


### Bug Fixes

* **utils:** remove send debug log (resolves [#18](https://github.com/nuxt-modules/web-vitals/issues/18)) ([d2eabad](https://github.com/nuxt-modules/web-vitals/commit/d2eabadb33690e1f4472ae37c4351a7747d66b69))

### [0.1.3](https://github.com/nuxt-modules/web-vitals/compare/v0.1.2...v0.1.3) (2021-02-04)


### Bug Fixes

* **vercel:** dsn typo ([95c4d42](https://github.com/nuxt-modules/web-vitals/commit/95c4d42082f7d31e17a7bf0edb4a88789fd611c7))

### [0.1.2](https://github.com/nuxt-modules/web-vitals/compare/v0.1.1...v0.1.2) (2021-02-04)


### Features

* auto switch to log in dev if debug enabled and no provider set ([f38ea59](https://github.com/nuxt-modules/web-vitals/commit/f38ea596a70223d1859383fac175dca11288e31a))

### [0.1.1](https://github.com/nuxt-modules/web-vitals/compare/v0.1.0...v0.1.1) (2021-02-04)


### Bug Fixes

* early return if no provider is set ([08c25e8](https://github.com/nuxt-modules/web-vitals/commit/08c25e809239564df9213986cb709256f445739c))
