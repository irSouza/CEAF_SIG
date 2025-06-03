<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-value="_id"
    class="elevation-1"
    no-data-text="Nenhuma reclamação encontrada"
  >
    <!-- Status -->
    <template #item-status="{ item }">
      <v-chip :color="statusColor(item.status)" dark>
        {{ statusLabel(item.status) }}
      </v-chip>
    </template>

    <!-- Data -->
    <template #item-createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>

    <!-- Ações -->
    <template #item-actions="{ item }">
      <v-btn icon @click="abrirDetalhes(item._id)">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>

  <!-- Diálogo de Detalhes -->
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title>Detalhes da Reclamação</v-card-title>
      <v-card-text>
        <v-list v-if="rncData">
          <v-list-item
            v-for="(valor, chave) in rncSemAttachments"
            :key="chave"
            >

            <v-list-item-content>
              <strong>{{ formatLabel(chave) }}:</strong> {{ formatValue(valor) }}
            </v-list-item-content>
          </v-list-item>

          <!-- Anexos -->
          <div v-if="rncData.attachments && rncData.attachments.length">
            <h4>Anexos:</h4>
            <v-img
              v-for="(url, i) in rncData.attachments"
              :key="i"
              :src="`http://localhost:5000/${url}`"
              max-width="100%"
              class="mb-3"
            />
          </div>
        </v-list>
        <div v-else>Carregando...</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="dialog = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import axios from 'axios'
import { computed } from 'vue'

const rncSemAttachments = computed(() => {
  if (!rncData.value) return {}
  const { attachments, ...resto } = rncData.value
  return resto
})


const props = defineProps({
  items: Array
})

const dialog = ref(false)
const rncData = ref(null)

async function abrirDetalhes(id) {
  dialog.value = true
  rncData.value = null
  try {
    const response = await axios.get(`http://localhost:5000/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const { _id, ...dadosSemId } = response.data
    rncData.value = dadosSemId
  } catch (err) {
    console.error('Erro ao buscar detalhes:', err)
    rncData.value = { erro: 'Não foi possível carregar os dados.' }
  }
}

function formatDate(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('pt-BR')
}

function formatLabel(chave) {
  return chave
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

function formatValue(valor) {
  if (typeof valor === 'boolean') return valor ? 'Sim' : 'Não'
  if (Array.isArray(valor)) return valor.join(', ')
  return valor
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
