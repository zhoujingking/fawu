<template>
  <div class="login-page row">
    <el-card class="card" :body-style="{padding: '48px'}">
      <div class="logo-container row">
        <Logo />
      </div>
      <el-form class="form" ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="auto" size="large">
        <el-form-item label="手机号" prop="phone" >
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="op row">
        <el-button type="primary" size="large" class="btn" @click="onLogin">{{ btnText }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import axios from 'axios';
import Logo from '@/components/Logo.vue'
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { AUTH_KEY, USER_INFO } from '@/config';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { setAuthToken, setUserInfoToStorage } from '@/utils';

const formRef = ref();
const form = ref({
  phone: '',
  password: ''
});

const formRules = reactive({
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ]
});

const btnText = ref('登录');
const router = useRouter();
const store = useUserStore();

const onLogin = () => {
  formRef.value.validate(async (isValid) => {
    if (isValid) {
      try {
        // const { data } = await axios.post('/login', form.value);
        const token = 'fake_token'; 
        const userInfo = {
          id: 1,
          nickname: 'test user',
          avatarIcon: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        };
        store.setUserInfo(userInfo)
        setUserInfoToStorage(userInfo);
        setAuthToken(token);
        router.replace({
          name: 'home'
        })
      } catch {
        ElMessage({
          message: '登录失败，请确认手机号和密码是否正确',
          type: 'error',
        })
      }
    }
  })
}

</script>

<style lang="scss" scoped>
.login-page {
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .card {
    width: 400px;
    .logo-container {
      justify-content: center;
    }
    .form {
      margin-top: 32px;
    }
    .op {
      justify-content: center;
      .btn {
        width: 300px;
        margin-top: 16px;
      }
    }
  }
}
</style>