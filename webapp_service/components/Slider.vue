<template>
  <div class="slider">
    <div class="images">
      <div
        class="image-wrapper"
        ref="images"
        v-for="(image, index) in images"
        :key="image.url"
        :class="{ active: activeImageIndex === index }"
        :style="{ transform: `translateX(${imageTranslation}px)` }">
        <cimage :image="image" :showDescription="false"/>

        <span class="description">{{ image.description }}</span>
      </div>
    </div>

    <button
      class="navigation-button previous"
      :class="{ show: activeImageIndex > 0 }"
      @click="handlePreviousImageButtonClick"><icon name="arrow_back"/></button>
    
    <button
      class="navigation-button next"
      :class="{ show: activeImageIndex < images.length - 1 }"
      @click="handleNextImageButtonClick"><icon name="arrow_forward"/></button>
  </div>
</template>

<script>
import Image from '@/components/Image'
import Icon from '@/components/Icon'

export default {
  components: { 'cimage': Image, Icon },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeImageIndex: 0,
      imageTranslation: 0
    }
  },
  watch: {
    activeImageIndex() {
      this.imageTranslation = -this.$refs.images[this.activeImageIndex].offsetLeft
    }
  },
  methods: {
    handlePreviousImageButtonClick() {
      if (this.activeImageIndex > 0) {
        this.activeImageIndex -= 1
      }
    },
    handleNextImageButtonClick() {
      if (this.activeImageIndex < this.images.length - 1) {
        this.activeImageIndex += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';

.slider {
  position: relative;
  background: black;
}

.images {
  position: relative;
  white-space: nowrap;
}

.image-wrapper {
  transition: all .2s;
  opacity: .7;
  display: inline-flex;
  color: white;
  flex-direction: column;

  .description {
    opacity: 0;
    transition: all .2s;
    text-align: center;
    padding: 8px;
  }

  &.active {
    opacity: 1;

    .description {
      opacity: 1;
      transition: all .2s .2s;
    }
  }
}

.image {
  width: 100%;
  height: auto;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,.5);
  border: 3px solid $primary-color;
  border-radius: 15px;
  outline: 0;
  fill: white;
  color: white;
  transition: all .2s;
  padding: 16px;
  font-size: 0;
  opacity: 0;
  cursor: pointer;

  .icon {
    width: 1.3rem;
    height: 1.3rem;
  }

  &:hover {
    background: black;
  }

  &:active {
    background: $primary-color;
  }

  &.show {
    opacity: 1;
  }

  &.previous {
    left: 16px;
  }

  &.next {
    right: 16px;
  }
}
</style>