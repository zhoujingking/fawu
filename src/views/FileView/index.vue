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
        <FileTagList :fileId="fileId" />
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
import { computed, ref } from 'vue';
import FileViewer from '@/components/FileViewer/index.vue';
import Graph from '@/components/Graph.vue';
import { useRoute } from 'vue-router';
import { sendPostRequest } from '@/utils';

const route = useRoute();
const fileId = route.query.id;
const fileInfo = ref({});

const getFileDetail = async fileId => {
  return sendPostRequest('/file/getFileSummary', {
    fileId
  })
}



const activeTab = ref('detail');
const data = ref({
  id: 1,
  title: 'test title',
  author: 'godking',
  date: '2021-01-23',
  tags: []
})

getFileDetail(fileId).then(data => [
  console.log(data)
])

const fileUrl = computed(() => {
  if (fileId.endsWith('.pdf')) {
    return `/file/v1/${fileId}`;
  }
  return `/file/v1/${fileId}`;
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
  .doc {
    height: calc(100vh - 164px);
  }
}
</style>