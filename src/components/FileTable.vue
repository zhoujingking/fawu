<template>
  <div>
    <div class="header tr row">
      <div class="td title">标题</div>
      <div class="td author">作者</div>
      <div class="td date">添加时间</div>
      <div class="td star">星级</div>
    </div>
    <div class="body">
      <div class="tr row" :class="{ selected: row.fileId === currRow?.fileId }" v-for="(row, index) in data" :key="index"
        @click="onRowClick(row)">
        <div class="td title" :title="row.fileTitle">
          <span @click="onRowNav(row)">{{ row.fileTitle }}</span>
        </div>
        <div class="td author">{{ row.author }}</div>
        <div class="td date">{{ displayDate(row.createTimestamp) }}</div>
        <div class="td star" @click.stop>
          <el-rate v-model="row.star" @change="onRateChange(row)" />
        </div>
      </div>
      <div class="empty row" v-if="!data.length">文件夹中暂无文件</div>
    </div>
  </div>
  <el-drawer v-if="showFileDetail" v-model="showFileDetail" :with-header="false">
    <el-tabs class="tabs" v-model="activeTab" lazy>
      <el-tab-pane label="详情" name="detail">
        <FileAbstract :data="currRow"/> 
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
import dayjs from 'dayjs';
import { sendPostRequest } from '@/utils';

const props = defineProps({
  data: {
    type: Array, 
    requried: true
  }
})

const currRow = ref();
const showFileDetail = ref(false);
const activeTab = ref('detail');
const router = useRouter();

const onRowClick = row => {
  currRow.value = row;
  showFileDetail.value = true;
}
const onRowNav = row => {
  router.push({
    name: 'file',
    query: {
      id: row.fileId
    }
  })
  // currRow.value = row;
  // showFileDetail.value = true;
}

const onRateChange = (file) => {
  try {
    sendPostRequest('file/starFile', {
      fileId: file.fileId,
      star: file.star
    })
  } catch(e) {
    ElMessage({
      message: `星级评级失败: ${e.message}`,
      type: 'error',
    })
  }
}

const displayDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
}
</script>

<style lang="scss" scoped>
.header {
  height: 34px;
  font-size: 18px;
  font-weight: bold;
  background-color: #F6F6F6;
  line-height: 1;
}

.body {
  .tr {
    border: solid 1px #ebeef5;

    &:hover {
      background-color: #EFF4FF;
    }

    // &.selected {
    //   background-color: #EFF4FF;
    //   color: var(--link-color);
    // }

    .title {
      color: var(--link-color);
      cursor: pointer;
    }
  }
  .empty {
    justify-content: center;
    align-items: center;
    height: 100px;
    color: var(--primary-text-color);
    // background-color: #F6F6F6;
  }
}

.td {
  overflow: hidden;
  flex-shrink: 0;
  padding: 4px 6px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tr {
  align-items: center;
}

.title {
  flex: 1;
}

.author {
  width: 100px;
}

.date {
  width: 160px;
}

.star {
  width: 128px;
}
</style>