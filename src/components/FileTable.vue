<template>
  <el-table :data="data" :border="true" stripe highlight-current-row :header-cell-style="headerCellStyle" empty-text="暂无文件" @row-click="onRowClick">
    <el-table-column v-for="col in columns" :key="col.name" :prop="col.name" :label="col.label" :width="col.width">
      <template #default="scope">
        <div v-if="scope.column.property === 'createTimestamp'">{{ formatDate(scope.row[scope.column.property]) }}</div>
        <div v-else-if="scope.column.property === 'star'">
          <el-rate v-model="scope.row.star" @change="onRateChange(scope.row)" />
        </div>
        <div v-else-if="scope.column.property === 'fileTitle'">
          <span class="title" @click="onRowNav(scope.row)">{{ scope.row.fileTitle }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-if="showFileDetail" v-model="showFileDetail" :with-header="false">
    <el-tabs class="tabs" v-model="activeTab" lazy>
      <el-tab-pane label="详情" name="detail">
        <FileAbstract :fileId="currRow?.fileId" />
      </el-tab-pane>
      <el-tab-pane label="标签" name="abstract">
        <FileTagList :fileId="currRow?.fileId" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FileAbstract from '@/components/FileAbstract.vue';
import FileTagList from '@/components/FileTagList/index.vue';
import { sendPostRequest, formatDate } from '@/utils';

const props = defineProps({
  data: {
    type: Array,
    requried: true
  }
});

const columns = [
  {
    name: 'fileTitle',
    label: '标题'
  },
  {
    name: 'author',
    label: '作者'
  },
  {
    name: 'createTimestamp',
    label: '日期',
    width: 150,
  },
  {
    name: 'star',
    label: '星级',
    width: 140,
  },
]

const currRow = ref();
const showFileDetail = ref(false);
const activeTab = ref('detail');
const router = useRouter();

const headerCellStyle = {
  height: '34px',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#F6F6F6'
}

const onRowClick = row => {
  currRow.value = row;
  showFileDetail.value = true;
}
const onRowNav = row => {
  const route = router.resolve({
    name: 'file',
    query: {
      id: row.fileId
    }
  });
  window.open(route.href, '_blank');
}

const onRateChange = (file) => {
  try {
    sendPostRequest('file/starFile', {
      fileId: file.fileId,
      star: file.star
    })
  } catch (e) {
    ElMessage({
      message: `星级评级失败: ${e.message}`,
      type: 'error',
    })
  }
}

</script>

<style lang="scss" scoped>
.title {
  color: var(--link-color);
  cursor: pointer;
}
</style>