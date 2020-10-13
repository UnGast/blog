<template>
  <section class="milling-parameters-calculator-page center-column-page">
    <div class="page-top with-substantial-content">
      <h1 class="page-title">{{ $t('millingParametersCalculatorPage.title') }}</h1>
      <p class="page-intro">{{ $t('millingParametersCalculatorPage.description') }}</p>
    </div>

    <milling-parameters-calculator/>

    <section class="embedding-code-section">
      <h2 class="page-section-title">{{ $t('millingParametersCalculatorPage.embedTitle') }}</h2>
      <p class="descriptive-text">{{ $t('millingParametersCalculatorPage.embedDescription') }}</p>
      <code-block :code="embeddingCode"/>
    </section>
  </section>
</template>

<script>
import MillingParametersCalculator from '@/components/tools/MillingParametersCalculator'
import embeddingTemplate from '!raw-loader!~/assets/embedding-templates/milling-parameters-calculator.min.html'
import CodeBlock from '@/components/CodeBlock'

export default {
  nuxtI18n: {
    paths: {
      en: '/tool/milling-parameters-calculator',
      de: '/tool/schnittdaten-rechner'
    }
  },
  // TODO: add page meta!
  components: { MillingParametersCalculator, CodeBlock },
  computed: {
    embeddingCode() {
      const url = process.env.BASE_URL + this.localePath({ name: 'tool-milling-parameters-calculator-embedded' })
      return embeddingTemplate.replace(/{{url}}/g, url)
    }
  }
}
</script>

<style lang="scss" scoped>
.milling-parameters-calculator {
  margin-bottom: 96px;
}

.embedding-code-section {
  .page-section-title {
    margin-bottom: 16px;
  }

  .descriptive-text {
    margin-bottom: 32px;
  }
}
</style>