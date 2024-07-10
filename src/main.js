import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/config/axiosConfig'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
