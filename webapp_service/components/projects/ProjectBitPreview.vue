<template>
  <section class="project-bit-preview">
    <span class="datetime">{{ datetime }}</span>

    <img :src="bit.previewImages[0].url"/>

    <markdown-text :markdown="bit.summary"/>
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
    datetime() {
      return this.$formatDate(new Date(Number(this.bit.timestamp)))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>