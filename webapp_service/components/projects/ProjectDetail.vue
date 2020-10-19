<template>
  <section class="project-detail">
    {{ project }}

    <markdown-text class="page-intro" :markdown="project.description"/>

    <div class="bits">
      <project-bit-preview v-for="bit in project.bits" :key="bit.timestamp" :bit="bit"/>
    </div>
  </section>
</template>

<script>
import MarkdownText from '@/components/MarkdownText'
import { default as ProjectBitPreview, requiredProjectBitFields } from './ProjectBitPreview'

export default {
  components: { MarkdownText, ProjectBitPreview },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}

export let requiredProjectFields = [
  'title', 'slug', 'description', {
    name: 'bits', fields: requiredProjectBitFields
  }
]
</script>