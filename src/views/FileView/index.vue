<template>
  <div class="file-view row">
    <FileViewer class="doc" :fileId="fileId" />
    <div class="btn" @click="onBtnClick">{{ isExpanded ? '折叠' : '展开' }}</div>
    <div class="aside" :class="isExpanded ? 'show': 'hide'">
      <el-tabs class="tabs" v-model="activeTab" @tab-click="onTabClick">
        <el-tab-pane label="概览" name="abstract">
          <FileAbstract class="doc" :fileId="fileId" />
        </el-tab-pane>
        <el-tab-pane label="标签" name="tags" lazy>
          <FileTagList class="doc" :fileId="fileId" />
        </el-tab-pane>
        <el-tab-pane label="相关性" name="relatives" lazy>
          <FileRelatives class="doc" :fileId="fileId" />
        </el-tab-pane>
        <el-tab-pane label="知识图谱" name="graph" lazy>
          <Graph class="doc" :fileId="fileId" />
        </el-tab-pane>
      </el-tabs>
    </div>
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
const activeTab = ref('abstract');
const isExpanded = ref(true);

const onTabClick = tab => {
  console.log(tab)
}

const onBtnClick = () => {
  isExpanded.value = !isExpanded.value;
}
</script>

<style lang="scss" scoped>
.file-view {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;

  .doc {
    flex-grow: 1;
    overflow: auto;
    width: 70%;
    height:  100%;
  }
  .aside {
    flex-shrink: 0;
    padding: 0 12px;
    width: 30%;
    background-color: #f5f7fa;
    &.hide {
      display: none;
    }
  }
  .btn {
    position: absolute;
    right: 0;
    top: 50%;
    padding: 3px 5px;
    border-radius: 4px;
    font-size: 14px;
    color: white;
    background-color: #79bbff;
    cursor: pointer;
  }
}


</style>