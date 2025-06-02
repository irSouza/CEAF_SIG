import { defineStore } from 'pinia'
import api from '@/services/api'

export const useComplaintsStore = defineStore('complaints', {
  state: () => ({
    // Lista de reclamações do usuário
    complaints: []
  }),
  actions: {
    // Busca todas as RNCs do usuário logado
    async listAll() {
      this.complaints = (await api.get('/complaints')).data
    },
    // Cadastra uma nova RNC
    async create(data) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Anexa múltiplos arquivos (se houver)
          value.forEach(file => formData.append('attachments', file))
        } else {
          formData.append(key, value)
        }
      })
      // Envia a nova RNC para o backend
      await api.post('/complaints', formData)
    }
  }
})
