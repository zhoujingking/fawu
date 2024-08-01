<template>
  <div class="file-view">
    <el-tabs class="tabs" v-model="activeTab" lazy @tab-click="onTabClick">
      <el-tab-pane label="详情" name="detail">
        <FileViewer class="doc" :src="fileUrl" />
      </el-tab-pane>
      <el-tab-pane label="概览" name="abstract">
        <FileAbstract :fileId="fileId" />
      </el-tab-pane>
      <el-tab-pane label="标签" name="tags">
        <FileTagList :fileId="fileId" />
      </el-tab-pane>
      <el-tab-pane label="相关性" name="relatives">
        <FileRelatives :fileId="fileId" />
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

const route = useRoute();
const fileId = route.query.id;
const activeTab = ref('detail');

const fileUrl = computed(() => {
  if (fileId.endsWith('.pdf')) {
    return `/file/v1/${fileId}`;
  }
  return `http://3.215.119.4:8080/file/v1/${fileId}`;
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