<template>
  <div class="file-view">
    <el-tabs class="tabs"v-model="activeTab" lazy @tab-click="onTabClick">
      <el-tab-pane label="详情" name="detail">
        <FileViewer class="doc" :src="fileUrl" />
      </el-tab-pane>
      <el-tab-pane label="概览" name="abstract">
        <FileAbstract :data="data" />
      </el-tab-pane>
      <el-tab-pane label="标签" name="tags">
        <FileTagList :data="data" />
      </el-tab-pane>
      <el-tab-pane label="相关性" name="relatives">
        <FileRelatives />
      </el-tab-pane>
      <el-tab-pane label="知识图谱" name="graph">
        <Graph class="doc" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import FileAbstract from '@/components/FileAbstract.vue';
import FileTagList from '@/components/FileTagList/index.vue';
import FileRelatives from './FileRelatives.vue';
import { ref } from 'vue';
import FileViewer from '@/components/FileViewer/index.vue';
import Graph from '@/components/Graph.vue';

const activeTab = ref('detail');
const data = ref({
  id: 1,
  title: 'test title',
  author: 'godking',
  date: '2021-01-23',
  tags: []
})

const fileList = [
  'https://bridge-test.jsfund.cn/test.pptx',
  'https://bridge-test.jsfund.cn/test.xlsx',
  'https://bridge-test.jsfund.cn/mindera.docx',
  '/test.pdf'
];

const fileIndex = Math.floor(Math.random() * fileList.length);

const fileUrl = fileList[fileIndex];

const onTabClick = tab => {
  console.log(tab)
}
</script>

<style lang="scss" scoped>
.file-view {
  width: 100%;
  height: 100%;
  padding: 24px;
  .doc {
    height: calc(100vh - 164px);
  }
}
</style>