<template>
  <v-container class="pa-4">
    <h2 class="mb-6">Todas as Reclamações</h2>
    <ComplaintTable :items="complaints" detailPrefix="/sig/detail" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()
const complaints = ref([])

onMounted(async () => {
  await store.listAll()
  complaints.value = store.complaints
})
</script>

<style scoped>
h2 {
  font-weight: 600;
  color: black;
}
</style>