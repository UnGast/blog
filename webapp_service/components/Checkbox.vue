<template>
  <span class="checkbox" @click="handleClick" :class="{ checked: value }">
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.checkbox {
  background: white;
  border: 1px solid $primary-color;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    width: .4rem;
    height: .6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -60%) rotateZ(30deg);
    border-color: $primary-color;
    opacity: 0.1;
  }

  &.checked::before {
    opacity: 1;
  }

  &:hover {
    &::before {
      opacity: .2;
    }
  }
  
  &.checked:hover {
    &::before {
      opacity: .8;
    }
  }

  &:active {
    &::before {
      opacity: 0.5;
    }
  }
}
</style>