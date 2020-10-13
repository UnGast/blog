<template>
  <section class="project-bit-preview">
    {{ bit.timestamp }}
  </section>
</template>

<script>
export default {
  props: {
    bit: {
      type: Object,
      required: true
    }
  }
}
</script>