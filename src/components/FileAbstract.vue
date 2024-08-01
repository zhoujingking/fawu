<template>
  <div>
    <h3>标题</h3>
    <p>{{ data.fileTitle }}</p>
    <h3>作者</h3>
    <p>{{ data.author }}</p>
    <h3>添加时间</h3>
    <p>{{ displayDate(data.createTimestamp) }}</p>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const displayDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
}
</script>

<style lang="scss" scoped>
p {
  color: var(--primary-text-color);
}
</style>