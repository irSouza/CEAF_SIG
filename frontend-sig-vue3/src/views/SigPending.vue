<template>
  <v-container class="py-8">
    <v-card class="elevation-2">
      <v-card-title class="text-h6 text-primary">
        Reclamações Pendentes
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="pendingComplaints"
          item-key="_id"
          dense
          fixed-header
          height="500px"
          class="elevation-1"
          no-data-text="Nenhuma RNC pendente encontrada"
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
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()
const complaints = ref([])
const route = useRoute()

async function carregar() {
  await store.listAll()
  complaints.value = store.complaints
}

onMounted(carregar)
watch(() => route.fullPath, carregar)

const pendingComplaints = computed(() =>
  complaints.value.filter(c => c.status === 'pending')
)

const headers = [
  { title: 'Descrição', value: 'description' },
  { title: 'Código Bolsa', value: 'bagCode' },
  { title: 'Lote', value: 'lotNumber' },
  { title: 'Status', value: 'status' },
  { title: 'Data de Criação', value: 'createdAt' }
]

function formatDate(iso) {
  if (!iso) return '-'
  const raw = typeof iso === 'object' && '$date' in iso ? iso.$date : iso
  return new Date(raw).toLocaleDateString('pt-BR')
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
</script>

<style scoped>
.v-card-title {
  font-weight: 600;
  font-size: 20px;
}

.v-data-table-header th {
  font-weight: 600;
  background-color: #f5f5f5;
  color: #333;
}

.v-data-table {
  border-radius: 8px;
}
</style>
