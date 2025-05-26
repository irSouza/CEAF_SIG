<template>
  <v-container>
    <h1>Nova Reclamação</h1>
    <v-form @submit.prevent="submitForm">
      <v-text-field label="Customer" v-model="form.customer" readonly />
      <v-text-field label="FY" v-model="form.fy" type="number" required />
      <v-text-field label="Causa Geral" v-model="form.generalCause" required />
      <v-text-field label="Lote" v-model="form.lotNumber" required />
      <v-text-field label="Bag Code" v-model="form.bagCode" required />
      <v-text-field label="Bags Afetadas" v-model="form.affectedBags" type="number" required />
      <v-checkbox label="Possui Amostra?" v-model="form.hasSample" />
      <v-file-input label="Anexos" v-model="form.attachments" multiple />
      <v-textarea label="Descrição do Defeito" v-model="form.description" required />
      <v-btn type="submit" color="primary">Enviar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/store'

export default {
  setup() {
    const auth = useAuthStore()
    const form = ref({
      customer: '',
      fy: new Date().getFullYear(),
      generalCause: '',
      lotNumber: '',
      bagCode: '',
      affectedBags: null,
      hasSample: false,
      attachments: [],
      description: ''
    })
    const payload = JSON.parse(atob(auth.token.split('.')[1]))
    form.value.customer = payload.name

    const submitForm = async () => {
      const data = new FormData()
      for (const key in form.value) {
        if (key === 'attachments') {
          form.value.attachments.forEach(file => data.append('attachments', file))
        } else {
          data.append(key, form.value[key])
        }
      }
      try {
        await axios.post('http://localhost:5000/complaints', data, {
          headers: { 'Authorization': `Bearer ${auth.token}`, 'Content-Type': 'multipart/form-data' }
        })
        alert('Reclamação enviada')
      } catch {
        alert('Erro ao enviar')
      }
    }

    return { form, submitForm }
  }
}
</script>