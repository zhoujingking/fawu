<template>
  <el-dialog v-model="dialogVisible" title="上传文件" width="500" align-center>
    <ElUpload class="upload" ref="uploadRef" :auto-upload="false" drag multiple :accept="fileExtensions" :limit="maxNumOfFiles" @change="onFileChange"
      @exceed="onExceed">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件或 <em>点击上传</em>
      </div>
    </ElUpload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
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
import { ref, defineModel, reactive, defineProps, computed } from 'vue';

const props = defineProps({
  data: Object,
  type: String
})


const emit = defineEmits(['change'])

const fileExtensions = '.doc,.docx,.pdf,.xlsx,.csv,.txt';
const maxNumOfFiles = 5;

const dialogVisible = defineModel({
  type: Boolean,
  required: true
});

const isLoading = ref(false);

const onFileChange = files => {
  console.log(files)
};

const onExceed = () => {
  ElMessage({
    message: `文件总数不能超过${maxNumOfFiles}个，请重新选择`,
    type: 'error'
  })
};

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = () => {
  isLoading.value = true;
  setTimeout(() => {
    ElMessage({
    message: `文件上传成功`,
    type: 'success'
  })
    isLoading.value = false;
    dialogVisible.value = false;
  }, 3000);
  
}
</script>

<style lang="scss" scoped></style>