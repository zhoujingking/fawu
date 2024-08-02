<template>
  <div class="row home-page">
    <div class="aside">
      <div class="header row">
        <span class="title">项目列表</span>
        <el-button class="new-btn" type="primary" size="small" :icon="Plus" @click="onNewProject">新建项目</el-button>
      </div>
      <div class="project-container" :class="{ hasTags: !!folderTags.length }">
        <div class="tree-container" v-loading="isTreeLoading" element-loading-text="加载中">
          <el-tree ref="treeRef" :data="treeData" highlight-current default-expand-all :props="nodeProps"
            node-key="uniqueId" :current-node-key="selectedNode?.uniqueId" @node-click="onNodeClick"
            @node-contextmenu="onContextMenu">
            <template #empty>
              <div class="empty-text">暂无项目</div>
              <div class="empty-text">您可以<span class="new-text" @click="onNewProject">新建项目</span></div>
            </template>
          </el-tree>
        </div>
        <div class="tags" v-if="folderTags.length">
          <div class="tag" :class="{ active: selectTag.tagId === tag.tagId }" v-for="tag in folderTags" :key="tag.tagId"
            @click="onTagClick(tag)">{{
          tag.tagName }}
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-loading="isFileListLoading" element-loading-text="加载中">
      <FileTable :data="fileList" v-if="selectedNode?.type === 'folder'"/>
    </div>
    <ProjectDialog v-if="projectDialogVisible" v-model="projectDialogVisible" :type="actionType" :data="selectedNode"
      @change="onProjectDone" />
    <FolderDialog v-if="folderDialogVisible" v-model="folderDialogVisible" :type="actionType" :data="selectedNode"
      @change="onFolderDone" />
    <UploadDialog v-if="uploadDialogVisible" v-model="uploadDialogVisible" :data="selectedNode"
      @change="onUploadDone" />
    <TreeContextMenu v-if="isContextMenuShow" v-model="isContextMenuShow" :options="contextMenuOptions"
      :type="selectedNode?.type" @click="onContextMenuClick" />
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
import FileTable from '@/components/FileTable.vue';
import { ref, nextTick, onMounted } from 'vue';
import { sendPostRequest } from '@/utils';

const getProjectList = async () => {
  const data = await sendPostRequest('/project/getProjectList');
  return (data?.projectList || []).map(proj => ({
    name: proj.projectName,
    id: proj.projectId,
    type: 'project',
    description: proj.description,
    uniqueId: `project-${proj.projectId}`
  }));
}

const deleteProject = async (id) => {
  return sendPostRequest('/project/deleteProject', {
    projectId: id
  })
}

const getFolderDetail = async id => {
  return sendPostRequest('/folder/getFolderDetails', {
    folderId: id
  });
}

const deleteFolder = async id => {
  return sendPostRequest('/folder/deleteFolder', {
    folderId: id
  })
}

const getFolderList = async (id, type = 'folder') => {
  let list = [];
  if (type === 'folder') {
    const data = await getFolderDetail(id);
    list = data.folderList || [];
  } else {
    const data = await sendPostRequest('/project/getProjectDetails', {
      projectId: id
    })

    list = data.folderLit || [];
  }

  return list.map(folder => ({
    id: folder.folderId,
    name: folder.folderName,
    type: 'folder',
    uniqueId: `folder-${folder.folderName}`
  }))
}

const getFileListByTag = async tagId => {
  try {
    const data = await sendPostRequest('/file/searchFile', {
      tagId
    });
    return data.fileList || [];
  } catch {
    return [];
  }
}
const getFileListByFolder = async id => {
  const data = await getFolderDetail(id);
  return data.fileList || [];
}

const populateFileList = async (id, type = 'folder') => {
  isFileListLoading.value = true;
  const request = type === 'folder' ? getFileListByFolder : getFileListByTag;
  fileList.value = await request(id);
  isFileListLoading.value = false;
}

const treeRef = ref(null);
const nodeProps = {
  label: 'name',
  children: 'children'
}
const projectDialogVisible = ref(false);
const folderDialogVisible = ref(false);
const uploadDialogVisible = ref(false);
const actionType = ref('new');
const treeData = ref([]);
const selectedNode = ref(null);
const selectTag = ref({});
const fileList = ref([]);
const folderTags = ref([]);
const isFileListLoading = ref(false);
const isTreeLoading = ref(false);

