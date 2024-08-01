<template>
  <div class="row home-page">
    <div class="aside">
      <div class="header row">
        <span class="title">项目列表</span>
        <el-button class="new-btn" type="primary" size="small" :icon="Plus" @click="onNewProject">新建项目</el-button>
      </div>
      <div class="project-container" :class="{ hasTags: !!folderTags.length }">
        <div class="tree-container">
          <el-tree ref="treeRef" :data="treeData" highlight-current default-expand-all :props="nodeProps" node-key="id"
            :current-node-key="selectedNode?.id" @node-click="onNodeClick" @node-contextmenu="onContextMenu">
            <template #empty>
              <div class="empty-text">暂无项目</div>
              <div class="empty-text">您可以<span class="new-text" @click="onNewProject">新建项目</span></div>
            </template>
          </el-tree>
        </div>
        <div class="tags" v-if="folderTags.length">
          <div class="tag" :class="{ active: selectTag.id === tag.id }" v-for="tag in folderTags" :key="tag.id"
            @click="onTagClick(tag)">{{
          tag.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-loading="isLoading" element-loading-text="加载中">
      <FileTable :data="fileList" />
    </div>
    <ProjectDialog v-if="projectDialogVisible" v-model="projectDialogVisible" :type="actionType" :data="selectedNode"
      @change="onProjectDone" />
    <FolderDialog v-if="folderDialogVisible" v-model="folderDialogVisible" :type="actionType" :data="selectedNode"
      @change="onFolderDone" />
    <UploadDialog v-if="uploadDialogVisible" v-model="uploadDialogVisible" :data="selectedNode"
      @change="onUploadDone" />
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
import FileTable from '@/components/FileTable.vue';
import { ref, nextTick, computed } from 'vue';
import { ElLoading } from 'element-plus';
import { sendPostRequest } from '@/utils';

const getProjectList = async () => {
  const data = await sendPostRequest('/project/getProjectList');
  return (data?.projectList || []).map(proj => ({
    name: proj.projectName,
    id: proj.projectId,
    type: 'project'
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
    type: 'folder'
  }))
}

const getFileListByTag = async folderId => {
  return [
    {
      id: 1,
      title: '如果你确实需要使用',
      author: '周树人',
      date: '2024-07-12 13:23:21',
      rate: 0
    }
  ]
}
const getFileListByFolder = async tagId => {
  return [
    {
      id: 1,
      title: '如果你确实需要使用',
      author: '周树人',
      date: '2024-07-12 13:23:21',
      rate: 2
    },
    {
      id: 2,
      title: '通常不建议这样做，因为它违背了Spring Boot的“约定优于配置”的原则，并且可能引入不必要的复杂性',
      author: '周树人',
      date: '2024-07-12',
      rate: 4
    },
  ]
}

const populateFileList = async (id, type = 'folder') => {
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: '加载中',
  // });
  isLoading.value = true;
  const request = type === 'folder' ? getFileListByFolder : getFileListByTag;
  setTimeout(() => {
    request(id).then(data => {
      fileList.value = data;
    })
    isLoading.value = false;
    // loading.close()
  }, 2000)
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
const isLoading = ref(false);

getProjectList().then(data => {
  treeData.value = data;
});

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

const onNodeClick = (node, treeNode) => {
  if (selectedNode.value?.id !== node.id && selectedNode.value?.type === node.type) {
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

const folderTags = computed(() => {
  if (selectedNode.value?.type === 'folder') {
    return [
      {
        id: 1,
        name: 'test-tagafasdf'
      },
      {
        id: 2,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 3,
        name: 'test-tagafasdf'
      },
      {
        id: 4,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 11,
        name: 'test-tagafasdf'
      },
      {
        id: 21,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 31,
        name: 'test-tagafasdf'
      },
      {
        id: 41,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 42,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 121,
        name: 'test-tagafasdf'
      },
      {
        id: 221,
        name: 'tagsfasdfsdaf'
      },
      {
        id: 321,
        name: 'test-tagafasdf'
      },
      {
        id: 421,
        name: 'tagsfasdfsdaf'
      }
    ]
  }
  return [];
})

const onTagClick = tag => {
  if (selectTag.value?.id !== tag.id) {
    selectTag.value = tag;
    // TODO: search file list by tag
    populateFileList(tag.id, 'tag');
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
  if (selectedNode.value?.id !== node.id) {
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
      .then(async () => {
        await deleteProject(selectedNode.value.id)
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