<template>
  <section class="project-bit-page center-column-page">
    <div class="page-top">
      <h1 class="page-title">{{ bit.project.title }}</h1>

      <p class="page-intro">{{ $t('projectBitPage.entryFrom') }} {{ $formatDate(bit.timestamp) }}</p>
    </div>
    
    <markdown-text :markdown="bit.text"/>

    <section class="date-related-bits">
      <section class="next-bit-area" v-if="bit.next">
        <h2 class="date-related-heading">{{ $t('projectBitPage.nextBitHeading') }}</h2>
        <project-bit-preview :bit="bit.next"/>
      </section>
      <section class="previous-bit-area" v-if="bit.previous">
        <h2 class="date-related-heading">{{ $t('projectBitPage.previousBitHeading') }}</h2>
        <project-bit-preview :bit="bit.previous"/>
      </section>
    </section>

    <nuxt-link class="link-action back-to-project-page-action" :to="projectPageLocation">{{ $t('projectBitPage.backToProjectPageAction') }}</nuxt-link>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import MarkdownText from '@/components/MarkdownText'
import { default as ProjectBitPreview, requiredProjectBitFields as requiredProjectBitPreviewFields } from '@/components/projects/ProjectBitPreview'
import { generateQueryFieldsString } from '@/lib/utils'

let requiredProjectBitFields = [
  'timestamp', 'text', { name: 'project', fields: ['title', 'slug'] },
  { name: 'next', fields: requiredProjectBitPreviewFields },
  { name: 'previous', fields: requiredProjectBitPreviewFields }
]

export default {
  components: { MarkdownText, ProjectBitPreview },
  async asyncData(context) {
    let client = context.app.apolloProvider.defaultClient

    let { data } = await client.query({
      query: gql`query projectBit($projectSlug: String!, $bitTimestamp: String!) {
        projectBit(projectSlug: $projectSlug, bitTimestamp: $bitTimestamp) {
          ${generateQueryFieldsString(requiredProjectBitFields)}
        }
      }`,
      variables: {
        projectSlug: context.params.projectSlug,
        bitTimestamp: context.params.bitTimestamp
      }
    })
    
    return {
      bit: data.projectBit
    }
  },
  computed: {
    projectPageLocation() {
      return this.localePath({
        name: 'project-projectSlug',
        params: {
          projectSlug: this.bit.project.slug
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.running-text {
  margin-bottom: 128px;
}

.date-related-heading {
  margin-bottom: 16px;
  opacity: .8;
  text-transform: uppercase;
}

.next-bit-area + .previous-bit-area {
  margin-top: 48px;
}

.back-to-project-page-action {
  margin-top: 48px;
}
</style>