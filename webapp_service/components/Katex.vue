<script>
import katex from 'katex'

export default {
  props: {
    inline: {
      type: Boolean,
      default: true
    }
  },
  render(h) {
    const katexInput = this.$slots.default[0].text
    const katexOutput = katex.renderToString(katexInput)
    return h('span', { class: { 'katex-wrapper': true, inline: this.inline }, domProps: { innerHTML: katexOutput } })
  }
}
</script>

<style lang="scss" scoped>
.katex-wrapper {
  font-size: 1.5em;
  line-height: inherit;
  display: block;

  &.inline {
    font-size: inherit;
    line-height: inherit;
    display: inline;
  }

  /deep/ .katex {
    font-size: inherit;
    line-height: inherit;
  }
}
</style>