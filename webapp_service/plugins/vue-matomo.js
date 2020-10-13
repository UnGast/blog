import Vue from 'vue'
import VueMatomo from 'vue-matomo'

export default ({ app }) => {
  Vue.use(VueMatomo, {
    router: app.router,
    host: process.env.MATOMO_URL,
    siteId: process.env.MATOMO_SITE_ID,
    requireConsent: true
  })
}