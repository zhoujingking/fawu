<template>
  <div class="file" v-for="file in fileList" :key="file.id" @click="onFileClick(file)">
    <div class="title" :title="file.title">{{ file.title }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const fileList = ref([
  {
    id: 1,
    title: '测试标题'
  },
  {
    id: 3,
    title: '测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题'
  },
  {
    id: 4,
    title: '测试标题'
  },
])

const router = useRouter();
const onFileClick = file => {
  const route = router.resolve({
    name: 'file',
    query: {
      id: file.id
    }
  })
  window.open(route.href);
}
</script>

<style lang="scss" scoped>
.file {
  padding: 4px 8px;
  margin-bottom: 12px;
  border: solid 1px var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border-color: var(--link-hover-color);
    .title {
      color: var(--link-hover-color);
    }
  }

  .title {
    overflow: hidden;
    color: var(--link-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
}
</style>