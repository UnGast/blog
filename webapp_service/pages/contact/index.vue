<template>
  <section class="contact-page center-column-page">
    <div class="page-top with-substantial-content">
      <h1 class="page-title">{{ $t('contactPage.title') }}</h1>
      <p class="page-intro">{{ $t('contactPage.intro') }}</p>
    </div>
    <div class="running-text">
      <p>{{ $config.CONTACT_NAME }}</p>
      <br>
      <p>email: <a :href="'mailto:' + $config.CONTACT_EMAIL_ADDRESS">{{ $config.CONTACT_EMAIL_ADDRESS }}</a></p>
      <br>
      <p>{{ $t('contactPage.privacyPolicyNotice.pre') }}<nuxt-link :to="localePath({ name: 'privacy-policy' })">{{ $t('contactPage.privacyPolicyNotice.link') }}</nuxt-link>{{ $t('contactPage.privacyPolicyNotice.end') }}</p>
    </div>
  </section>
</template>

<script>
import { generatePageHead } from '@/lib/page-head'

export default {
  head() {
    /*const url = process.env.BASE_URL + this.$route.fullPath
    
    return generatePageHead({
      title: this.$t('contactPage.meta.title'),
      description: this.$t('contactPage.meta.description'),
      url
    })*/
    return {
      meta: [{
        name: 'robots', content: 'noindex'
      }]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contact'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
