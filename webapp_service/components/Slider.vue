<template>
  <div class="slider">
    <img class="image" :src="getImageUrl(image)" v-for="image in material.previewImages" :key="image"/>
  </div>
</template>

<script>
export default {
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(basename) {
      return this.$store.getters.getImageUrl(this.material, basename)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
}

.image {
  margin-right: 8px;
  max-width: calc(100vw - 48px);
}
</style>