<template>
  <PdfViewer v-if="isPdf" :src="src" />
  <OfficeViewer v-else-if="isOffice" :src="src" />
</template>

<script setup>
import { computed } from 'vue';
import PdfViewer from './PdfViewer.vue'
import OfficeViewer from './OfficeViewer.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isPdf = computed(() => props.src.endsWith('.pdf'));
const isOffice = computed(() => {
  const src = props.src;
  return src.endsWith('.docx') || src.endsWith('.doc') || 
    src.endsWith('.pptx') || src.endsWith('.ppt') || 
    src.endsWith('.xlsx') || src.endsWith('.xls') || src.endsWith('.csv');
})
</script>

<style lang="scss" scoped>

</style>