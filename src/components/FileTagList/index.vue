<template>
  <div v-loading="isLoading">
    <div class="row tag" v-for="(tag, index) in tags" :key="tag.tagId">
      <div class="name" :title="tag.tagName">{{ tag.tagName }}</div>
      <div class="row ops">
        <!-- <el-icon class="icon" @click="onEdit(tag)">
        <Edit />
      </el-icon> -->
        <el-icon class="icon" @click="onDelete(tag)">
          <Delete />
        </el-icon>
      </div>
    </div>
    <div v-if="!tags.length" class="empty">
      暂无标签
    </div>
  </div>
  <el-button type="primary" size="small" :icon="Plus" @click="onNewTag">添加标签</el-button>
  <TagDialog v-if="dialogVisible" v-model="dialogVisible" :fileId="fileId" :type="actionType" @change="onTagDone" />
</template>

<script setup>
import { sendPostRequest } from '@/utils';
import {
  Delete,
  Plus,
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
})

const getTagList = async fileId => {
  try {
    const data = await sendPostRequest('/file/getFileTagList', {
      fileId
    });
    return data.tagList || [];
  } catch {
    return [];
  }
}

const deleteTag = async (fileId, tagName) => {
  return sendPostRequest('/tag/deleteTag4File', {
    fileId,
    tagName
  })
}

const populateTagList = async fileId => {
  isLoading.value = true;
  tags.value = await getTagList(fileId);
  isLoading.value = false;
}

const tags = ref([]);
const dialogVisible = ref(false);
const actionType = ref('new');
const isLoading = ref(false);

const onDelete = tag => {
  ElMessageBox.confirm(
    '您确定要删除当前标签吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        await deleteTag(props.fileId, tag.tagName);
        tags.value = tags.value.filter(item => item.tagId !== tag.tagId);
        ElMessage({
          type: 'success',
          message: '标签删除成功',
        });
      } catch (e) {
        ElMessage({
          type: 'error',
          message: '标签删除失败',
        });
      }
    })
}

const onNewTag = () => {
  actionType.value = 'new'
  dialogVisible.value = true;
}

const onTagDone = () => {
  populateTagList(props.fileId);
}

onMounted(() => {
  populateTagList(props.fileId);
})

</script>

<style lang="scss" scoped>
.tag {
  align-items: center;
  padding: 2px 6px;
  margin-bottom: 12px;
  border: solid 1px var(--border-color);

  &:hover {
    border-color: var(--link-color);
    .name, .icon {
      color: var(--link-color);
    }
  }

  .name {
    overflow: hidden;
    width: calc(100% - 22px);
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 22px;
  }

  .ops {
    justify-content: space-around;
    align-items: center;
    width: 22px;

    .icon {
      cursor: pointer;

      :hover {
        color: var(--link-hover-color);
      }
    }
  }
}

.empty {
  justify-content: center;
  align-items: center;
  height: 50px;
  color: var(--primary-text-color);
  // background-color: #F6F6F6;
}
</style>