<template>
  <div class="slider">
    <cimage v-for="image in images" :key="image.url" :image="image"/>
  </div>
</template>

<script>
import Image from '@/components/Image'

export default {
  components: { 'cimage': Image },
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
}

.image {
  margin-right: 8px;
  max-width: calc(100vw - 48px);
}
</style>