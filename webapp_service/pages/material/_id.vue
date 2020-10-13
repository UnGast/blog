<template>
  <div class="material-page">
    <materials-tree/>
    <div class="right">
      <nuxt-link class="material-menu-link" :to="{ name: 'material' }">< zur Materialübersicht</nuxt-link>
      <material :material="material"/>
      <newsletter-form v-if="showNewsletterForm" :hideable="true"/>
      <nuxt-link class="material-menu-link" :to="{ name: 'material' }">< zur Materialübersicht</nuxt-link>
    </div>
  </div>
</template>

<script>
import MaterialsTree from '~/components/MaterialsTree'
import Material from '~/components/Material'
import NewsletterForm from '~/components/NewsletterForm'

export default {
  components: { MaterialsTree, Material, NewsletterForm },
  asyncData ({ route }) {
    return {
      materialId: route.params.id
    }
  },
  computed: {
    material() {
      return this.$store.getters.materialsById[this.$route.params.id]
    },
    showNewsletterForm() {
      return !this.$store.state.userHidNewsletter
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.material-page {
  display: flex;
  padding-left: 24px;
}

.materials-tree {
  margin-right: 48px;
  max-width: 200px;
  flex-grow: 1;
}

.right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.material {
  margin-bottom: 64px;
}

.newsletter-form {
  margin-right: 24px;
  //max-width: $max-text-column-width;
}

.material-menu-link {
  margin-bottom: 24px;
  display: none;
}

@media screen and (max-width: $breakpoint-small) {
  .material-page {
    flex-direction: column;
  }

  .materials-tree {
    display: none;
  }

  .material {
    margin-bottom: 48px;
  }

  .material-menu-link {
    display: block;
  }
}
</style>