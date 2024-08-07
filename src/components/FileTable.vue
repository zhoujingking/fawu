<template>
  <el-table :data="data" max-height="100%" :border="true" stripe highlight-current-row :header-cell-style="headerCellStyle"
    empty-text="暂无文件" @row-click="emits('row-click', $event)">
    <el-table-column v-for="col in columns" :key="col.name" :prop="col.name" :label="col.label" :width="col.width"
      :sortable="col.sortable">
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
</template>

<script setup>
import { useRouter } from 'vue-router';
import { sendPostRequest, formatDate } from '@/utils';

const props = defineProps({
  data: {
    type: Array,
    requried: true
  }
});
const emits = defineEmits(['row-click']);

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
    sortable: true,
  },
  {
    name: 'star',
    label: '星级',
    width: 140,
  },
]

const router = useRouter();

const headerCellStyle = {
  height: '34px',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#F6F6F6'
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