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
      <template #item="{ item, column }">
        <template v-if="column.value === 'status'">
          <v-chip :color="statusColor(item.status)" dark>
            {{ statusLabel(item.status) }}
          </v-chip>
        </template>

        <template v-else-if="column.value === 'createdAt'">
          {{ formatDate(item.createdAt) }}
        </template>

        <template v-else>
          {{ item[column.value] }}
        </template>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()

// Carrega a lista assim que o componente monta
onMounted(async () => {
  await store.listAll()
})

// Computa as RNCs carregadas
const complaints = computed(() => store.complaints)

// Cabeçalhos da tabela
const headers = [
  { text: 'Descrição', value: 'description' },
  { text: 'Código Bolsa', value: 'bagCode' },
  { text: 'Lote', value: 'lotNumber' },
  { text: 'Status', value: 'status' },
  { text: 'Data de Criação', value: 'createdAt' }
]

// Formata data ISO para formato legível
function formatDate(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleDateString()
}

// Traduz status para rótulo
function statusLabel(status) {
  if (status === 'pending') return 'Pendente'
  if (status === 'resolved') return 'Resolvida'
  return status
}

// Define cor do status
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
