<template>
  <v-data-table 
    :items="items" 
    :headers="headers" 
    class="elevation-1"
  >
    <!-- Coluna de ações: botão para ver detalhes da RNC -->
    <template #item.actions="{ item }">
      <v-btn 
        icon 
        @click="$router.push({ name: 'ClientDetail', params: { id: item._id } })"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>

    <!-- Mensagem para lista vazia -->
    <template #no-data>
      <div class="text-center ma-4">
        Nenhuma RNC encontrada.
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const headers = [
  { text: 'ID', value: '_id' },
  { text: 'Cliente', value: 'customer' },
  { text: 'Status', value: 'status' },
  { text: 'Data', value: 'createdAt' },
  { text: 'Ações', value: 'actions', sortable: false }
]
</script>
