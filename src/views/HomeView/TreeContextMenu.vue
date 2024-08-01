<template>
  <context-menu v-model:show="isContextMenuShow" :options="options">
    <context-menu-item label="新增文件夹" @click="emit('click', 'new')">
      <template #icon>
        <el-icon>
          <Folder />
        </el-icon>
      </template>
    </context-menu-item>
    <context-menu-item v-if="type === 'folder'" label="上传文件" @click="emit('click', 'upload')">
      <template #icon>
        <el-icon>
          <Upload />
        </el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="删除" @click="emit('click', 'delete')">
      <template #icon>
        <el-icon>
          <Delete />
        </el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="编辑" @click="emit('click', 'edit')">
      <template #icon>
        <el-icon>
          <Edit />
        </el-icon>
      </template>
    </context-menu-item>
  </context-menu>
</template>

<script setup>
import {
  Delete,
  Edit,
  Folder,
  Upload
} from '@element-plus/icons-vue'
import { ContextMenu, ContextMenuItem } from '@imengyu/vue3-context-menu'

const props = defineProps({
  options: Object,
  type: String
});

console.log(props.type)

const emit = defineEmits(['click'])

const isContextMenuShow = defineModel({
  required: true
})

</script>

<style lang="scss" scoped></style>