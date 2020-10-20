<template>
  <img class="image" :src="image.url" :alt="image.alt"/>
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