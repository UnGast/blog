<template>
  <section class='article-page text-column-page'>
    <div class="page-top">
      <h1 class="page-title">{{ data.title }}</h1>
      <div class="meta">
        <span class="publication-date">{{ publicationDate }}</span>
        <span class="tag" v-for="tag in data.tags" :key="tag.slug">{{ tag.name }}</span>
      </div>
    </div>

    <c-article :data='data'/>

    <div class="after-article-action-line">
      <nuxt-link :to="localePath({ name: 'index' })" class="backlink button flat"><icon name="arrow_back"/><span class="text">{{ $t('articlePage.moreArticles') }}</span></nuxt-link>
      
      <div class="social-actions">
        <share-network
          class="button social"
          network="facebook"
          :url="url"
          :title="data.title"
          :description="data.description">Facebook</share-network>

        <share-network
          class="button social"
          network="twitter"
          :url="url"
          :title="data.title">Twitter</share-network>
      </div>
    </div>

    <newsletter-form/>
  </section>
</template>

<script>
import Article from '@/components/Article'
import NewsletterForm from '@/components/NewsletterForm'
import Icon from '@/components/Icon'
import { generatePageHead } from '@/lib/page-head'
import _ from 'lodash'

export default {
  head () {
    return _.merge(generatePageHead({
      title: this.data.title,
      description: this.data.previewText,
      url: this.url,
      ogType: 'article',
      twitterCard: 'summary',
      imageUrl: this.$store.getters.getArticleImageUrl(this.data, this.data.previewImage)
    }), {
      /*title: this.data.title,
      meta: [
        { hid: 'title', name: 'title', content: this.data.title },
        { hid: 'description', name: 'description', content: this.data.previewText },
        
        { hid: 'og:title', property: 'og:title', content: this.data.title },
        { hid: 'og:description', property: 'og:description', content: this.data.previewText },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: this.$store.getters.getArticleImageUrl(this.data, this.data.previewImage) },
        { hid: 'og:url', property: 'og:url', content: url },

        { hid: 'twitter:title', property: 'twitter:title', content: this.data.title },
        { hid: 'twitter:description', property: 'twitter:description', content: this.data.previewText },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:image', property: 'twitter:image', content:  },
        { hid: 'twitter:url', property: 'twitter:url', content: url },
      ],*/
      script: [{
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': this.data.title,
          'image': [
            this.$store.getters.getArticleImageUrl(this.data, this.data.previewImage)
          ],
          'datePublished': new Date(this.data.publicationTimestamp).toISOString(),
          'dateModified': new Date(this.data.modificationTimestamp).toISOString(),
          'publisher': {
            '@type': 'Organization',
            'name': 'EngineeringByDoing',
            'logo': {
              '@type': 'ImageObject',
              'url': process.env.BASE_URL + require('~/assets/logo/symbol.svg')
            }
          }
        }
      }]
    })
  },
  components: { 'c-article': Article, NewsletterForm, Icon },
  async asyncData({ params, store }) {
    return {
      data: await store.dispatch('loadFullArticle', params.slug)
    }
  },
  computed: {
    publicationDate() {
      return this.$store.getters.getLocalizedArticlePublicationDate(this.data, this.$i18n.locale)
    },
    url() {
      return process.env.BASE_URL + this.$route.fullPath
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/assets/style/style.scss';

.article-page {
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.page-top {
  //margin-bottom: 24px;
}

.page-title {
  margin-bottom: 16px;
}

.publication-date {
  font-size: .8rem;
  margin-bottom: 8px;
  opacity: .7;
  margin-right: 8px;
}

.tag {
  margin-right: 8px;
}

.article {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 48px;
}

.after-article-action-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-bottom: 64px;
}

.backlink {
  display: flex;
  align-items: center;
  //font-size: 1rem;
  text-decoration: none;

  .icon {
    margin-right: 8px;
    fill: white;
    transform: translateY(0.05em); // more aligned to center
  }

  .text {
    //transform: translateY(0em); // more aligned to center
  }
}

.social-actions {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;

  .button {
    margin-left: 16px;
  }
}

.newsletter-form {
  width: 100%;
}

@media screen and (max-width: $breakpoint-small) {
  .after-article-action-line {
    flex-direction: column;
  }

  .backlink {
    order: 1;
  }

  .social-actions {
    order: 0;
    margin-bottom: 64px;
    justify-content: flex-start;
  }
}
</style>