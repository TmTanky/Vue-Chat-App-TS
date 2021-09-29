import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification';

// Global Components
import CustomBtn from '@/components/customBtn/CustomBtn.vue'
import FooterSendMsg from '@/components/footerSendMsg/FooterSendMsg.vue'

// Styles
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
.component('custom-btn', CustomBtn)
.component('send-msg-footer', FooterSendMsg)
.use(router)
.use(VueToast)
.mount('#app')
