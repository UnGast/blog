<template>
  <section class="project-bit-preview">
    <!-- maybe use a real already cropped image / or provide height, width through query instead of background -->
    <div class="preview-image" :style="{ backgroundImage: `url(${bit.previewImages[0].url})` }"/>
    
    <div class="right">
      <nuxt-link class="link-timestamp" :to="fullBitPageLocation">{{ timestamp }}</nuxt-link>

      <markdown-text class="summary" :markdown="bit.summary"/>

      <nuxt-link class="show-full-action link-action" :to="fullBitPageLocation"><span class="text">{{ $t('projectBitPreview.showFullAction') }}</span><icon name="arrow_forward"/></nuxt-link>
    </div>
  </section>
</template>

<script>
import MarkdownText from '@/components/MarkdownText'
import Icon from '@/components/Icon'

export default {
  components: { MarkdownText, Icon },
  props: {
    bit: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp() {
      return this.$formatDate(new Date(Number(this.bit.timestamp)))
    },
    fullBitPageLocation() {
      console.log("GET FULL BIT PAGE LOCATION", this.$route.params, this.bit)
      return this.localePath({ name: 'project-projectSlug-bitTimestamp', params: {
        projectSlug: this.bit.project.slug,
        bitTimestamp: this.bit.timestamp
      }})
    }
  }
}

export let requiredProjectBitFields = [
  'timestamp', 'summary', { name: 'previewImages', fields: ['url'] }, { name: 'project', fields: ['slug'] }
]
</script>

<style lang="scss" scoped>
@import 'style';

.project-bit-preview {
  display: flex;
}

.preview-image {
  width: 300px;
  height: 300px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}

.right {
  padding: 32px 16px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
}

.link-timestamp {
  //text-decoration: underline;
  //color: $primary-color;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.summary {
  flex-grow: 1;
}

.show-full-action {
  opacity: 0;
  align-self: flex-end;
}

.project-bit-preview:hover {
  .show-full-action {
    opacity: 1;
  }
}
</style>