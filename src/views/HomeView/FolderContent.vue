<template>
  <div class="ops row">
    <el-button type="primary" :icon="Upload" @click="emits('upload')">上传文件</el-button>
  </div>
  <splitpanes class="default-theme">
    <pane size="80" style="background-color: white;">
      <FileTable :data="data" @row-click="onFileClick" />
    </pane>
    <pane size="20" style="background-color: #f5f7fa;">
      <div class="aside">
        <FilePane v-if="selectedFile?.fileId" :fileId="selectedFile?.fileId" />
        <NoData class="no-data" v-else text="暂无选中文件"></NoData>
      </div>
    </pane>
  </splitpanes>
</template>

<script setup>
import {
  Upload
} from '@element-plus/icons-vue'
import FilePane from './FilePane.vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import NoData from '@/components/NoData.vue';
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    requried: true
  }
});
const emits = defineEmits(['upload']);


const selectedFile = ref({});
const onFileClick = (file) => {
  selectedFile.value = file;
}
</script>

<style lang="scss" scoped>
.ops {
  justify-content: flex-end;
  margin-bottom: 12px;
}

.aside {
  padding: 0 12px;
  .no-data {
    margin-top: 12px;
  }
}
</style>