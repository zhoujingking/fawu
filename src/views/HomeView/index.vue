<template>
  <div class="row home-page">
    <div class="aside">
      <div class="header row">
        <span class="title">项目列表</span>
        <el-button class="new-btn" type="primary" size="small" :icon="Plus" @click="onNewProject">新建项目</el-button>
      </div>
      <div class="tree-container">
        <el-tree style="max-width: 600px" :data="treeData" highlight-current default-expand-all
          @node-contextmenu="onContextMenu" />
      </div>
    </div>
    <div class="content"></div>
    <ProjectDialog v-if="projectDialogVisible" v-model="projectDialogVisible"
      :type="actionType"
      :data="{ name: selectedNode?.label, description: selectedNode?.description }" 
      @change="onProjectDone" />
    <FolderDialog v-if="folderDialogVisible" v-model="folderDialogVisible"
      :type="actionType"
      :data="{ name: selectedNode?.label }" 
      @change="onFolderDone"
    />
    <TreeContextMenu v-model="isContextMenuShow" :options="contextMenuOptions" @click="onContextMenuClick" />
  </div>
</template>

<script setup>
import {
  Plus,
} from '@element-plus/icons-vue'
import ProjectDialog from './ProjectDialog.vue';
import FolderDialog from './FolderDialog.vue';
import TreeContextMenu from './TreeContextMenu.vue';
import { ref } from 'vue';

const projectDialogVisible = ref(false);
const folderDialogVisible = ref(false);

const onNewProject = () => {
  projectDialogVisible.value = true;
}

const onProjectDone = project => {
  console.log(project)
}

const onFolderDone = folder => {
  console.log(folder)
}

const treeData = ref([
  {
    label: '我的项目',
    description: '我的项目描述',
    children: [
      {
        label: '目录1',
        children: [
          {
            label: '目录1-1'
          }
        ]
      },
      {
        label: '目录2'
      }
    ]
  },
  {
    label: '我的项目2',
    description: '我的项目描述',
    children: [
      {
        label: '目录1',
        children: [
          {
            label: '目录1-1'
          }
        ]
      },
      {
        label: '目录2'
      }
    ]
  },
  {
    label: '生成项目',
    description: '生成项目描述',
    children: [
      {
        label: '目录1',
        children: [
          {
            label: '目录1-1'
          }
        ]
      },
      {
        label: '目录2'
      }
    ]
  },
  {
    label: '生成项目2',
    description: '生成项目描述',
    children: [
      {
        label: '目录1',
        children: [
          {
            label: '目录1-1'
          }
        ]
      },
      {
        label: '目录2',
        children: [
          {
            label: '目录2-1',
            children: [
              {
                label: '目录2-1-1',
                children: [
                  {
                    label: '目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1',
                    children: [
                      {
                        label: '目录2-1',
                        children: [
                          {
                            label: '目录2-1-1',
                            children: [
                              {
                                label: '目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1目录2-1-1-1'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
])

const isContextMenuShow = ref(false)
const contextMenuOptions = ref({
  x: 0,
  y: 0
});
const selectedNode = ref(null);
const onContextMenu = (e, node) => {
  console.log(node)
  selectedNode.value = node;
  isContextMenuShow.value = true;
  contextMenuOptions.value = {
    x: e.x,
    y: e.y
  }
}

const actionType = ref('new');
const onContextMenuClick = item => {
  const isProjectNode = treeData.value.map(node => node.label).includes(selectedNode.value.label);
  if (item === 'new') {
    actionType.value = 'new';
    folderDialogVisible.value = true;
  } else if (item === 'upload') {

  } else if (item === 'delete') {

  } else if (item === 'edit') {
    actionType.value = 'edit';
    if (isProjectNode) {
      projectDialogVisible.value = true;
    } else {
      folderDialogVisible.value = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}

.aside {
  width: 300px;

  // background: cyan;
  .header {
    justify-content: space-between;
    align-items: center;
    height: 54px;
    padding: 12px;
    border-bottom: solid 1px var(--border-color);

    .title {
      font-size: 20px;
      color: var(--primary-color);
    }
  }

  .tree-container {
    overflow: auto;
    height: calc(100% - 54px);
    padding: 12px 20px;
  }
}
</style>