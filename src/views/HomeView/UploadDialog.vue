<template>
  <el-dialog v-model="dialogVisible" title="上传文件" width="500" align-center :close-on-press-escape="false" :close-on-click-modal="false">
    <ElUpload class="upload" ref="uploadRef" :auto-upload="false" drag multiple :accept="fileExtensions"
      :limit="maxNumOfFiles" :file-list="fileList" @change="onFileChange" @remove="onFileRemove" @exceed="onExceed">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件或 <em>点击上传</em>
      </div>
    </ElUpload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" :disabled="isLoading" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在上传">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  UploadFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { getAuthToken, getUserInfoFromStorage } from '@/utils';

const props = defineProps({
  data: Object,
  type: String
});

const emit = defineEmits(['change'])

const fileExtensions = '.doc,.docx,.pdf,.xlsx,.csv,.pptx,.html,.htm,.txt';
const maxNumOfFiles = 5;
const fileSizeLimit = 10; // M

const fileList = ref([]);

const dialogVisible = defineModel({
  type: Boolean,
  required: true
});

const isLoading = ref(false);

const uploadFiles = async (id, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify({
    folderId: id
  }));
  const userInfo = getUserInfoFromStorage();
  const context = {
    userId: userInfo?.userId || '',
    token: getAuthToken() || '',
    traceId: uuid()
  };
  formData.append('context', JSON.stringify(context));
  files.forEach(file => formData.append('files', file));
  const { data } = await axios(
    {
      url: '/file/uploadFile',
      method: 'post',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (data.code === 0) {
    return data.result || {};
  }
  throw new Error(data.msg);
}

const onFileChange = (file, listOfFile) => {
  const isLt10M = file.size / 1024 / 1024 < fileSizeLimit;
  if (!isLt10M) {
    fileList.value = listOfFile.filter(item => item.uuid !== file.uuid);

    ElMessage({
      message: `文件大小不能超过${fileSizeLimit}MB`,
      type: 'error'
    })
  } else {
    fileList.value = listOfFile;
  }
};

const onFileRemove = (file, fileList) => {
  fileList.value = fileList;
}


const onExceed = () => {
  ElMessage({
    message: `最多同时上传${maxNumOfFiles}个文件个`,
    type: 'error'
  })
};

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = async () => {
  isLoading.value = true;
  try {
    const files = fileList.value.map(item => item.raw);
    await uploadFiles(props.data.id, files);
    ElMessage({
      message: `文件上传成功`,
      type: 'success'
    });
    isLoading.value = false;
    dialogVisible.value = false;
    emit('change');
  } catch(e) {
    ElMessage({
      message: `文件上传失败 (${e.message})`,
      type: 'error'
    })
  }
}
</script>

<style lang="scss" scoped></style>