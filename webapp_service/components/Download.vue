<template>
  <a class="download" :href="downloadUrl">
    <icon name="file_download"/>
    <span class="text">download {{ download.downloadFilename }}</span>
  </a>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: { Icon },
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

<style lang="scss" scoped>
@import 'style';

.download {
  display: inline-flex;
  align-items: center;
  background: lighten($primary-color, 30%);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
}

.icon {
  margin-right: 8px;
}

.text {
}
</style>