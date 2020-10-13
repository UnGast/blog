<template>
  <div class="material-downloads">
    <label class="label">Downloads</label><a class="download" download :href="getDownloadUrl(download)" v-for="download in material.downloads" :key="download.file">{{ download.file }}</a>
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
    getDownloadUrl(download) {
      return this.$store.getters.getDownloadUrl(this.material, download)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-downloads {
  display: flex;
  align-items: center;
}

.label {
  font-weight: bold;
  text-transform: uppercase;
  transform: translateY(10%);
  margin-right: 8px;
}

.download {
  margin-right: 8px;
}
</style>