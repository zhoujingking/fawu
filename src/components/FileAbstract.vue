<template>
  <div>
    <h3>标题</h3>
    <p>{{ data.title }}</p>
    <h3>作者</h3>
    <p>{{ data.author }}</p>
    <h3>添加时间</h3>
    <p>{{ data.date }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
p {
  color: var(--primary-text-color);
}
</style>