onMounted(() => {
  isTreeLoading.value = true;
  getProjectList().then(data => {
    treeData.value = data;
    isTreeLoading.value = false
  }).catch(() => {
    isTreeLoading.value = false;
  });
})

const onNewProject = () => {
  projectDialogVisible.value = true;
  actionType.value = 'new';
}

const onProjectDone = project => {
  if (actionType.value === 'new') {
    const newProject = {
      ...project,
      type: 'project',
      uniqueId: `project-${project.id}`
    }
    treeData.value.push(newProject)
    selectedNode.value = newProject;
  } else { // edit
    const targetProject = treeData.value.find(item => item.id === project.id);
    targetProject.name = project.name;
    targetProject.description = project.description;
  }
}

const onFolderDone = folder => {
  if (actionType.value === 'new') {
    const newFolder = {
      ...folder,
      type: 'folder',
      uniqueId: `folder-${folder.id}`
    }
    selectedNode.value.children = selectedNode.value.children || [];
    selectedNode.value.children.push(newFolder);
    nextTick(() => {
      selectedNode.value = newFolder;
    });
  } else { // edit
    selectedNode.value.name = folder.name;
  }
}

const onUploadDone = () => {
  populateFileList(selectedNode.value.id, 'folder');
}

const onNodeClick = (node) => {
  if (node.type === 'folder') {
    getFolderDetail(node.id).then(data => {
      folderTags.value = data?.tagList || [];
    })
  }
  if (selectedNode.value?.id !== node.id || selectedNode.value?.type !== node.type) {
    selectedNode.value = node;
    selectTag.value = {};
    if (node.type === 'folder') {
      populateFileList(node.id, node.type);
    }
  }
  const type = node.type;
  node.children = node.children || [];
  if (!node.children.length) {
    getFolderList(node.id, type).then(data => {
      node.children = data;
    });
  }
}


const onTagClick = tag => {
  if (selectTag.value?.tagId !== tag.tagId) {
    selectTag.value = tag;
    populateFileList(tag.tagId, 'tag');
  } else {
    selectTag.value = {};
    populateFileList(selectedNode.value.id, 'folder');
  }
}

// context menu
const isContextMenuShow = ref(false)
const contextMenuOptions = ref({
  x: 0,
  y: 0
});
const onContextMenu = (e, node) => {
  if (selectedNode.value?.id !== node.id || selectedNode.value?.type !== node.type) {
    selectedNode.value = node;
    selectTag.value = {};
  }
  isContextMenuShow.value = true;
  contextMenuOptions.value = {
    x: e.x,
    y: e.y
  }
}
const onContextMenuClick = item => {
  const isProjectNode = selectedNode.value.type === 'project';
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
      .then(async () => {
        if (isProjectNode) {
          await deleteProject(selectedNode.value.id);
          ElMessage({
            type: 'success',
            message: '项目删除成功',
          })
        } else {
          await deleteFolder(selectedNode.value.id);
          ElMessage({
            type: 'success',
            message: '文件夹删除成功',
          })
        }

        treeRef.value.remove(selectedNode.value);
        selectedNode.value = null;

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
      color: var(--link-color);
    }
  }

  .project-container {
    height: calc(100% - 54px);

    &.hasTags>.tree-container {
      height: calc(100% - 100px);
    }

    .tree-container {
      overflow: auto;
      height: 100%;
      padding: 12px 20px;

      .empty-text {
        margin-top: 12px;

        .new-text {
          color: var(--link-color);
          cursor: pointer;
        }
      }
    }

    .tags {
      overflow: auto;
      position: relative;
      // flex-wrap: wrap;
      width: 100%;
      height: 100px;
      padding: 12px 12px 8px 12px;
      background-color: white;
      box-shadow: 10px 0 10px 6px rgba(0, 0, 0, .06);

      .tag {
        float: left;
        padding: 2px 4px;
        margin-right: 12px;
        margin-bottom: 4px;
        font-size: 12px;
        border: solid 1px var(--border-color);
        border-radius: 4px;
        background-color: white;
        cursor: pointer;

        &:hover {
          color: var(--link-color);
          border-color: var(--link-color);
        }

        &.active {
          color: white;
          background-color: var(--link-color);
        }
      }
    }
  }
}

.content {
  width: calc(100% - 300px);
  padding: 24px;
}
</style>