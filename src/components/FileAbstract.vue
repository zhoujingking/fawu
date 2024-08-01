<template>
  <div>
    <h3>标题</h3>
    <p>{{ summary.fileTitle }}</p>
    <h3>作者</h3>
    <p>{{ summary.author }}</p>
    <h3>添加时间</h3>
    <p>{{ formatDate(summary.createTimestamp) }}</p>
  </div>
</template>

<script setup>
import { sendPostRequest } from '@/utils';
import { onMounted, ref } from 'vue';
import { formatDate } from '@/utils';

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


onMounted(() => {
  getFileSummary(props.fileId).then(data => {
    summary.value = data;
  })
})
</script>

<style lang="scss" scoped>
p {
  color: var(--primary-text-color);
}
</style>