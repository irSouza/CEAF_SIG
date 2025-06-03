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
      try {
        const response = await api.get('/complaints')
        this.complaints = response.data
      } catch (error) {
        console.error('Erro ao buscar RNCs:', error)
        this.complaints = []
      }
    },

    // Cadastra uma nova RNC
    async create(data) {
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(file => formData.append('attachments', file))
          } else {
            formData.append(key, value)
          }
        })
        await api.post('/complaints', formData)
      } catch (error) {
        console.error('Erro ao criar RNC:', error)
        throw error
      }
    }
  }
})
