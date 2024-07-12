<template>
  <PdfViewer v-if="isPdf" :src="src" />
  <OfficeViewer v-else :src="src" />
</template>

<script setup>
import { computed, ref } from 'vue';
import PdfViewer from './PdfViewer.vue'
import OfficeViewer from './OfficeViewer.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isPdf = computed(() => props.src.endsWith('.pdf'));
</script>

<style lang="scss" scoped>

</style>