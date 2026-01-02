import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './app/App.vue'
import permissionDirectives from '@shared/directives/permission.directive'
import {i18n, router} from "@/app";

const app = createApp(App)

// Pinia store
app.use(createPinia())

// Router
app.use(router)

// i18n
app.use(i18n)

// Toast notifications
app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true,
  position: 'top-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

app.use(permissionDirectives)

app.mount('#app')
