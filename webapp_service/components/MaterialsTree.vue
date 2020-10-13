<template>
  <section class="materials-tree">
    <div class="category" v-for="category in categories" :key="category.id">
      <span class="category-name">{{ category.name }}</span>
      <div class="topics">
        <div class="topic" v-for="topic in topicsByCategoryId[category.id]" :key="topic.id">
          <span class="topic-name">{{ topic.name }}</span>
          <div class="materials">
            <div class="material" v-for="material in materialsByCategoryTopicId[category.id][topic.id]" :key="material.id">
              <nuxt-link class="material-link" :to="{ name: 'material-id', params: { id: material.id } }"><h4 class="material-name">{{ material.name }}</h4></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    materialsByCategoryTopicId () {
      return this.$store.getters.materialsByCategoryTopicId
    },
    categories () {
      return this.$store.getters.sortedCategories
    },
    topicsByCategoryId () {
      return this.$store.getters.sortedTopicsByCategoryId
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.category {
  margin-bottom: 16px;
}

.category-name {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 16px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.topics {
  //padding-left: 8px;
}

.topic {
  margin-bottom: 32px;
}

.topic-name {
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 8px;
  display: block;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.material {
  margin-bottom: 8px;
}

.material-link.nuxt-link-exact-active {
  background: change-color($color: $primary-color, $alpha: .2);
  border-radius: 5px;
}

.material-link {
  display: inline-block;
  text-decoration: none;
}

.material-name {
  white-space: wrap;
  letter-spacing: 0.01em;
  letter-spacing: 0.06em;
}
</style>