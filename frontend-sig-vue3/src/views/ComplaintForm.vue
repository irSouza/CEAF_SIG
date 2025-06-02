<template>
  <v-card class="pa-4">
    <!-- Mensagens de sucesso/erro -->
    <v-alert 
      v-if="successMessage" 
      type="success" 
      class="mb-4"
    >
      {{ successMessage }}
    </v-alert>
    <v-alert 
      v-if="errorMessage" 
      type="error" 
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>

    <!-- Formulário de nova RNC -->
    <v-form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field 
            label="FY" 
            v-model="form.fy" 
            type="number" 
            required 
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field 
            label="Bag Code" 
            v-model="form.bagCode" 
            required 
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field 
            label="Lote" 
            v-model="form.lotNumber" 
            required 
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field 
            label="Qtd Afetada" 
            v-model="form.affectedBags" 
            type="number" 
            required 
          />
        </v-col>
        <v-col cols="12">
          <v-text-field 
            label="Causa Geral" 
            v-model="form.generalCause" 
            required 
          />
        </v-col>
        <v-col cols="12">
          <v-textarea 
            label="Descrição" 
            v-model="form.description" 
            required 
          />
        </v-col>
        <v-col cols="12">
          <v-checkbox 
            label="Possui Amostra?" 
            v-model="form.hasSample" 
          />
        </v-col>
        <v-col cols="12">
          <v-file-input 
            label="Anexos" 
            v-model="form.attachments" 
            multiple 
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" type="submit">
            Enviar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useComplaintsStore } from '@/store/complaints'

const router = useRouter()
const store = useComplaintsStore()

// Estado reativo do formulário com valores iniciais
const initialForm = {
  fy: new Date().getFullYear(),
  bagCode: '',
  lotNumber: '',
  affectedBags: null,
  generalCause: '',
  description: '',
  hasSample: false,
  attachments: []
}
const form = ref({ ...initialForm })

// Mensagens de feedback
const successMessage = ref('')
const errorMessage = ref('')

async function onSubmit() {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await store.create(form.value)
    // Sucesso no cadastro
    successMessage.value = 'RNC enviada com sucesso.'
    // Limpa o formulário para uma nova entrada
    form.value = { ...initialForm }
    // Opcional: navegar para lista de RNCs após sucesso
    // router.push('/client/list')
  } catch (err) {
    // Trata erro no envio
    errorMessage.value = err?.response?.data?.message || 'Não foi possível enviar a RNC.'
  }
}
</script>
