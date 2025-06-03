<template>
  <v-container class="py-4">
    <v-card class="elevation-2">
      <v-card-title class="text-h6">
         RNCs
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="complaints"
          item-key="_id"
          dense
          fixed-header
          height="600px"
          no-data-text="Nenhuma RNC encontrada"
          class="elevation-1"
        >

         <!-- STATUS COM COR -->
        <template #item-status="{ item }">
          <v-chip :color="statusColor(item.status)" dark small>
            {{ statusLabel(item.status) }}
          </v-chip>
        </template>

        <!-- DATA FORMATADA -->
        <template #item-createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <!-- BOTÃO DE AÇÃO -->
        <template #item-actions="{ item }">
          <v-btn icon @click="abrirDetalhes(item)" aria-label="Ver detalhes da RNC">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>

        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()

onMounted(async () => {
  await store.listAll()
})

const complaints = computed(() => store.complaints)

function abrirDetalhes(item) {
  console.log('Visualizar RNC:', item)
  // Substitua por router.push ou abrir modal se desejar
}

function formatDate(raw) {
  if (!raw) return '-'
  const iso = typeof raw === 'object' && '$date' in raw ? raw.$date : raw
  const date = new Date(iso)
  return date.toLocaleDateString('pt-BR', {
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
  color: black;
}
</style>
