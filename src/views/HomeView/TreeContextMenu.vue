<template>
  <context-menu v-model:show="isContextMenuShow" :options="options">
    <context-menu-item label="新增文件夹" @click="emit('click', 'new')">
      <template #icon>
        <el-icon>
          <Folder />
        </el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="上传文件" @click="emit('click', 'upload')">
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

import { defineProps, defineModel, defineEmits } from 'vue';

defineProps({
  options: Object
})

const emit = defineEmits(['click'])

const isContextMenuShow = defineModel({
  required: true
})

</script>

<style lang="scss" scoped></style>