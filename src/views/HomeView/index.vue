<template>
  <div class="row home-page">
    <div class="aside">
      <div class="header row">
        <span class="title">项目列表</span>
        <el-button class="new-btn" type="primary" size="small" :icon="Plus" @click="onNewProject">新建项目</el-button>
      </div>
    </div>
    <div class="content"></div>
    <NewProjectDialog v-if="dialogVisible" v-model="dialogVisible" @change="onProjectCreated" />
  </div>
</template>

<script setup>
import {
  Plus
} from '@element-plus/icons-vue'
import NewProjectDialog from './NewProjectDialog.vue';
import { ref } from 'vue';

const dialogVisible = ref(false);
const onNewProject = () => {
  dialogVisible.value = true;
}

const onProjectCreated = project => {
  console.log(project)
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}
.aside {
  width: 300px;
  // background: cyan;
  .header {
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: solid 1px var(--border-color);
    .title {
      font-size: 20px;
      color: var(--primary-color);
    }
  }
}
</style>