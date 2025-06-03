<template>
  <v-container class="py-6">
    <v-card class="elevation-2">
      <v-card-title class="text-h6 text-primary">
        Minhas RNCs
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="_id"
          dense
          fixed-header
          height="500px"
          class="elevation-1"
          no-data-text="Nenhuma reclamação encontrada"
        >
          <!-- STATUS COM CHIP -->
          <template #item-status="{ item }">
            <v-chip :color="statusColor(item.status)" dark small>
              {{ statusLabel(item.status) }}
            </v-chip>
          </template>

          <!-- DATA FORMATADA -->
          <template #item-createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <!-- AÇÕES -->
          <template #item-actions="{ item }">
            <v-btn icon @click="abrirDetalhes(item._id)" aria-label="Ver detalhes">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  items: Array
})

function abrirDetalhes(id) {
  console.log('Abrir detalhes da RNC:', id)
}

function formatDate(dateObj) {
  if (!dateObj) return '-'
  const iso = typeof dateObj === 'object' && '$date' in dateObj ? dateObj.$date : dateObj
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function statusLabel(status) {
  switch (status) {
    case 'pending': return 'Pendente'
    case 'resolved': return 'Resolvida'
    case 'in_progress': return 'Em andamento'
    case 'rejected': return 'Recusada'
    default: return status
  }
}

function statusColor(status) {
  switch (status) {
    case 'pending': return 'orange'
    case 'resolved': return 'green'
    case 'in_progress': return 'blue'
    case 'rejected': return 'red'
    default: return 'grey'
  }
}

const headers = [
  { text: 'Descrição', value: 'description' },
  { text: 'Código Bolsa', value: 'bagCode' },
  { text: 'Lote', value: 'lotNumber' },
  { text: 'Status', value: 'status' },
  { text: 'Data de Criação', value: 'createdAt' },
  { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
]
</script>

<style scoped>
.v-card-title {
  font-weight: 600;
  font-size: 20px;
}
</style>
