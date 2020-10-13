<template>
  <div class="projects-overview">
    <project-preview v-for="project in projects" :key="project.slug" :project="project"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProjectPreview from './ProjectPreview'

export default {
  components: { ProjectPreview },
  apollo: {
    projects: gql`query {
      projects {
        title, slug, url, description, previewImages { url }
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

.projects-overview {
  display: flex;
  flex-wrap: wrap;

  .project-preview {
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>