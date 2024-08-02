<template>
  <el-dialog v-model="dialogVisible" :title="title" width="500" align-center :close-on-press-escape="false" :close-on-click-modal="false">
    <el-form class="form" ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="auto"
      @submit.prevent>
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入目录名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" :disabled="isLoading" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm" :loading="isLoading">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { sendPostRequest } from '@/utils';

const createFolder = async (id, name, type = 'folder') => {
  const payLoad = {
    folderName: name,
  };
  if (type === 'folder') {
    payLoad.parentFolderId = id;
  } else {
    payLoad.projectId = id;
  }
  return sendPostRequest('/folder/addFolder', payLoad);
}

const updateFolder = async (id, name) => {
  return sendPostRequest('folder/renameFolder', {
    folderId: id,
    newFolderName: name
  })
}

const props = defineProps({
  data: Object,
  type: String
})

console.log(props.data)

const emit = defineEmits(['change'])

const dialogVisible = defineModel({
  type: Boolean,
  required: true
})

const title = computed(() => {
  return props.type === 'new' ? '新建目录' : '编辑目录';
})

const formRef = ref();
const form = ref({
  name: props.type === 'new' ? '' : props.data?.name,
});

const formRules = reactive({
  name: [
    { required: true, message: '目录名称不能为空', trigger: 'blur' },
  ]
});

const isLoading = ref(false);

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = () => {
  formRef.value.validate(async isValid => {
    if (isValid) {
      isLoading.value = true;
      let folderId = '';
      if (props.type === 'new') {
        const data = await createFolder(props.data.id, form.value.name, props.data.type);
        folderId = data.folderId;
      } else {
        await updateFolder(props.data.id, form.value.name);
        folderId = props.data.id;
      }
      dialogVisible.value = false;
      emit('change', {
        id: folderId,
        ...form.value
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>