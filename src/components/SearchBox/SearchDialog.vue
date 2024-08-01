<template>
  <el-dialog v-model="dialogVisible" title="搜索" align-center width="90%">
    <div v-loading="isLoading">
      <FileTable :data="fileList" />
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FileTable from '../FileTable.vue';
import { sendPostRequest } from '@/utils';

const props = defineProps({
  searchText: String
});
const emit = defineEmits(['change']);

const dialogVisible = defineModel({
  type: Boolean,
  required: true
});
const isLoading = ref(false);
const fileList = ref([]);

const searchFileList = async searchText => {
  const data = await sendPostRequest('/file/searchFile', {
    keyword: searchText
  });
  return data.fileList || [];
};

onMounted(() => {
  isLoading.value = true;
  searchFileList(props.searchText).then(data => {
    fileList.value = data;
    isLoading.value = false;
  }).catch(() => {
    isLoading.value = false;
  })
})
</script>

<style lang="scss" scoped></style>