<template>
  <nuxt-link class="project-preview" :to="localePath({ name: 'project-slug', params: { slug: project.slug } })">
    <img class="preview-image" :src="project.previewImages[0].url"/>

    <div class="info">
      <span class="title">{{ project.title }}</span>

      <markdown-text :markdown="project.description"/>
    </div>

    <section class="recent-bits">
      <project-bit-preview v-for="bit in project.bits" :bit="bit" :key="bit.timestamp"/>
    </section>

    <button class="explore-action">explore</button>
  </nuxt-link>
</template>

<script>
import MarkdownText from '@/components/MarkdownText'
import ProjectBitPreview from './ProjectBitPreview'

export default {
  components: { MarkdownText, ProjectBitPreview },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';

.project-preview {
  display: flex;
  flex-direction: column;
  max-width: 350px;
  //background: linear-gradient(to bottom right, $accent-color 0%, lighten($primary-color, 10%) 50%);
  //border: 5px solid $primary-color;
  overflow: hidden;
  background: white;
}

.info {
  padding: 32px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-transform: uppercase;
  color: $primary-color;
}

.preview-image {
  width: calc(100%);
  height: auto;
}

.explore-action {
  background: lighten($primary-color, 0%);
  border: 0;
  border-top: 5px solid $primary-color;
  border-radius: 0;
  padding: 16px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.project-preview:hover {
  
  .explore-action {

    background: $primary-color;
  }
}
</style>