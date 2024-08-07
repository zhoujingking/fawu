<template>
  <div class="file-view">
    <el-tabs class="tabs" v-model="activeTab" @tab-click="onTabClick">
      <el-tab-pane label="详情" name="detail" lazy>
        <FileViewer class="doc" :fileId="fileId" />
      </el-tab-pane>
      <el-tab-pane label="概览" name="abstract" lazy>
        <FileAbstract class="doc":fileId="fileId"/>
      </el-tab-pane>
      <el-tab-pane label="标签" name="tags" lazy>
        <FileTagList class="doc" :fileId="fileId"/>
      </el-tab-pane>
      <el-tab-pane label="相关性" name="relatives" lazy>
        <FileRelatives class="doc":fileId="fileId"/>
      </el-tab-pane>
      <el-tab-pane label="知识图谱" name="graph" lazy>
        <Graph class="doc" :fileId="fileId" />
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
import { useRoute } from 'vue-router';

const route = useRoute();
const fileId = route.query.id;
const activeTab = ref('detail');

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
    overflow: auto;
    height: calc(100vh - 164px);
    width: 100%;
  }
}
</style>