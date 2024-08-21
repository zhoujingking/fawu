<template>
  <div class="abstract">
    <div class="row entry" v-for="(entry, index) in Object.entries(summary)" :key="index">
      <div class="key">{{ entry[0] }}：</div>
      <div class="value">{{ entry[1] }}</div>
    </div>
  </div>
</template>

<script setup>
import { sendPostRequest } from '@/utils';
import { onMounted, ref } from 'vue';

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
.entry {
  font-size: 14px;
  line-height: 22px;
  .key {
    flex-shrink: 0;
    width: 100px;
    color: #00000072;
    text-align: end;
  }
  .value {
    color: #000000D8;
  }
}
</style>