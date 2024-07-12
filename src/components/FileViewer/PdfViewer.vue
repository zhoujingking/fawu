<template>
  <iframe class="viewer" :src="url" frameborder="0"></iframe>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const url = `/pdfviewer/web/viewer.html?file=${props.src}`
</script>

<style lang="scss" scoped>
.viewer{
  width: 100%;
  height: 100%;
}
</style>