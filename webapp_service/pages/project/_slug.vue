<template>
  <section class="project-page center-column-page wide">
    <template v-if="!$apollo.loading && project">
      <section class="page-top">
        <h1 class="page-title">{{ project.title }}</h1>
      </section>

      <project-detail :project="project"/>
    </template>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import MarkdownText from '@/components/MarkdownText'
import { default as ProjectDetail, requiredProjectFields } from '@/components/projects/ProjectDetail'
import { generateQueryFieldsString } from '@/lib/utils'

export default {
  components: { MarkdownText, ProjectDetail },
  apollo: {
    project: {
      query: gql`query project($slug: String!) {
        project(slug: $slug) {
          ${generateQueryFieldsString(requiredProjectFields)}
        }
      }`,
      variables() {
        return {
          slug: this.$route.params.slug
        }
      },
      prefetch: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';


</style>