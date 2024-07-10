<template>
  <div class="logo" @click="onClick">
    法悟智库
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const onClick = () => {
  router.push({
    name: 'home'
  })
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 28px;
  color: var(--primary-color);
  cursor: pointer;
}
</style>