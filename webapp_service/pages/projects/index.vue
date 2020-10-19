<template>
  <section class="projects-page center-column-page wide">
    <div class="page-top">
      <h1 class="page-title">Projects</h1>
    </div>

    <project-preview v-for="project in projects" :key="project.slug" :project="project"/>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { default as ProjectPreview, requiredProjectFields } from '@/components/projects/ProjectPreview'
import { generateQueryFieldsString } from '@/lib/utils'

export default {
  components: { ProjectPreview },
  apollo: {
    projects: gql`query {
      projects {
        ${generateQueryFieldsString(requiredProjectFields)}
      }
    }`
  },
  data: () => ({
    projects: []
  })
}
</script>

<style lang="scss" scoped>
@import 'style';

.projects-page {

  .project-preview {
    margin-bottom: 64px;
  }
}
</style>