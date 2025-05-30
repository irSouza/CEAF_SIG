import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'

import { useAuthStore } from '@/store/auth'

import './styles/variables.scss'
import './styles/global.scss'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore(pinia)
auth.loadFromStorage()

app.use(router)
app.use(vuetify)

app.mount('#app')
