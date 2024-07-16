import { AUTH_KEY, USER_INFO } from '@/config';

export const sendPostRequest = async (url, payload) => {
  // fetch context from localstorage
  const context = {};
  const userInfoStr = localStorage.getItem(USER_INFO);
  console.log(userInfoStr)
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

export const getAuthToken = () => localStorage.getItem(AUTH_KEY);

export const setAuthToken = token => localStorage.setItem(AUTH_KEY, token);