<template>
  <v-container class="pa-4">
    <h2 class="mb-6">Minhas RNCs</h2>

    <v-data-table
      :headers="headers"
      :items="complaints"
      class="elevation-1"
      no-data-text="Nenhuma RNC encontrada"
      item-value="_id"
    >
      <!-- Slot para status -->
      <template #item-status="{ item }">
        <v-chip :color="statusColor(item.status)" dark>
          {{ statusLabel(item.status) }}
        </v-chip>
      </template>

      <!-- Slot para data -->
      <template #item-createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()

onMounted(async () => {
  await store.listAll()
})

const complaints = computed(() => store.complaints)

const headers = [
  { text: 'Descrição', value: 'description' },
  { text: 'Código Bolsa', value: 'bagCode' },
  { text: 'Lote', value: 'lotNumber' },
  { text: 'Status', value: 'status' },
  { text: 'Data de Criação', value: 'createdAt' }
]

function formatDate(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleDateString()
}

function statusLabel(status) {
  if (status === 'pending') return 'Pendente'
  if (status === 'resolved') return 'Resolvida'
  return status
}

function statusColor(status) {
  if (status === 'pending') return 'orange'
  if (status === 'resolved') return 'green'
  return 'grey'
}
</script>

<style scoped>
h2 {
  font-weight: 600;
  color: #145efc;
}
</style>
