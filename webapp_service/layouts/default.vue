<template>
  <div class="layout">
    <div v-html="iconSvg"/>
    <div class="top">
      <site-header/>
      <nuxt class="page"/>
    </div>
    <site-footer/>
    <div class="newsletter-popup-overlay" v-show="false">
      <newsletter-form/>
    </div>
    <client-only>
      <cookie-banner v-if="showCookieBanner"/>
    </client-only>
  </div>
</template>

<script>
import iconSvg from '!raw-loader!~/assets/icons/symbol-defs.svg'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import NewsletterForm from '@/components/NewsletterForm'
import CookieBanner from '@/components/CookieBanner'

export default {
  components: { SiteHeader, SiteFooter, NewsletterForm, CookieBanner },
  computed: {
    iconSvg() {
      return iconSvg
    },
    showCookieBanner() {
      return !this.$store.state.cookieDecisionMade
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.layout {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.top {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
 // margin-bottom: 32px;
}

.page {
  flex-grow: 1;
  padding: $screen-spacing-normal;
  padding-bottom: 64px;
  box-sizing: border-box;
}

.newsletter-popup-overlay {
  position: fixed;
  background: rgba(0, 0, 10, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.newsletter-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 3px rgba(0,0,0,.1);
}

.cookie-banner {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}

@media screen and (max-width: $breakpoint-small) {
  .page {
    padding: $screen-spacing-small;
    padding-bottom: 32px;
  }
}
</style>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
