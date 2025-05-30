<template>
  <v-container class="pa-4">
    <h2 class="mb-6">Dashboard de Reclamações</h2>

    <Charts class="mb-8" />
    <ComplaintTable :complaints="complaints" />
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
//import Charts from '@/components/Charts.vue'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'

//const store = useComplaintsStore()
const complaints = ref([])
const route = useRoute()

async function carregar() {
  await store.listAll()
  //complaints.value = store.complaints
}

onMounted(carregar)

// Reage à troca de rota, mesmo que seja para o mesmo componente
watch(() => route.fullPath, carregar)
</script>


<style scoped>
h2 {
  font-weight: 600;
}
</style>
