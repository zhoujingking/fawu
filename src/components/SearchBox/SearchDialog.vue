<template>
  <el-dialog v-model="dialogVisible" title="搜索" align-center>
    <FileTable />
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
import { ref } from 'vue';
import FileTable from '../FileTable.vue';

const props = defineProps({
  data: Object,
  type: String
})


const emit = defineEmits(['change'])

const dialogVisible = defineModel({
  type: Boolean,
  required: true
})

const isLoading = ref(false);

const onCancel = () => {
  dialogVisible.value = false;
}

const onConfirm = () => {
  formRef.value.validate(isValid => {
    if (isValid) {
      
    }
  })
}
</script>

<style lang="scss" scoped></style>