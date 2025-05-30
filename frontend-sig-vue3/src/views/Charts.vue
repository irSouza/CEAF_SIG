<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>Total por Status</v-card-title>
        <v-card-text>
          <div>Pendentes: {{ total.pending }}</div>
          <div>Resolvidas: {{ total.resolved }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()

const complaints = computed(() => store.list || [])

const total = computed(() => {
  const count = { pending: 0, resolved: 0 }
  complaints.value.forEach(c => {
    if (c.status === 'pending') count.pending++
    else if (c.status === 'resolved') count.resolved++
  })
  return count
})
</script>
