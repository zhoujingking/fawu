<template>
  <div>
    <div class="header tr row">
      <div class="td title">标题</div>
      <div class="td author">作者</div>
      <div class="td date">添加时间</div>
      <div class="td star">星级</div>
    </div>
    <div class="body">
      <div class="tr row" :class="{ selected: row.id === currRow?.id }" v-for="(row, index) in data" :key="index"
        @click="onRowClick(row)">
        <div class="td title" :title="row.title">
          <span @click="onRowNav(row)">{{ row.title }}</span>
        </div>
        <div class="td author">{{ row.author }}</div>
        <div class="td date">{{ row.date }}</div>
        <div class="td star">
          <el-rate v-model="row.rate" @change="onRateChange" />
        </div>
      </div>
    </div>
  </div>
  <el-drawer v-model="showFileDetail" :with-header="false">
    <el-tabs class="tabs" v-model="activeTab" lazy>
      <el-tab-pane label="详情" name="detail">
        <FileAbstract :data="currRow"/> 
      </el-tab-pane>
      <el-tab-pane label="概览" name="abstract">
        <FileTagList />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FileAbstract from '@/components/FileAbstract.vue'
import FileTagList from '@/components/FileTagList/index.vue'

const data = ref([
  {
    id: 1,
    title: '如果你确实需要使用',
    author: '周树人',
    date: '2024-07-12 13:23:21',
    rate: 2
  },
  {
    id: 2,
    title: '通常不建议这样做，因为它违背了Spring Boot的“约定优于配置”的原则，并且可能引入不必要的复杂性',
    author: '周树人',
    date: '2024-07-12',
    rate: 4
  },
])

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
      id: row.id
    }
  })
  // currRow.value = row;
  // showFileDetail.value = true;
}

const onRateChange = () => {
  console.log('TODO')
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