<template>
  <section class="project-bit-preview">
    <div class="preview-image">
      <img class="image" :src="bit.previewImages[0].url"/>
    </div>
    
    <div class="info">
      <span class="timestamp">{{ timestamp }}</span>

      <markdown-text class="summary" :markdown="bit.summary"/>
    </div>
  </section>
</template>

<script>
import MarkdownText from '@/components/MarkdownText'

export default {
  components: { MarkdownText },
  props: {
    bit: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp() {
      return this.$formatDate(new Date(Number(this.bit.timestamp)))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';

.project-bit-preview {
  display: flex;
}

.preview-image {
  width: 400px;
  height: 400px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  .image {
    position: absolute;
    height: 400px;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}

.info {
  padding: 32px 16px 16px 32px;
  display: flex;
  flex-direction: column;
}

.timestamp {
  text-decoration: underline;
  color: $primary-color;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.summary {
}
</style>