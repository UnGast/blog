<template>
  <section class="feed">
    <article-preview v-for="data in sortedArticlePreviews" :key="data.slug" :data="data"/>
  </section>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'

export default {
  components: { ArticlePreview },
  computed: {
    sortedArticlePreviews() {
      return this.$store.state.sortedArticlePreviews
    }
  }
}
</script>

<style lang="scss" scoped>
.article-preview {
  margin-bottom: 64px;
}
</style>