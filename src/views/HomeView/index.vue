<template>
  <div class="row home-page">
    <div class="aside">
      <div class="header row">
        <span class="title">项目列表</span>
        <el-button class="new-btn" type="primary" size="small" :icon="Plus" @click="onNewProject">新建项目</el-button>
      </div>
      <div class="tree-container">
        <el-tree ref="treeRef" :data="treeData" highlight-current default-expand-all
          :props="nodeProps"
          node-key="id"
          :current-node-key="selectedNode?.id"
          @node-contextmenu="onContextMenu">
          <template #empty>
            <div class="empty-text">暂无项目</div>
            <div class="empty-text">您可以<span class="new-text" @click="onNewProject">新建项目</span></div>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="content">
      <FileTable />
    </div>
    <ProjectDialog v-if="projectDialogVisible" v-model="projectDialogVisible"
      :type="actionType"
      :data="selectedNode" 
      @change="onProjectDone" />
    <FolderDialog v-if="folderDialogVisible" v-model="folderDialogVisible"
      :type="actionType"
      :data="selectedNode" 
      @change="onFolderDone"
    />
    <UploadDialog v-if="uploadDialogVisible" v-model="uploadDialogVisible"
      :data="selectedNode" 
      @change="onUploadDone"
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
import UploadDialog from './UploadDialog.vue';
import TreeContextMenu from './TreeContextMenu.vue';
import FileTable from './FileTable.vue';
import { ref, nextTick } from 'vue';


const treeRef = ref(null);
const nodeProps = {
  label: 'name',
  children: 'children'
}
const projectDialogVisible = ref(false);
const folderDialogVisible = ref(false);
const uploadDialogVisible = ref(false);
const actionType = ref('new');

const onNewProject = () => {
  projectDialogVisible.value = true;
  actionType.value = 'new';
}

const onProjectDone = project => {
  if (actionType.value === 'new') {
    treeData.value.push(project)
    selectedNode.value = project;
  } else { // edit
    const targetProject = treeData.value.find(item => item.id === project.id);
    targetProject.name = project.name;
    targetProject.description = project.description;
  }
}

const onFolderDone = folder => {
  if (actionType.value === 'new') {
    selectedNode.value.children = selectedNode.value.children || [];
    selectedNode.value.children.push(folder);
    nextTick(() => {
      selectedNode.value = folder;
    });
  } else { // edit
    selectedNode.value.name = folder.name;
  }
}

const onUploadDone = () => {

}

const treeData = ref([
  {
    id: 1,
    name: '我的项目',
    description: '我的项目描述',
    children: [
      {
        id: 2,
        name: '目录1',
        children: [
          {
            id: 3,
            name: '目录1-1'
          }
        ]
      },
      {
        id: 4,
        name: '目录2'
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
  selectedNode.value = node;
  isContextMenuShow.value = true;
  contextMenuOptions.value = {
    x: e.x,
    y: e.y
  }
}


const onContextMenuClick = item => {
  const isProjectNode = treeData.value.map(node => node.name).includes(selectedNode.value.name);
  if (item === 'new') {
    actionType.value = 'new';
    folderDialogVisible.value = true;
  } else if (item === 'upload') {
    uploadDialogVisible.value = true;
  } else if (item === 'delete') {
    ElMessageBox.confirm(
      '您确定要删除当前节点吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      treeRef.value.remove(selectedNode.value);
      selectedNode.value = null;
      ElMessage({
        type: 'success',
        message: '节点删除成功',
      })
    })
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
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .06);
  // background-color: #f4f4f7;

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

  .empty-text {
    margin-top: 12px;
    .new-text {
      color: var(--primary-color);
      cursor: pointer;
    }
  }
}
.content {
  width: calc(100% - 300px);
  padding: 24px;
}
</style>