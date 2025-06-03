import axios from 'axios'
import { useAuthStore } from '@/store/auth'

// Criação da instância do axios com a URL base do backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// Interceptor para incluir o token JWT automaticamente em todas as requisições
api.interceptors.request.use(config => {
  const token = useAuthStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
