<template>
  <div class="embedded-layout">
    <div v-html="iconSvg"/>
    <nuxt/>
  </div>
</template>

<script>
import iconSvg from '!raw-loader!~/assets/icons/symbol-defs.svg'

export default {
  computed: {
    iconSvg() {
      return iconSvg
    }
  },
  data: () => ({
    width: 0,
    height: 0
  }),
  methods: {
    publishSize() {
      if (this.$el.offsetWidth != this.width || this.$el.offsetHeight != this.height) {
        this.width = this.$el.offsetWidth
        this.height = this.$el.offsetHeight
        window.top.postMessage({
          id: process.env.BASE_URL + this.$route.fullPath,
          width: this.width,
          height: this.height
        }, '*')
      } else {
        window.requestAnimationFrame(this.publishSize)
      }
    }
  },
  mounted() {
    this.publishSize()
  },
  created() {
    if (!this.$isServer) {
      _paq.push(['disableCookies'])
    }
  }
}
</script>

<style scoped>
.embedded-layout {
  display: inline-block;
}
</style>