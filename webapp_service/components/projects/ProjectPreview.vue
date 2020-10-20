<template>
  <section class="project-preview">
    <div class="info">
      <nuxt-link :to="projectPageLocation" class="title">{{ project.title }}</nuxt-link>

      <markdown-text class="description" :markdown="project.shortDescription"/>

      <!--<div class="meta">
        <div class="start-date"><label class="label">started:</label><span class="value">{{ startDate }}</span></div>
      </div>-->
    </div>

    <section class="latest-bit-area">
      <label class="label">latest post</label>

      <project-bit-preview :bit="project.bits[0]"/>
    </section>

    <span class="bit-count">{{ project.bits.length - 1 }} more posts</span>

    <nuxt-link :to="projectPageLocation" class="goto-project-page-action link-action">go to project page</nuxt-link>
  </section>
</template>

<script>
import MarkdownText from '@/components/MarkdownText'
import { default as ProjectBitPreview, requiredProjectBitFields } from './ProjectBitPreview'

export default {
  components: { MarkdownText, ProjectBitPreview },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    startDate() {
      return this.$formatDate(new Date(Number(this.project.startTimestamp)))
    },
    projectPageLocation() {
      return this.localePath({ name: 'project-projectSlug', params: { projectSlug: this.project.slug } })
    }
  }
}

export let requiredProjectFields = [
  'title', 'slug', 'url', 'shortDescription', 'startTimestamp', {
    name: 'previewImages',
    fields: ['url']
  }, {
    name: 'bits',
    fields: requiredProjectBitFields
  }
]
</script>

<style lang="scss" scoped>
@import 'style';

.project-preview {
  display: flex;
  flex-direction: column;
  //background: linear-gradient(to bottom right, $accent-color 0%, lighten($primary-color, 10%) 50%);
  //border: 5px solid $primary-color;
  background: white;
  text-decoration: none;
}

.info {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.description {
}

.meta {
  opacity: .5;

  .label {
    font-size: 1rem;
    margin-right: 8px;
  }

  .value {
    font-size: 1rem;
  }
}

.preview-image {
  width: calc(100%);
  height: auto;
}

.latest-bit-area {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  .label {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    opacity: .5;
    margin-bottom: 16px;
  }

  .project-bit-preview {
    border: 1px solid rgba(0,0,0,.1);
  }
}

.bit-count {
  opacity: .5;
  margin-bottom: 32px;
}
</style>