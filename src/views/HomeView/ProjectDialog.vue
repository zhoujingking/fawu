<template>
  <el-dialog v-model="dialogVisible" :title="title" width="500" align-center>
    <el-form class="form" ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="auto"
      @submit.prevent>
      <el-form-item label="项目名称" prop="name">
        <el-input type="text" v-model="form.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="请输入项目描述" resize="horizontal" :max-length="200"
          :rows="10" show-word-limit :input-style="{ height: '200px' }" />
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
import { ref, defineModel, reactive, defineProps, computed } from 'vue';
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
  return props.type === 'new' ? '新建项目' : '编辑项目';
})

const formRef = ref();
const form = ref({
  name: props.type === 'new' ? '' : props.data?.name,
  description: props.type === 'new' ? '' : props.data?.description
});

const formRules = reactive({
  name: [
    { required: true, message: '项目名称不能为空', trigger: 'blur' },
  ],
  description: [
    {
      required: true,
      message: '项目描述不能为空',
      trigger: 'blur',
    },
  ]
});

const isLoading = ref(false);
const store = useProjectStore();
const { projectList } = storeToRefs(store);

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = () => {
  console.log('safasdf')
  formRef.value.validate(isValid => {
    if (isValid) {
      // isLoading.value = true;
      dialogVisible.value = false;
      // projectList.value.push({
      //   ...form.value
      // })
      emit('change', {
        id: props.type === 'new' ? `id-${form.value.name}` : props.data?.id,
        ...form.value
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>