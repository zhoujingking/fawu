import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userId = ref('');
  const nickname = ref('');
  const avatarIcon = ref('');

  const setUserInfo = (user) => {
    userId.value = user.id;
    nickname.value = user.nickname;
    avatarIcon.value = user.avatarIcon;
  }

  const clearUserInfo = () => {
    userId.value = '';
    nickname.value = '';
    avatarIcon.value = '';
  }

  return {
    userId,
    nickname,
    avatarIcon,
    setUserInfo,
    clearUserInfo,
  }
})