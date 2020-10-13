<template>
  <section class="embedded-milling-parameters-calculator">
    <h1 class="embedded-title">{{ $t('millingParametersCalculatorPage.title') }}</h1>
    
    <milling-parameters-calculator/>

    <p class="source">{{ $t('providedBy') }}: <nuxt-link target="_blank" :to="localePath({ name: 'tool-milling-parameters-calculator' })">engineeringbydoing.com</nuxt-link>.</p>
  </section>
</template>

<script>
import MillingParametersCalculator from '@/components/tools/MillingParametersCalculator'

export default {
  layout: 'embedded',
  nuxtI18n: {
    paths: {
      en: '/tool/milling-parameters-calculator/embedded',
      de: '/tool/schnittdaten-rechner/embedded'
    }
  },
  computed: {
    sourceLink() {
      return process.env.BASE_URL
    }
  },
  components: { MillingParametersCalculator }
}
</script>

<style lang="scss" scoped>
.embedded-milling-parameters-calculator {
  display: inline-flex;
  flex-direction: column;
}

.embedded-title {
  font-size: 1rem;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.source {
  font-size: .7rem;
  margin-top: 8px;
}
</style>