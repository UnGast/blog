<template>
  <section class="article">
    <div class="running-text">
      <article-markdown-content :markdown="data.body" :imageBaseUrl="imageBaseUrl"/>
    </div>
  </section>
</template>

<script>
import ArticleMarkdownContent from '@/components/ArticleMarkdownContent'


export default {
  components: { ArticleMarkdownContent },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageBaseUrl() {
      return this.$store.getters.getArticleImageBaseUrl(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';
</style>