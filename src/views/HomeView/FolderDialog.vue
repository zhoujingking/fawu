<template>
  <el-dialog v-model="dialogVisible" :title="title" width="500" align-center>
    <el-form class="form" ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="auto"
      @submit.prevent>
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入目录名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm" :loading="isLoading">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';

const props = defineProps({
  data: Object,
  type: String
})


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
const store = useProjectStore();
const { projectList } = storeToRefs(store);

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = () => {
  formRef.value.validate(isValid => {
    if (isValid) {
      // isLoading.value = true;
      dialogVisible.value = false;
      emit('change', {
        id: props.type === 'new' ? `id-${form.value.name}` : props.data?.id,
        ...form.value
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>