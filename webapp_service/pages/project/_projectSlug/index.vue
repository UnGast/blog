<template>
  <section class="project-page center-column-page wide">
    <template v-if="!$apollo.loading && project">
      <div class="page-top">
        <h1 class="page-title">{{ project.title }}</h1>
      </div>

      <markdown-text class="description" :markdown="project.fullDescription"/>

      <div class="bits">
        <h2 class="bits-heading">{{ $t('projectDetailPage.bitsHeading') }}</h2>
        <project-bit-preview v-for="bit in project.bits" :key="bit.timestamp" :bit="bit"/>
      </div>
    </template>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { generateQueryFieldsString } from '@/lib/utils'
import MarkdownText from '@/components/MarkdownText'
import { default as ProjectBitPreview, requiredProjectBitFields } from '@/components/projects/ProjectBitPreview'

let requiredProjectFields = [
  'title', 'slug', 'fullDescription', {
    name: 'bits', fields: requiredProjectBitFields
  }
]

export default {
  components: { MarkdownText, ProjectBitPreview },
  apollo: {
    project: {
      query: gql`query project($slug: String!) {
        project(slug: $slug) {
          ${generateQueryFieldsString(requiredProjectFields)}
        }
      }`,
      variables() {
        return {
          slug: this.$route.params.projectSlug
        }
      },
      prefetch: false
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  margin-bottom: 48px;
}

.bits-heading {
  margin-bottom: 24px;
}

.project-bit-preview {
  margin-bottom: 48px;
}
</style>