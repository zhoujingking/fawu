<template>
  <div class="file-view">
    <el-tabs v-model="activeTab" lazy @tab-click="onTabClick">
      <el-tab-pane label="详情" name="detail">TBD</el-tab-pane>
      <el-tab-pane label="概览" name="abstract">
        <FileAbstract :data="data" />
      </el-tab-pane>
      <el-tab-pane label="标签" name="tags">
        <FileTagList :data="data" />
      </el-tab-pane>
      <el-tab-pane label="相关性" name="relatives">
        <FileRelatives />
      </el-tab-pane>
      <el-tab-pane label="知识图谱" name="graph">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import FileAbstract from '@/components/FileAbstract.vue';
import FileTagList from '@/components/FileTagList/index.vue';
import FileRelatives from './FileRelatives.vue';
import { ref } from 'vue';

const activeTab = ref('detail');
const data = ref({
  id: 1,
  title: 'test title',
  author: 'godking',
  date: '2021-01-23',
  tags: []
})

const onTabClick = tab => {
  console.log(tab)
}
</script>

<style lang="scss" scoped>
.file-view {
  width: 100%;
  height: 100%;
  padding: 24px;
}
</style>