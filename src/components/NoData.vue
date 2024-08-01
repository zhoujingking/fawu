<template>
  <div class="empty row">{{ text }}</div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style lang="scss" scoped>
.empty {
  justify-content: center;
  align-items: center;
  color: var(--primary-text-color);
}
</style>