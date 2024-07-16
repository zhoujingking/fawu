
import axios from 'axios'
import { AUTH_KEY } from '@/config';
import router from '@/router'

axios.defaults.baseURL = '/api/v1'
axios.interceptors.request.use(config => {
  // if (localStorage.getItem(AUTH_KEY)) {
  //   config.headers['Authorization'] = localStorage.getItem(AUTH_KEY);
  // }
  return config;
})

axios.interceptors.response.use(
  res => {
    return res;
  },
  ({ response }) => {
    if (response.status === 401) {
      router.replace({
        name: 'login'
      })
    }
    return Promise.reject(error);
  }
)