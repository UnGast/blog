<template>
  <div class="image">
    <img class="the-image" :src="image.url" :alt="image.description"/>
    <span class="description">{{ image.description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';

.image {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.the-image {
  width: 100%;
  max-height: 100%;
  height: auto;
  margin-bottom: 8px;
}

.description {
  opacity: .7;
  font-size: 1rem;
  font-family: inherit;
}
</style>