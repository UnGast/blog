<template>
  <section class="article-preview">
    <img class="image" :src="previewImageUrl" :alt="data.title"/>
    <div class="info">
      <nuxt-link :to="localePath({ name: 'article-slug', params: { slug: data.slug } })" class="title increased-pointer-target">{{ data.title }}</nuxt-link>
      <p class="text descriptive-text">{{ data.previewText }}</p>
      <div class="tags">
        <span class="tag" v-for="tag in data.tags" :key="tag.slug">{{ tag.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    previewImageUrl() {
      return this.$store.getters.getArticleImageUrl(this.data, this.data.previewImage)
    },
    publicationDate() {
      return this.$store.getters.getLocalizedArticlePublicationDate(this.data, this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/style.scss";

.article-preview {
  display: flex;
  align-items: stretch;
}

.image {
  height: 150px;
  width: auto;
  margin-right: 16px;
  border-radius: 5px;
}

.info {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 8px;
  display: block;
  text-decoration: none;
  font-weight: bold;
}

.publication-date {
  font-size: 1rem;
  margin-bottom: 8px;
  opacity: .7;
}

.text {
  margin-bottom: 16px;
  //flex-grow: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
}

.tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

@media screen and (max-width: $breakpoint-small) {
  .article-preview {
    align-items: flex-start;
  }
  
  .image {
    order: 1;
    width: 80px;
    margin-right: 0;
    height: auto;
  }

  .info {
    order: 0;
    margin-right: 16px;
  }
}
</style>