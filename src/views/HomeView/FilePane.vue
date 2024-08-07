<template>
  <el-tabs class="tabs" v-model="activeTab" lazy>
    <el-tab-pane label="详情" name="detail">
      <FileAbstract :fileId="fileId" :key="fileId"/>
    </el-tab-pane>
    <el-tab-pane label="标签" name="abstract">
      <FileTagList :fileId="fileId" :key="fileId" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import FileAbstract from '@/components/FileAbstract.vue';
import FileTagList from '@/components/FileTagList/index.vue';
import { ref } from 'vue';

const props = defineProps({
  fileId: {
    type: String,
    requried: true
  }
});


const activeTab = ref('detail');
</script>

<style lang="scss" scoped></style>