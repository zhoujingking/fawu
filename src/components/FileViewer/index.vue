<template>
  <PdfViewer v-if="isPdf" :src="src" />
  <OfficeViewer v-else-if="isOffice" :src="src" />
  <TextViewer v-else-if="isText" :src="src" />
</template>

<script setup>
import { computed } from 'vue';
import PdfViewer from './PdfViewer.vue'
import OfficeViewer from './OfficeViewer.vue'
import TextViewer from './TextViewer.vue'

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
})

const fileId = props.fileId;

const src = computed(() => {
  if (isOffice.value) {
    const origin = window.location.origin;
    return `${origin}/file/v1/${fileId}`;
  }
  return `/file/v1/${fileId}`;
});

const isPdf = computed(() => fileId.endsWith('.pdf'));
const isOffice = computed(() => {
  return fileId.endsWith('.docx') || fileId.endsWith('.doc') || 
    fileId.endsWith('.pptx') || fileId.endsWith('.ppt') || 
    fileId.endsWith('.xlsx') || fileId.endsWith('.xls') || fileId.endsWith('.csv');
});
const isText = computed(() => {
  return fileId.endsWith('.html') || fileId.endsWith('.htm') || fileId.endsWith('.txt');
});
</script>

<style lang="scss" scoped>

</style>