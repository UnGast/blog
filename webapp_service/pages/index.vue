<template>
  <div class="index-page text-column-page">
    <div class="page-top with-substantial-content">

      <h1 class="page-title">{{ $t('landingPage.title') }}</h1>
      <p class="page-intro">{{ $t('landingPage.intro') }}</p>
    </div>
    <feed/>
    <newsletter-form/>
  </div>
</template>

<script>
import NewsletterForm from '@/components/NewsletterForm'
import Feed from '@/components/Feed'
import { generatePageHead } from '@/lib/page-head'

export default {
  head() {
    const url = process.env.BASE_URL + this.$route.fullPath

    return generatePageHead({
      title: this.$t('landingPage.meta.title'),
      description: this.$t('landingPage.meta.description'),
      url,
      imageUrl: process.env.BASE_URL + require('~/assets/logo/symbol.svg')
    })
    /*return {
      title: this.$t('landingPage.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('landingPage.title') },
        { hid: 'description', name: 'description', content: this.$t('landingPage.description') },
        
        { hid: 'og:title', property: 'og:title', content: this.$t('landingPage.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('landingPage.description') },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: ) },
        { hid: 'og:url', property: 'og:url', content: url },

        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:title', property: 'twitter:title', content: this.$t('landingPage.title') },
        { hid: 'twitter:description', property: 'twitter:description', content: this.$t('landingPage.description') },
        { hid: 'twitter:image', property: 'twitter:image', content: process.env.BASE_URL + require('~/assets/logo/symbol.svg') },
        { hid: 'twitter:url', property: 'twitter:url', content: url },
      ]
    }*/
  },
  components: { Feed, NewsletterForm }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.index-page {
  display: flex;
  flex-direction: column;
}

.feed {
  margin-bottom: 48px;
}

</style>