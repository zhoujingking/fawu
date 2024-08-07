import { AUTH_KEY, USER_INFO } from '@/config';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import dayjs from 'dayjs';
import router from '@/router'

export const sendPostRequest = async (url, payload) => {
  // fetch context from localstorage
  const userInfo = getUserInfoFromStorage();
  const context = {
    userId: userInfo?.userId || '',
    token: getAuthToken() || '',
    traceId: uuid()
  };
  const requestBody = {
    context,
    data: payload || {}
  }
  const { data } = await axios.post(url, requestBody);
  if (data.code === 0) {
    return data.result || {};
  }
  if (data.code === -20003) {
    router.replace({
      name: 'login'
    });
    return;
  }
  throw new Error(data.msg);
}

export const getUserInfoFromStorage = () => {
  // try to access localstorage to populate user store
  const userInfoStr = localStorage.getItem(USER_INFO);
  if (userInfoStr) {
    return JSON.parse(userInfoStr);
  } 
  return null;
}

export const setUserInfoToStorage = (userInfo) => localStorage.setItem(USER_INFO, JSON.stringify(userInfo));

export const clearUserInfoStorage = () => localStorage.removeItem(USER_INFO);

export const getAuthToken = () => localStorage.getItem(AUTH_KEY);

export const setAuthToken = token => localStorage.setItem(AUTH_KEY, token);

export const clearAuthToken = () => localStorage.removeItem(AUTH_KEY);

export const clearAllStorage = () => {
  clearUserInfoStorage();
  clearAuthToken();
}

export const formatDate = date => {
  if (!date) {
    return '--';
  }
  return dayjs(date).format('YYYY-MM-DD hh:mm:ss');
}

