<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-value="_id"
    class="elevation-1"
    no-data-text="Nenhuma reclamação encontrada"
  >
    <!-- Slot corrigido para status -->
    <template #item-status="{ item }">
      <v-chip :color="statusColor(item.status)" dark>
        {{ statusLabel(item.status) }}
      </v-chip>
    </template>

    <!-- Slot corrigido para data -->
    <template #item-createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>

    <!-- Slot corrigido para ações -->
    <template #item-actions="{ item }">
      <v-btn icon @click="goToDetail(item._id)">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items: Array,
  detailPrefix: {
    type: String,
    required: true
  }
})

const router = useRouter()

function goToDetail(id) {
  router.push(`${props.detailPrefix}/${id}`)
}

function formatDate(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('pt-BR')
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
  { text: 'Data', value: 'createdAt' },
  { text: 'Ações', value: 'actions', sortable: false }
]
</script>
