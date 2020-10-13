<template>
  <section class="project-page">
    <section class="page-top">
      <h1 class="page-title">{{ project.title }}</h1>
    </section>

    <project-bits-overview :project="project"/>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import ProjectBitsOverview from '@/components/projects/ProjectBitsOverview'

export default {
  components: { ProjectBitsOverview },
  apollo: {
    project: {
      query: gql`query project($slug: String!) {
        project(slug: $slug) {
          title, slug, description, bits { timestamp, text }
        }
      }`,
      variables() {
        console.log('VARIALBES', this.$route.params.slug)
        return {
          slug: this.$route.params.slug
        }
      },
      update(data) {
        console.log('RECEIVED DATA', data)
        return data.project
      }
    }
  }
}
</script>