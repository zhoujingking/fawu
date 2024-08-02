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


const src = computed(() => {
  return `/file/v1/${props.fileId}`;
});

const isPdf = computed(() => src.value.endsWith('.pdf'));
const isOffice = computed(() => {
  return src.value.endsWith('.docx') || src.value.endsWith('.doc') || 
    src.value.endsWith('.pptx') || src.value.endsWith('.ppt') || 
    src.value.endsWith('.xlsx') || src.value.endsWith('.xls') || src.value.endsWith('.csv');
});
const isText = computed(() => {
  return src.value.endsWith('.html') || src.value.endsWith('.htm') || src.value.endsWith('.txt');
});
</script>

<style lang="scss" scoped>

</style>