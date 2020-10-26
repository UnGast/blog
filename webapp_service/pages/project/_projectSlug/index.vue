<template>
  <section class="project-page center-column-page wide">
    <template v-if="!$apollo.loading && project">
      <div class="page-top">
        <h1 class="page-title">{{ project.title }}</h1>

        <div class="tags">
          <span class="tag" v-for="tag in project.tags" :key="tag.slug">{{ tag.name }}</span>
        </div>
      </div>

      <markdown-text class="description full-width-elements" :markdown="project.fullDescription"/>

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
  }, {
    name: 'tags',
    fields: [ 'name', 'slug' ]
  }
]

export default {
  components: { MarkdownText, ProjectBitPreview },
  async asyncData(context) {
    let client = context.app.apolloProvider.defaultClient

    let { data } = await client.query({
      query: gql`query project($slug: String!) {
        project(slug: $slug) {
          ${generateQueryFieldsString(requiredProjectFields)}
        }
      }`,
      variables: {
        slug: context.params.projectSlug
      }
    })

    return {
      project: data.project
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 16px;
}

.description {
  margin-bottom: 128px;
}

.bits-heading {
  margin-bottom: 48px;
  text-transform: uppercase;
  font-size: 1.4rem;
  opacity: .7;
}

.project-bit-preview {
  margin-bottom: 48px;
}
</style>