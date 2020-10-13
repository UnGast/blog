<template>
  <section class="about-page running-text text-column-page">
    <h1>{{ $t('aboutPage.title') }}</h1>
    <p>This website is provided by:</p>
    <legal-contact-info/>
 </section>
</template>

<script>
import LegalContactInfo from '@/components/LegalContactInfo'

export default {
  components: { LegalContactInfo },
  nuxtI18n: {
    paths: {
      en: '/about'
    }
  },
  head() {
    return {
      meta: [{
        name: 'robots', content: 'noindex'
      }]
    }
  }
}
</script>