<template>
  <v-container>
    <h2 class="mb-4">Todas RNCs</h2>
    <div v-if="!complaints.length" class="text-center grey--text">
      Nenhuma reclamação encontrada.
    </div>
    <ComplaintTable v-else :items="complaints" />
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()
const complaints = store.list

onMounted(() => {
  store.listAll().catch(console.error)
})
</script>

<style scoped>
h2 {
  color: #145efc;
}
</style>
