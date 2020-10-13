<template>
  <section class="portfolio-page center-column-page">
    <div class="page-top with-substantial-content">
      <h1 class="page-title">{{ $t('portfolioPage.title') }}</h1>
      <p class="page-intro">{{ $t('portfolioPage.intro') }}</p>
    </div>

    <div class="entry">
      <nuxt-link class="name increased-pointer-target" :to="localePath({ name: 'tool-milling-parameters-calculator' })">milling parameters calculator</nuxt-link>
      <p class="description descriptive-text">Calculate cutting speed, spindle speed and feed rate for CNC milling operations.</p>
    </div>
  </section>
</template>

<script>
import { generatePageHead } from '@/lib/page-head'

export default {
  asyncData() {
    
  },
  head() {
    const url = process.env.BASE_URL + this.$route.fullPath
    
    return generatePageHead({
      title: this.$t('portfolioPage.meta.title'),
      description: this.$t('portfolioPage.meta.description'),
      url
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.entry {
  display: flex;
  flex-direction: column;

  .name {
    text-decoration: none;
    font-size: 1rem;
    color: $primary-color;
    font-weight: bold;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
}
</style>