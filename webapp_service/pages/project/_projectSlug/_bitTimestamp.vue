<template>
  <section class="project-bit-page center-column-page wide">
    <div class="page-top">
      <h1 class="page-title">{{ bit.project.title }}</h1>

      <p class="page-intro">{{ $t('projectBitPage.entryFrom') }} {{ $formatDate(bit.timestamp) }}</p>
    </div>
    
    <markdown-text :markdown="bit.text"/>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import MarkdownText from '@/components/MarkdownText'
import { generateQueryFieldsString } from '@/lib/utils'

let requiredProjectBitFields = [
  'timestamp', 'text', { name: 'project', fields: ['title'] }
]

export default {
  components: { MarkdownText },
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
  }
}
</script>