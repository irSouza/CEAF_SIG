<template>
  <v-container class="py-6">
    <h2 class="mb-4">Detalhes da RNC</h2>

    <v-card v-if="complaint" class="pa-4">
      <v-row dense>
        <v-col cols="12" md="6"><strong>Cliente:</strong> {{ complaint.customer }}</v-col>
        <v-col cols="12" md="6"><strong>Importância Crítica:</strong> {{ complaint.criticalImportance }}</v-col>
        <v-col cols="12"><strong>Descrição:</strong> {{ complaint.description }}</v-col>
        <v-col cols="12" md="4"><strong>Código do Bag:</strong> {{ complaint.bagCode }}</v-col>
        <v-col cols="12" md="4"><strong>Lote:</strong> {{ complaint.lotNumber }}</v-col>
        <v-col cols="12" md="4"><strong>Máquina:</strong> {{ complaint.machine || '-' }}</v-col>
        <v-col cols="12" md="4"><strong>Bags Afetados:</strong> {{ complaint.affectedBags }}</v-col>
        <v-col cols="12" md="4"><strong>Possui Amostra?</strong> {{ complaint.hasSample ? 'Sim' : 'Não' }}</v-col>
        <v-col cols="12" md="4"><strong>Status:</strong> {{ statusLabel(complaint.status) }}</v-col>
        <v-col cols="12" md="6"><strong>Data de Criação:</strong> {{ formatDate(complaint.createdAt) }}</v-col>
        <v-col cols="12" md="6"><strong>Contato Inicial:</strong> {{ formatDate(complaint.firstContactAt) }}</v-col>
      </v-row>

      <div v-if="complaint.attachments?.length">
        <h4 class="mt-4 mb-2">Anexos:</h4>
        <v-row>
          <v-col v-for="(file, index) in complaint.attachments" :key="index" cols="12" md="4">
            <v-img
              :src="fileUrl(file)"
              :alt="'Anexo ' + (index + 1)"
              height="200"
              cover
              class="rounded"
            />
            <v-btn :href="fileUrl(file)" target="_blank" text small class="mt-1">
              Ver/baixar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <v-alert type="error" v-else>
      RNC não encontrada.
    </v-alert>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const complaint = ref(null)

onMounted(async () => {
  try {
    const response = await api.get(`/complaints/${route.params.id}`)
    complaint.value = response.data
  } catch (err) {
    console.error('Erro ao buscar RNC:', err)
  }
})

function formatDate(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('pt-BR')
}

function statusLabel(status) {
  switch (status) {
    case 'pending': return 'Pendente'
    case 'resolved': return 'Resolvida'
    case 'in_progress': return 'Em andamento'
    case 'rejected': return 'Recusada'
    default: return status || '-'
  }
}

function fileUrl(path) {
  return `${import.meta.env.VITE_API_URL}/${path}`
}
</script>

<style scoped>
h2 {
  font-weight: 600;
}
</style>
