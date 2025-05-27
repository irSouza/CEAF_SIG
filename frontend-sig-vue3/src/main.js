import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import vuetify from './plugins/vuetify'
import './styles/variables.scss'
import './styles/global.scss'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore(pinia)
auth.loadFromStorage() // Carrega token e user do localStorage no início

app.use(router)
app.use(vuetify)

app.mount('#app')
