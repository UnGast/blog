<template>
  <section class="project-bits-overview">
    <project-bit-preview v-for="bit in project.bits" :key="bit.timestamp" :bit="bit"/>
  </section>
</template>

<script>
import ProjectBitPreview from './ProjectBitPreview'

export default {
  components: { ProjectBitPreview },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>