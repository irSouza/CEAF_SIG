<template>
  <v-container class="py-8">
    <v-card class="elevation-2">
      <v-card-title class="text-h6 text-primary">
        Minhas RNCs
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="complaints"
          item-key="_id"
          dense
          fixed-header
          height="500px"
          class="elevation-1"
          no-data-text="Nenhuma RNC encontrada"
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

          <!-- BOTÃO DE AÇÕES -->
          <template #item-actions="{ item }">
            <v-btn icon color="primary" @click="abrirDetalhes(item._id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useComplaintsStore } from '@/store/complaints'
import { useRouter } from 'vue-router'

const store = useComplaintsStore()
const router = useRouter()

onMounted(async () => {
  await store.listAll()
})

const complaints = computed(() => store.complaints)

function abrirDetalhes(id) {
  router.push(`/client/detail/${id}`)
}

const headers = [
  { title: 'Descrição', value: 'description' },
  { title: 'Código Bolsa', value: 'bagCode' },
  { title: 'Lote', value: 'lotNumber' },
  { title: 'Status', value: 'status' },
  { title: 'Data de Criação', value: 'createdAt' },
  { title: 'Ações', value: 'actions', sortable: false }
]

function formatDate(iso) {
  if (!iso) return '-'
  const d = new Date(typeof iso === 'object' && '$date' in iso ? iso.$date : iso)
  return d.toLocaleDateString('pt-BR')
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
