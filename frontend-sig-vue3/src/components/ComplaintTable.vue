<template>
  <v-data-table :items="items" :headers="headers" class="elevation-1">
    <template #item.actions="{ item }">
      <v-btn icon @click="$router.push({ name: 'ComplaintDetail', params: { id: item._id } })">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({ items: Array })
const headers = [
  { text: 'ID', value: '_id' },
  { text: 'Cliente', value: 'customer' },
  { text: 'Status', value: 'status' },
  { text: 'Data', value: 'createdAt' },
  { text: 'Ações', value: 'actions', sortable: false }
]
</script>
