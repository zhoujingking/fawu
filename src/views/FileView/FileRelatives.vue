<template>
  <div class="row file" v-for="file in fileList" :key="file.fileId" @click="onFileClick(file)">
    <div class="title" :title="file.fileName">{{ file.fileName }}</div>
    <div class="score">相关性：{{ file.relatedScore }}</div>
  </div>
  <NoData v-if="!fileList.length" text="暂无相关数据" />
</template>

<script setup>
import { sendPostRequest } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NoData from '@/components/NoData.vue';

const props = defineProps({
  fileId: {
    type: String,
    required: true,
  }
});

const getRelatives = async fileId => {
  try {
    const data = await sendPostRequest('/file/getRelatedFile', {
      fileId
    });
    return data.fileList || [];
  } catch {
    return [];
  }
}

const fileList = ref([]);

onMounted(() => {
  getRelatives(props.fileId).then(data => {
    fileList.value = data;
  })
})

const router = useRouter();

const onFileClick = file => {
  const route = router.resolve({
    name: 'file',
    query: {
      id: file.fileId
    }
  })
  window.open(route.href);
}
</script>

<style lang="scss" scoped>
.file {
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 12px;
  border: solid 1px var(--border-color);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: var(--link-hover-color);

    .title {
      color: var(--link-hover-color);
    }
  }

  .title {
    overflow: hidden;
    color: var(--link-color);
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .score {
    flex-shrink: 0;
    margin-left: 12px;
    color: var(--primary-text-color);
  }
}
</style>