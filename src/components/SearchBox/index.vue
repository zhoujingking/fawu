<template>
  <el-input class="search-box" v-model="searchText" placeholder="请输入搜索内容" :suffix-icon="Search" @keyup.enter="onSearch" />
  <SearchDialog v-if="dialogVisible" v-model="dialogVisible" :searchText="searchText"/>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';

const searchText = ref('');
const dialogVisible = ref(false);

const onSearch = () => {
  if (searchText.value) {
    dialogVisible.value = true;
  }
}

</script>

<style scoped lang="scss">
.search-box {
  width: 200px;
}
</style>