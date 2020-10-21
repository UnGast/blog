<template>
  <a class="download" :href="downloadUrl">
    <icon name="file_download"/>
    <span class="download-label">download</span>
    <span class="download-text" v-if="download.text || download.downloadFilename">{{ download.text || download.downloadFilename }}</span>
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

.download-label {
  font-weight: bold;
  text-transform: uppercase;
  font-size: .8rem;
}

.download-text {
  margin-left: 8px;
  font-size: .8rem;
}
</style>