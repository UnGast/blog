<template>
  <section class="projects-page center-column-page wide">
    <div class="page-top">
      <h1 class="page-title">Projects</h1>
    </div>

    <projects-overview/>
  </section>
</template>

<script>
import ProjectsOverview from '@/components/projects/ProjectsOverview'

export default {
  components: { ProjectsOverview }
}
</script>

<style lang="scss" scoped>
@import 'style';

.projects-page {

  .projects-overview {
    padding-left: 20px;
  }
}
</style>