<template>
  <div class="option-switch">
    <div class="option" @click="handleOptionClick(option)" :class="{ selected: option.value === iSelected }" v-for="option in options" :key="option.value">
      <icon v-if="option.icon"/><span class="name">{{ option.name }}</span>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: { Icon },
  model: {
    prop: 'selected',
    event: 'select'
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: {}
  },
  data() {
    return {
      iSelected: this.selected
    }
  },
  methods: {
    handleOptionClick(option) {
      this.iSelected = option.value
      this.$emit('select', this.iSelected)
    }
  },
  watch: {
    selected() {
      this.iSelected = this.selected
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.option-switch {
  display: inline-flex;
  background: none;
  padding: 0;
  outline: none;
  border: 0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
}

.option {
  padding: 8px 16px;
  //border: 1px solid $primary-color;
  //border-right: 0;
  //border-right: 1px solid $primary-color;
  cursor: pointer;
  position: relative;
  transition: background .2s;
  line-height: 1;

  &:last-child {
    margin-right: 0;
    border-right: 0;
  }

  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 70%;
    width: 1px;
    background: $primary-color;
    right: 0;
    position: absolute;
    top: 15%;
    transform: translateX(50%);
    z-index: 100;
  }

  .name {
    font-size: $button-font-size;
    text-transform: uppercase;
    font-weight: bold;
    transform: translateY(-0.1em);
    display: inline-block;
  }

  &:hover {
    background: rgb(245, 245, 245);
  }

  &.selected {
    background: rgb(230, 230, 230);
    cursor: default;
  }
}
</style>