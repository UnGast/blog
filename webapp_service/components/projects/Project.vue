<template>
  <section class="project">
    {{ project }}
  </section>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>