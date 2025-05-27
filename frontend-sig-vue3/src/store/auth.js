import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: {
      role: null,
      name: null
    }
  }),
  actions: {
    setUser(payload) {
      this.token = payload.token
      this.user.role = payload.role
      this.user.name = payload.name
    },
    loadFromStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          this.user.role = payload.role
          this.user.name = payload.name
        } catch {
          this.logout()
        }
      }
    },
    logout() {
      this.token = null
      this.user = { role: null, name: null }
      localStorage.removeItem('token')
    }
  }
})
