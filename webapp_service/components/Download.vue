<template>
  <a class="download" :href="downloadUrl">download {{ download.downloadFilename }}</a>
</template>

<script>
export default {
  props: {
    download: {
      type: Object,
      required: true
    }
  },
  computed: {
    downloadUrl() {
      return this.download.url + '?download' + (this.download.downloadFilename ? '=' + this.download.downloadFilename : '')
    }
  }
}
</script>