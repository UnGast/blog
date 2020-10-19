<template>
  <i class="icon"><svg><use :xlink:href="'#icon-' + name"></use></svg></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 0;
}

svg {
  fill: currentColor;
  width: 1rem;
  height: 1rem;
}
</style>