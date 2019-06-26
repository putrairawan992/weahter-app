const NextI18Next = require('next-i18next/dist/commonjs')

module.exports = new NextI18Next({
  detection: {
    lookupCookie: "next-i18next",
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie']
  },
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: ['id'],
  react: {
    wait: true
  }
})