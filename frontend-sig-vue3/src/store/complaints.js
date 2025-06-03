import { defineStore } from 'pinia'
import api from '@/services/api'

export const useComplaintsStore = defineStore('complaints', {
  state: () => ({
    complaints: [],
    loading: false,
    error: null
  }),

  actions: {
    // Busca todas as RNCs do usuário logado
    async listAll() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/complaints')
        this.complaints = response.data
      } catch (error) {
        console.error('Erro ao buscar RNCs:', error)
        this.complaints = []
        this.error = 'Erro ao carregar RNCs.'
      } finally {
        this.loading = false
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

        // Opcional: recarrega a lista após criar
        await this.listAll()
      } catch (error) {
        console.error('Erro ao criar RNC:', error)
        throw error
      }
    },

    clear() {
      this.complaints = []
      this.error = null
    }
  }
})
