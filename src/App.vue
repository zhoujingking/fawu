<script setup>
import { RouterView, useRoute } from 'vue-router'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { computed, ref } from 'vue';
import Logo from './components/Logo.vue';
import SearchBox from './components/SearchBox/index.vue'
import Avatar from './components/Avatar/index.vue'


const locale = ref(zhCn);
const route = useRoute();
const showNav = computed(() => route.name !== 'login');

</script>

<template>
  <ElConfigProvider :locale="locale">
    <ElContainer style="height: 100%;">
      <ElHeader v-if="showNav">
        <div class="row logo-container">
          <Logo />
          <div class="row right">
            <SearchBox />
            <Avatar class="avatar" />
          </div>
        </div>
      </ElHeader>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
.logo-container {
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}
.right {
  align-items: center;
  .avatar {
    margin-left: 16px;
  }
}
</style>

<style>
.el-header {
  --el-header-padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .06);
}
.el-main {
  --el-main-padding: 0;
}

</style>
