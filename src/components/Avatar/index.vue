<template>
  <div class="row avatar">
    <el-avatar :size="32" :src="avatarIcon" />
    <el-dropdown @command="onCommand">
      <span class="username">
        {{ nickname }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { AUTH_KEY, USER_INFO } from '@/config';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = useUserStore();
const { useId, nickname, avatarIcon } = storeToRefs(store);
const router = useRouter();

const onCommand = command => {
  if (command === 'logout') {
    // do logout
    localStorage.removeItem(USER_INFO);
    store.clearUserInfo();
    router.push({
      name: 'login'
    })
  }
}

</script>

<style lang="scss" scoped>
.avatar {
  align-items: center;
}

.username {
  margin-left: 12px;
  outline: none;
}
</style>