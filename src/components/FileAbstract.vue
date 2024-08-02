<template>
  <VueJsonPretty :data="summary" :showIcon="false" :showDoubleQuotes="false" />
</template>

<script setup>
import { sendPostRequest } from '@/utils';
import { onMounted, ref } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
});

const getFileSummary = async fileId => {
  const data = await sendPostRequest('/file/getFileSummary', {
    fileId
  });
  if (!data.summary) {
    return {};
  }
  return JSON.parse(data.summary);
}

const summary = ref({});
const isLoading = ref(false);

onMounted(() => {
  isLoading.value = true;
  getFileSummary(props.fileId).then(data => {
    summary.value = data;
    isLoading.value = false;
  }).catch(() => {
    isLoading.value = false;
  })
})
</script>

<style lang="scss" scoped>

</style>