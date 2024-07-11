<template>
  <div class="row tag" v-for="(tag, index) in tags" :key="index">
    <div class="name" :title="tag.name">{{ tag.name }}</div>
    <div class="row ops">
      <el-icon class="icon" @click="onEdit(tag)">
        <Edit />
      </el-icon>
      <el-icon class="icon" @click="onDelete(tag)">
        <Delete />
      </el-icon>
    </div>
  </div>
  <el-button type="primary" size="small" :icon="Plus" @click="onNewTag">添加标签</el-button>
  <TagDialog v-if="dialogVisible" v-model="dialogVisible" :data="currTag" :type="actionType" @change="onTagDone" />
</template>

<script setup>
import {
  Edit,
  Delete,
  Plus,
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

console.log(props.data)

const tags = ref(props.data?.tags || [])
const dialogVisible = ref(false)
const currTag = ref(null)
const actionType = ref('new');

const onEdit = (tag) => {
  currTag.value = tag;
  actionType.value = 'edit';
  dialogVisible.value = true;
}

const onDelete = tag => {
  currTag.value = tag;
  ElMessageBox.confirm(
      '您确定要删除当前标签吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      tags.value = tags.value.filter(item => item.id !== tag.id);
      currTag.value = null;
      ElMessage({
        type: 'success',
        message: '标签删除成功',
      })
    })
}

const onNewTag = () => {
  actionType.value = 'new'
  dialogVisible.value = true;
}

const onTagDone = tag => {
  tags.value.push(tag);
}

</script>

<style lang="scss" scoped>
.tag {
  align-items: center;
  padding: 2px 6px;
  margin-bottom: 12px;
  border: solid 1px var(--border-color);
  .name {
    overflow: hidden;
    width: calc(100% - 42px);
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 22px;
  }
  .ops {
    justify-content: space-around;
    align-items: center;
    width: 42px;

    .icon {
      cursor: pointer;
      :hover {
        color: var(--link-color);
      }
    }
  }
}
</style>