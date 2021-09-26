import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification';

// Global Components
import CustomBtn from '@/components/customBtn/CustomBtn.vue'

// Styles
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
.component('custom-btn', CustomBtn)
.use(router)
.use(VueToast)
.mount('#app')
